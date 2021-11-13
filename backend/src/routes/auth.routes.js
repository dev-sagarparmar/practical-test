import { Router } from 'express';
import { verifyEmailPassword } from '../../middlewares/auth';

const app = Router();

app.route('/login').post(verifyEmailPassword);

export default app;
