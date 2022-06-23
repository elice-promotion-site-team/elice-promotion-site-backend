// import is from '@sindresorhus/is';
import { Router } from 'express';
// import { loginRequired } from '../middlewares';
import { userService } from '../services';

const userRouter = Router();

userRouter.post(
  '/user',
  /* loginRequired, */ async (req, res, next) => {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      // if (is.emptyObject(req.body)) {
      //   throw new Error(
      //     'headers의 Content-Type을 application/json으로 설정해주세요'
      //   );
      // }
      const userInfo = req.body;
      // 위 데이터를 사용자 db에 추가하기
      const newUser = await userService.addUser(userInfo);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

userRouter.get('/users', async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  '/user/:_id',
  /* loginRequired, */ async function (req, res, next) {
    try {
      const _id = req.params._id;
      const userData = await userService.getUserDataById(_id);

      res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  },
);

userRouter.patch(
  '/user/:_id',
  /* loginRequired, */ async function (req, res, next) {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      // if (is.emptyObject(req.body)) {
      //   throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
      // }

      // req (request) 에서 데이터 가져오기
      const _id = req.params._id;
      const update = req.body;

      // 사용자 정보를 업데이트함.
      const updatedUser = await userService.setUser(_id, update);

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

userRouter.delete(
  '/user/:_id',
  /* loginRequired, */ async function (req, res, next) {
    try {
      const _id = req.params._id;
      const deleteResult = await userService.deleteUserData(_id);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  },
);

export { userRouter };
