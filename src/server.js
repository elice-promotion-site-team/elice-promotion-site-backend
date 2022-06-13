const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.SERVER_PORT;

app.get('/', (req, res) => {
  res.send('test');
});

app.listen(PORT);
