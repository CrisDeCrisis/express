import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import appRouter from './router/app.routes.js';
import { connectDB } from './database/dbConfig.js';


const app = express();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/user', appRouter);


connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


