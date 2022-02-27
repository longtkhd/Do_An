import { isAuthenticated } from '@helpers/jwt';
import { successData, buildSuccessResponse } from '@helpers/response';

export default [
  isAuthenticated,
  (req, res) => {
    const { user } = req;
    const dataSuccess = successData({
      user: user,
    });
    return buildSuccessResponse(res, dataSuccess);
  },
];
