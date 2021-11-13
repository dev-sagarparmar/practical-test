import { Router } from 'express';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = Router();

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

export default app;
