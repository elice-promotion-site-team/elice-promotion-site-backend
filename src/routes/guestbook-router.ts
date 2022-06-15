// import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares';
import { guestbookService } from '../services';

const guestbookRouter = Router();

guestbookRouter.post('/guestbook', async (req, res, next) => {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    // if (is.emptyObject(req.body)) {
    //   throw new Error(
    //     'headers의 Content-Type을 application/json으로 설정해주세요'
    //   );
    // }

    // 위 데이터를 방명록 db에 추가하기
    const newGuestbook = await guestbookService.addGuestbook(req.body);

    res.status(201).json(newGuestbook);
  } catch (error) {
    next(error);
  }
});

guestbookRouter.get('/guestbooks', async function (req, res, next) {
  try {
    // 전체 방명록 목록을 얻음
    const guestbooks = await guestbookService.getGuestbooks();

    res.status(200).json(guestbooks);
  } catch (error) {
    next(error);
  }
});

guestbookRouter.get('/guestbook/:_id', loginRequired, async function (req, res, next) {
  try {
    const _id = req.params._id;
    const guestbookData = await guestbookService.getGuestbookDataById(_id);

    res.status(200).json(guestbookData);
  } catch (error) {
    next(error);
  }
});

guestbookRouter.patch('/guestbook/:_id', async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    // if (is.emptyObject(req.body)) {
    //   throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    // }

    // req (request) 에서 데이터 가져오기
    const _id = req.params._id;
    const update = req.body;

    // 방명록 정보를 업데이트함.
    const updatedGuestbook = await guestbookService.setGuestbook(_id, update);

    res.status(200).json(updatedGuestbook);
  } catch (error) {
    next(error);
  }
});

guestbookRouter.delete('/guestbook/:_id', loginRequired, async function (req, res, next) {
  try {
    const _id = req.params._id;
    const deleteResult = await guestbookService.deleteGuestbookData(_id);

    res.status(200).json(deleteResult);
  } catch (error) {
    next(error);
  }
});

export { guestbookRouter };
