import express from 'express';
require('dotenv').config();
import cors from 'cors';
import initRoutes from './src/routes';
import connectDatabase from './src/config/connectDatabase';



const app = express();
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
connectDatabase();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`Server is runing on the port http://localhost:${listener.address().port}`);
});
