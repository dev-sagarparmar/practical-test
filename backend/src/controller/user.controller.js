import { Format } from '../../common/format';
import { userModel } from '../model/user';

/**
 * Get User controller
 *
 * @param {JSON} req
 * @param {JSON} res
 * @param {JSON} next
 */
const getUsers = async (req, res, next) => {
  const result = await userModel.getUsers();
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
  const result = await userModel.createUser(req.body);
  res.json(Format.success(result, 'User registered Successfully.\nKindly login.'));
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
  const result = await userModel.findUser({ id: req.params.id });
  delete result.password;
  res.json(Format.success(result, 'User Fetched Successfully.'));
};

export { getUsers, addUser, updateUser, deleteUser, findUser };
