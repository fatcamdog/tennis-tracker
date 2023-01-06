import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import matchRoutes from './routes/matchRoutes';
import userRoutes from './routes/userRoutes';

// !! Express app
const app: Application = express();

// !! Config/middleware
dotenv.config();

const options: cors.CorsOptions = {
  origin: '*',
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// !! Routes
app.use('/api/matches', matchRoutes);
app.use('/api/users', userRoutes);

// !! Connect to MongoDB
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
