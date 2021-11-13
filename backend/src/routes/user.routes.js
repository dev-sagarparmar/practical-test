import { Router } from 'express';
import { getUsers, addUser, deleteUser, updateUser } from '../controller/user.controller';
import { verifyToken } from '../../middlewares/auth';

const app = Router();

app.route('/').get(verifyToken, getUsers);
app.route('/update').put(verifyToken, updateUser);
app.route('/add').post(addUser);
app.route('/delete').delete(verifyToken, deleteUser);

export default app;
