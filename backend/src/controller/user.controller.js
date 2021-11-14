import { Format } from '../../common/format';
import { userModel } from '../model/user';
import {
  uploadData,
  downloadFilehandler,
} from '../../config/aws';

/**
 * Get User controller
 *
 * @param {JSON} req
 * @param {JSON} res
 * @param {JSON} next
 */
const getUsers = async (req, res, next) => {
  const keys = ['id', 'firstname', 'lastname', 'middlename', 'email'];
  const { filter } = req.body;
  // return array flag true
  const result = await userModel.findUser(filter, keys, true);
  res.json(Format.success(result, 'User Fetched Successfully.'));
};

/**
 * Add User controller
 *
 * @param {JSON} req
 * @param {JSON} res
 * @param {JSON} next
 */
const addUser = async (req, res, next) => {
  const { firstname, lastname, middlename, user_name, email, password, profile_picture } = req.body;
  const type = profile_picture.split(';')[0].split('/')[1];
  const user = {
    firstname, lastname, middlename, user_name, email, password, profile_picture: type };
  const result = await userModel.createUser(user);
  if (profile_picture) {
    await uploadData(result[0].id, profile_picture);
    res.json(Format.success(result, 'User registered Successfully.\nKindly login.'));
  } else {
    res.json(Format.success(result, 'User registered Successfully.\nKindly login.'));
  }
};

/**
 * Update User controller
 *
 * @param {JSON} req
 * @param {JSON} res
 * @param {JSON} next
 */
const updateUser = async (req, res, next) => {
  const result = await userModel.updateUser(req.body);
  res.json(Format.success(result, 'User updated Successfully.'));
};

/**
 * Delete User controller
 *
 * @param {JSON} req
 * @param {JSON} res
 * @param {JSON} next
 */
const deleteUser = async (req, res, next) => {
  const result = await userModel.deleteUser(Number(req.params.id));
  res.json(Format.success(result, 'User Deleted Successfully.'));
};

/**
 * Find User controller
 *
 * @param {JSON} req
 * @param {JSON} res
 * @param {JSON} next
 */
const findUser = async (req, res, next) => {
  const result = await userModel.findUser({ id: Number(req.params.id) });
  delete result.password;
  result.profile_image = await downloadFilehandler(`${req.params.id}.${result.profile_picture}`);
  res.json(Format.success(result, 'User Fetched Successfully.'));
};

export { getUsers, addUser, updateUser, deleteUser, findUser };
