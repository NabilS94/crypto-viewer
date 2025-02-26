import MarketsTable from "@/components/market/MarketsTable";
import { GetAllExchangesService } from "@/services/exchange";
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
  else throw { result };
}

export default async function Markets() {
  const data = await getAllExchangesInfo();

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <MarketsTable initialData={data} />
    </main>
  );
}
