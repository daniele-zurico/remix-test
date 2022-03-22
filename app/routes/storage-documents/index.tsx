import { ReactElement } from "react";
import { json, useLoaderData } from "remix";
import { getStorageDocuments } from "./storageDocument";
import { ProgressTable } from "~/components";
import { IStorageDocument } from "~/interfaces/storage-document.interface";
import { Journeys } from "../../data/constants";

export const loader = async () => {
  return json(getStorageDocuments());
};

const Dashboard = (): ReactElement => {
  const certificates = useLoaderData<IStorageDocument[]>();
  return (
    <ProgressTable 
      certificates={certificates}
      journey={Journeys.storageDocument}
    />
  );
};

export default Dashboard;