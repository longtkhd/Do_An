import * as requestServices from '@/services/request';

export default {
  getAssets: (params: any) => {
    return requestServices.clientCms
      .get('/assets', { params })
      .then(res => res.data);
  },
  getAsset: (id: number) => {
    return requestServices.clientCms.get(`/assets/${id}`).then(res => res.data);
  },
  updateAsset: (id: number, params: any) => {
    return requestServices.clientCms
      .put(`/assets/${id}`, params)
      .then(res => res.data);
  },
  createAsset: (params: FormData, onUploadProgress = (event: any) => {}) => {
    return requestServices.clientCms
      .post(`/assets`, params, { onUploadProgress })
      .then(res => res.data);
  },
  deleteAsset: (id: number) => {
    return requestServices.clientCms
      .delete(`/assets/${id}`)
      .then(res => res.data);
  },
  deleteAssets: (assetIds: number[]) => {
    return requestServices.clientCms
      .delete(`/assets/delete-many`, { data: { assetIds } })
      .then(res => res.data);
  },
};
