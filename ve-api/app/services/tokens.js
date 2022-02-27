'use strict';
import models from '@models';
const { tokens: tokensModel } = models;

const saveUserToken = async (userId, token) => {
  const userToken = await findTokenByUser(userId);
  const createToken = {
    userId,
    token,
  };
  if (userToken) return userToken.update(createToken);
  return tokensModel.create(createToken);
};

const findTokenByUser = (userId) => {
  return tokensModel.findOne({
    where: {
      userId,
    },
  });
};

const detroyTokenByToken = (token) => {
  return tokensModel.destroy({
    where: {
      token,
    },
  });
};
export { saveUserToken, findTokenByUser, detroyTokenByToken };
