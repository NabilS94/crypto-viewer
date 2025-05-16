import axiosInstance from '@/services/index';
import { AxiosResponse } from 'axios';

const EXCHANGES_ENDPOINT = '/exchanges';

/**
 * Fetches all cryptocurrency exchanges .
 * */
const GetAllExchangesService = async (): Promise<
  AxiosResponse<{ data: API.Res.ExchangeMarket[] }>
> => {
  return axiosInstance.get(`${EXCHANGES_ENDPOINT}`, {
    validateStatus: function (status: number) {
      return [200, 201, 204].includes(status);
    }
  });
};

export { GetAllExchangesService };
