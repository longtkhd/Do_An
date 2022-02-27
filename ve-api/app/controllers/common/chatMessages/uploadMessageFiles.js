import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { uploadFileMultiField } from '@helpers/file';
import { loadUserToRequest } from '@helpers/jwt';

const fieldsUpload = [
  {
    name: 'files',
    maxCount: 5,
    destination: `chatMessages/files`,
  },
];

export default [
  loadUserToRequest(),
  uploadFileMultiField(fieldsUpload),
  (req, res) => {
    try {
      const { files } = req.files;
      return buildSuccessResponse(
        res,
        successData({
          uploadStatus: 'success',
          fileList: files.map((file) => file.key.split('/').pop()),
        }),
        201
      );
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
