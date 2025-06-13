import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import authMiddleware from './middlewares/auth';
import authRoutes from './routes/auth';
import eventRoutes from './routes/events';

const app = express();

app.use(cors());
app.use(json());

app.use('/auth', authRoutes);
app.use('/events', authMiddleware, eventRoutes);

app.listen(4000, () =>
  console.log('🚀 Server running on http://localhost:4000')
);
