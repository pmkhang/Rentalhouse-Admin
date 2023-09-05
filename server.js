import express from 'express';
require('dotenv').config();
import cors from 'cors';

const app = express();

app.use(
   cors({
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
   }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', (req, res) => {
   res.send('Server on....');
});

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
   console.log(`Server is runing on the port http://localhost:${listener.address().port}`);
});
