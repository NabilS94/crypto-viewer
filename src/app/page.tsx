import AssetsTable from "@/components/asset/AssetsTable";
import { GetAllAssetsService } from "@/services/asset";
import { AxiosError } from "axios";

async function getAllAssetsInfo() {
  const result = await Promise.resolve(GetAllAssetsService())
    .then((res) => {
      return { response: "OK", data: res.data };
    })
    .catch((err: AxiosError) => {
      return { response: "Error", err: err };
    });

  if (result.response === "OK" && "data" in result) return result.data;
  else throw { result };
}

export default async function Home() {
  const data = await getAllAssetsInfo();

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <AssetsTable initialData={data} />
    </main>
  );
}
