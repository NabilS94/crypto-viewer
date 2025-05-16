import axios from 'axios';
import { API } from '../types/api';

const COINCAP_API_BASE_URL = process.env.COINCAP_API_BASE_URL || 'https://rest.coincap.io/v3';

const axiosInstance = axios.create({
  baseURL: COINCAP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.COINCAP_API_KEY}`
  }
});

const validateStatus = (status: number) => [200, 201, 204].includes(status);
const paramsSerializer = (params: any) =>
  new URLSearchParams(params as Record<string, string>).toString();

export const getAllAssets = async (params?: API.Req.AssetsParams) => {
  const response = await axiosInstance.get<{ data: API.Res.CryptoAsset[]; timestamp: number }>(
    '/assets',
    {
      params: {
        ...(params?.search && { search: params.search }),
        ...(params?.ids && { ids: params.ids }),
        ...(params?.limit && { limit: params.limit }),
        ...(params?.offset && { offset: params.offset })
      },
      paramsSerializer,
      validateStatus
    }
  );
  return response.data;
};

export const getAsset = async (id: string) => {
  const response = await axiosInstance.get<{ data: API.Res.CryptoAsset; timestamp: number }>(
    `/assets/${id}`,
    {
      validateStatus
    }
  );
  return response.data;
};

export const getAssetHistory = async (params: API.Req.AssetsHistoryParams) => {
  const response = await axiosInstance.get<{ data: API.Res.CryptoAssetHistory[] }>(
    `/assets/${params.id}/history`,
    {
      params: {
        interval: params.interval,
        ...(params.duration?.start && { start: params.duration.start }),
        ...(params.duration?.end && { end: params.duration.end })
      },
      paramsSerializer,
      validateStatus
    }
  );
  return response.data;
};

export const getAssetMarkets = async (params: API.Req.AssetsMarketsParams) => {
  const response = await axiosInstance.get<{
    data: API.Res.CryptoAssetMarket[];
    timestamp: number;
  }>(`/assets/${params.id}/markets`, {
    params: {
      ...(params.limit && { limit: params.limit }),
      ...(params.offset && { offset: params.offset })
    },
    paramsSerializer,
    validateStatus
  });
  return response.data;
};

export const getAllExchanges = async () => {
  const response = await axiosInstance.get<{ data: API.Res.ExchangeMarket[] }>('/exchanges', {
    validateStatus
  });
  return response.data;
};
