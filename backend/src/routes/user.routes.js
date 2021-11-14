import { Router } from 'express';
import { getUsers, addUser, deleteUser, updateUser, findUser } from '../controller/user.controller';
import { verifyToken } from '../../middlewares/auth';
import { uniqueEmailValidate } from '../../middlewares/user';

const app = Router();

// used middleware to validate token or email id and added controllers
app.route('/').put(verifyToken, getUsers);
app.route('/update').put(verifyToken, updateUser);
app.route('/add').post(uniqueEmailValidate, addUser);
app.route('/delete/:id').delete(verifyToken, deleteUser);
app.route('/:id').get(verifyToken, findUser);

export default app;
