import MarketsTable from "@/components/market/MarketsTable";
import { GetAllExchangesService } from "@/services/exchange";
import { logger } from "@/utils/logger";
import { AxiosError } from "axios";

async function getAllExchangesInfo() {
  const result = await Promise.resolve(GetAllExchangesService())
    .then((res) => {
      return { response: "OK", data: res.data };
    })
    .catch((err: AxiosError) => {
      return { response: "Error", err: err };
    });

  if (result.response === "OK" && "data" in result) return result.data;
  else {
    if ("err" in result)
      logger.logError(result.err as Error, {
        endpoint: "GetAllExchangesService",
      });
    throw { result };
  }
}

export default async function Markets() {
  const data = await getAllExchangesInfo();

  return (
    <>
      <MarketsTable initialData={data} />
    </>
  );
}
