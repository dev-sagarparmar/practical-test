import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { JWT_SECRET, JWT_EXPIRATION } from '../config/env-var';
import { userModel } from '../src/model/user';
import { Format } from '../common/format';

/**
 * Validates token and forwards to nex route
 *
 * @param {JSON} req
 * @param {JSON} res
 * @param {JSON} next
 * @returns {any}
 */
const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['access-token'];
  if (!token) {
    return res.json(Format.forbidden(null, 'A token is required for authentication'));
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.json(Format.unAuthorized(err, 'Invalid Token'));
  }
  return next();
};

/**
 * Verifies user's email Id and password
 *
 * @param {JSON} req
 * @param {JSON} res
 * @param {JSON} next
 * @returns {any}
 */
const verifyEmailPassword = async (req, res, next) => {
  const { email, password } = req.body;
  const account = await userModel.findUser({ email });
  const verifyPwd = account && account.password
    ? bcrypt.compareSync(password, account.password) : null;
  if (!account || !verifyPwd) {
    return res.json(Format.unAuthorized(null, 'Invalid Email/Password'));
  }
  account.token = jwt.sign(account, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return res.json(Format.success(account, 'User logged in Successfully'));
};

export { verifyToken, verifyEmailPassword };
