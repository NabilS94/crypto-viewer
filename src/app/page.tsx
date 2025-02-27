import AssetsTable from '@/components/asset/AssetsTable';
import { GetAllAssetsService } from '@/services/asset';
import { logger } from '@/utils/logger';
import { AxiosError } from 'axios';

async function getAllAssetsInfo() {
  const result = await Promise.resolve(GetAllAssetsService())
    .then((res) => {
      return { response: 'OK', data: res.data };
    })
    .catch((err: AxiosError) => {
      return { response: 'Error', err: err };
    });

  if (result.response === 'OK' && 'data' in result) return result.data;
  else {
    if ('err' in result)
      logger.logError(result.err as Error, {
        endpoint: 'GetAllAssetsService'
      });
    throw { result };
  }
}

export default async function Home() {
  const data = await getAllAssetsInfo();

  return <AssetsTable initialData={data} />;
}
