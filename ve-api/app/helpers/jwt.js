import jwt from 'jsonwebtoken';
import * as usersService from '@services/users';
import * as rolePermissionsService from '@services/rolePermissions';
import { systemConfig } from '@configs';
import { COMMON_CODE } from '@constants/codes';
import { errorData, buildErrorResponse } from '@helpers/response';
// import * as tokensService from '@services/tokens';

const signJwt = (payload, secret, expiredTime) => {
  return jwt.sign(payload, secret, {
    expiresIn: expiredTime,
  });
};

const verifyJwtToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};

const loadUserToRequest = () => async (req, res, next) => {
  const accessToken = req.headers['authorization'];
  if (accessToken) {
    const jwtToken = accessToken.split(' ');
    if (jwtToken.length > 1 && jwtToken[1]) {
      const bearerToken = jwtToken[1];
      try {
        const decoded = await verifyJwtToken(
          bearerToken,
          systemConfig.accessTokenSecret
        );
        if (decoded && decoded.userId) {
          const user = await usersService.findOneUserByFieldIncludeRole({
            id: decoded.userId,
          });
          if (user) {
            // const userToken = await tokensService.findTokenByUser(user.id);
            // if (!userToken || userToken.token !== bearerToken) {
            //   return buildErrorResponse(
            //     res,
            //     errorData(COMMON_CODE.LOGIN_ANOTHER_BROWSER),
            //     403
            //   );
            // }
            let permissions = [];
            if (user.roleId) {
              const rolePermissions = await rolePermissionsService.getRolePermissionsByRoleId(
                user.role.id
              );
              permissions = rolePermissions.map(
                (rolePermission) => rolePermission['permission.code']
              );
            } else {
              user.role = null;
            }
            req.user = {
              ...user,
              permissions,
            };
            return next();
          }
        }
      } catch (e) {
        if (e && e.name === jwt.TokenExpiredError.name) {
          return buildErrorResponse(
            res,
            errorData(COMMON_CODE.EXPIRED_ACCESS_TOKEN),
            401
          );
        }
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.INVALID_ACCESS_TOKEN),
          403
        );
      }
    }
  }
  return buildErrorResponse(
    res,
    errorData(COMMON_CODE.INVALID_ACCESS_TOKEN),
    403
  );
};

const isAuthenticated = async (req, res, next) => {
  const accessToken = req.headers['authorization'];
  if (accessToken) {
    const jwtToken = accessToken.split(' ');
    if (jwtToken.length > 1 && jwtToken[1]) {
      const bearerToken = jwtToken[1];
      try {
        const decoded = await verifyJwtToken(
          bearerToken,
          systemConfig.accessTokenSecret
        );
        if (decoded && decoded.userId) {
          const user = await usersService.findOneUserByFieldIncludeRole({
            id: decoded.userId,
          });
          if (user) {
            // const userToken = await tokensService.findTokenByUser(user.id);
            // if (!userToken || userToken.token !== bearerToken) {
            //   return buildErrorResponse(
            //     res,
            //     errorData(COMMON_CODE.LOGIN_ANOTHER_BROWSER),
            //     403
            //   );
            // }
            let permissions = [];
            if (user.roleId) {
              const rolePermissions = await rolePermissionsService.getRolePermissionsByRoleId(
                user.role.id
              );
              permissions = rolePermissions.map(
                (rolePermission) => rolePermission['permission.code']
              );
            } else {
              user.role = null;
            }
            req.user = {
              ...user,
              permissions,
            };
            return next();
          }
        }
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.INVALID_ACCESS_TOKEN),
          403
        );
      } catch (e) {
        if (e && e.name === jwt.TokenExpiredError.name) {
          return buildErrorResponse(
            res,
            errorData(COMMON_CODE.EXPIRED_ACCESS_TOKEN),
            401
          );
        }
        return buildErrorResponse(
          res,
          errorData(COMMON_CODE.INVALID_ACCESS_TOKEN),
          403
        );
      }
    }
  }
  return buildErrorResponse(
    res,
    errorData(COMMON_CODE.INVALID_ACCESS_TOKEN),
    403
  );
};

const hasPermissions = (pers) => [
  isAuthenticated,
  (req, res, next) => {
    const { user } = req;
    // if (user && user.role && user.role.roleAcp) {
    //   return next();
    // }
    if (user && user.permissions) {
      const currentPermissions = user.permissions || [];
      const can = pers.some((x) => currentPermissions.includes(x));
      if (can) {
        return next();
      }
    }
    return buildErrorResponse(
      res,
      errorData(COMMON_CODE.PERMISSION_DENIED),
      401
    );
  },
];

export {
  signJwt,
  verifyJwtToken,
  isAuthenticated,
  hasPermissions,
  loadUserToRequest,
};
