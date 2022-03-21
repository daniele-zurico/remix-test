import { ReactElement } from "react";
import { json, useLoaderData } from "remix";
import { StorageDocument, getStorageDocuments } from "./storageDocument";
import { ProgressTable } from "~/components";
import { Journeys } from "../../../data/constants";

export const loader = async () => {
  return json(getStorageDocuments());
};

const Dashboard = (): ReactElement => {
  const certificates = useLoaderData<StorageDocument[]>();
  return (
    <ProgressTable 
      certificates={certificates}
      journey={Journeys.storageDocument}
    />
  );
};

export default Dashboard;