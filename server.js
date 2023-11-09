 import express from 'express';
 import morgan from 'morgan';
 import * as dotenv from 'dotenv';
 import jobRouter from './routes/jobRouter.js';
 import authRouter from './routes/authRouter.js';
 import userRouter from './routes/userRouter.js';
 import mongoose from 'mongoose';
 import cookieParser from 'cookie-parser';
 import cloudinary from 'cloudinary';
import 'dotenv/config';



//middleware
 import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import { authenticateUser } from './middlewares/authMiddleware.js';


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';



 dotenv.config();
 const app = express();



 if(process.env.NODE_ENV === 'development')
 {
 app.use(morgan('dev'));
 }
 const __dirname = dirname(fileURLToPath(import.meta.url));

 app.use(express.static(path.resolve(__dirname, './client/dist')));

 app.use(cookieParser());
 app.use(express.json());

 app.use('/api/v1/jobs',authenticateUser,jobRouter);
 app.use('/api/v1/user',authenticateUser,userRouter);
 app.use('/api/v1/auth',authRouter);

 
 app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use('*',(req,res)=>
{
   res.status(404).json({msg:'not found'})
})

app.use(errorHandlerMiddleware);

 const PORT = process.env.PORT || 5100;

 try{
   await mongoose.connect(process.env.MONGO_URL)
   app.listen(PORT,()=>
   {
      console.log(`Listening to server on ${PORT}....`);
   })
 }
 catch(err)
 {
   console.log(err);
   process.exit(1);
 }
