import axiosInstance from '@/services/index';
import { AxiosResponse } from 'axios';

const ASSETS_ENDPOINT = '/assets';

/**
 * Fetches all cryptocurrency assets.
 * */
const GetAllAssetsService = async (
  params?: API.Req.AssetsParams
): Promise<AxiosResponse<{ data: API.Res.CryptoAsset[]; timestamp: number }>> => {
  return axiosInstance.get(`${ASSETS_ENDPOINT}`, {
    params: {
      ...(params?.search && { search: params.search }),
      ...(params?.ids && { ids: params.ids }),
      ...(params?.limit && { limit: params.limit }),
      ...(params?.offset && { offset: params.offset })
    },
    paramsSerializer: (params) => {
      return new URLSearchParams(params as Record<string, string>).toString();
    },
    validateStatus: function (status: number) {
      return [200, 201, 204].includes(status);
    }
  });
};

/**
 * Fetches single cryptocurrency asset.
 * */
const GetAssetService = async (params: {
  id: string;
}): Promise<AxiosResponse<{ data: API.Res.CryptoAsset; timestamp: number }>> => {
  return axiosInstance.get(`${ASSETS_ENDPOINT}/${params.id}`, {
    validateStatus: function (status: number) {
      return [200, 201, 204].includes(status);
    }
  });
};

/**
 * Fetches single asset history
 * */
const GetAssetHistoryService = async (
  params: API.Req.AssetsHistoryParams
): Promise<AxiosResponse<{ data: API.Res.CryptoAssetHistory[] }>> => {
  return axiosInstance.get(`${ASSETS_ENDPOINT}/${params.id}/history`, {
    params: {
      ...{ interval: params.interval },
      ...(params?.duration && { start: params.duration?.start }),
      ...(params?.duration && { end: params.duration?.end })
    },
    paramsSerializer: (params) => {
      return new URLSearchParams(params as Record<string, string>).toString();
    },
    validateStatus: function (status: number) {
      return [200, 201, 204].includes(status);
    }
  });
};

/**
 * Fetches asset related market info.
 * */
const GetAssetMarketInfoService = async (
  params: API.Req.AssetsMarketsParams
): Promise<AxiosResponse<{ data: API.Res.CryptoAssetMarket[]; timestamp: number }>> => {
  return axiosInstance.get(`${ASSETS_ENDPOINT}/${params.id}/markets`, {
    params: {
      ...(params?.limit && { limit: params.limit }),
      ...(params?.offset && { offset: params.offset })
    },
    paramsSerializer: (params) => {
      return new URLSearchParams(params as Record<string, string>).toString();
    },
    validateStatus: function (status: number) {
      return [200, 201, 204].includes(status);
    }
  });
};

export { GetAllAssetsService, GetAssetHistoryService, GetAssetMarketInfoService, GetAssetService };
