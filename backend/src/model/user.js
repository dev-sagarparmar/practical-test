/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcryptjs';
import db from '../../config/db-connection';
import { tableNames } from '../../common/constants';
import { create, update, get, destroy } from '../../common/sql';

const { users } = tableNames;

const userModel = {};

// CREATE USER
userModel.createUser = async (props) => {
  props.password = bcrypt.hashSync(props.password, 10);
  const query = create(users, props);
  const result = await db.query(query);
  return result;
};

// GET ALL USERS
userModel.getUsers = async () => {
  const query = get(users);
  const result = await db.query(query);
  return result;
};

// UPDATE USER
userModel.updateUser = async (props) => {
  const query = update(users, props);
  const result = await db.query(query);
  return result;
};

// DELETE USER
userModel.deleteUser = async (id) => {
  const query = destroy(users, id);
  const result = await db.query(query);
  return result;
};

// FIND BY EMAIL USER
userModel.findUser = async (props = {}, keys = [], returnArray = false) => {
  let query = `SELECT ${keys && keys.length ? `${keys.join()}` : '*'} FROM ${users} WHERE 1 = 1 `;
  Object.keys(props).forEach((key) => {
    if (props[key] !== null) {
      query += `AND ${key} ${typeof props[key] === 'string' ? `ILIKE '%${props[key]}%'` : `= ${props[key]}`} `;
    }
  });
  const result = await db.query(query);
  if (result && result.length) {
    return returnArray ? result : result[0];
  }
  return null;
};

export { userModel };
