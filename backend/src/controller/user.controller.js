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
  res.json(Format.success(result, 'User Saved Successfully.'));
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
  const result = await userModel.deleteUser(req.body.id);
  res.json(Format.success(result, 'User Deleted Successfully.'));
};

export { getUsers, addUser, updateUser, deleteUser };
