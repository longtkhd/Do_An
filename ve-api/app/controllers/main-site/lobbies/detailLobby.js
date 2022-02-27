import * as lobbiesService from '@services/lobbies';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
  buildAssetsResponse,
} from '@helpers/response';
import { loadUserToRequest } from '@helpers/jwt';

export default [
  loadUserToRequest(),
  async (req, res) => {
    try {
      const { id } = req.params;
      const lobby = await lobbiesService.findOneLobbyByField({ id });
      if (!lobby) {
        const dataErr = errorData(COMMON_CODE.NOT_FOUND);
        return buildErrorResponse(res, dataErr, 404);
      }
      return buildSuccessResponse(
        res,
        successData({ lobby: buildAssetsResponse(lobby) }),
        200
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
