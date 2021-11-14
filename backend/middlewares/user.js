import { userModel } from '../src/model/user';
import { Format } from '../common/format';

/**
 * Verifies user's email Id and password
 *
 * @param {JSON} req
 * @param {JSON} res
 * @param {JSON} next
 * @returns {any}
 */
export const uniqueEmailValidate = async (req, res, next) => {
  const { email } = req.body;
  const alreadyTaken = await userModel.findUser({ email });
  if (alreadyTaken) {
    return res.json(Format.resetContent(null, 'Email address already taken.'));
  }
  return next();
};

export default { uniqueEmailValidate };
