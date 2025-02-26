import { AssetDescription } from "@/components/asset/AssetDescription";
import AssetGraph from "@/components/asset/AssetGraph";
import { GetAssetHistoryService, GetAssetService } from "@/services/asset";
import { ASSET_HISTORY_DURATION_CONFIG } from "@/utils/constants";
import { AxiosError } from "axios";

async function getAssetInfo(assetId: string) {
  const result = await Promise.resolve(GetAssetService({ id: assetId }))
    .then((res) => {
      return { response: "OK", data: res.data };
    })
    .catch((err: AxiosError) => {
      return { response: "Error", err: err };
    });

  if (result.response === "OK" && "data" in result) return result.data;
  else throw { result };
}

async function getAssetHistory(params: API.Req.AssetsHistoryParams) {
  const result = await Promise.resolve(GetAssetHistoryService(params))
    .then((res) => {
      return { response: "OK", data: res.data };
    })
    .catch((err: AxiosError) => {
      return { response: "Error", err: err };
    });

  if (result.response === "OK" && "data" in result) return result.data;
  else throw { result };
}

export default async function Asset({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const urlParams = await params;
  const assetData = await getAssetInfo(urlParams.id);

  const dailyAssetHistory = await getAssetHistory({
    id: urlParams.id,
    interval: ASSET_HISTORY_DURATION_CONFIG.day.interval,
    duration: ASSET_HISTORY_DURATION_CONFIG.day.duration,
  });

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <AssetDescription data={assetData.data} />
      <AssetGraph
        initialData={dailyAssetHistory}
        assetName={assetData.data.name}
        assetId={assetData.data.id}
      />
    </main>
  );
}
