import { ReactElement } from "react";
import { json, useLoaderData } from "remix";
import { getProcessingStatements } from "./processingStatement";
import { ProgressTable } from "~/components";
import { IProcessingStatement } from "~/interfaces/processing-statement.interface";
import { Journeys } from "../../data/constants";

export const loader = async () => {
  return json(getProcessingStatements());
};

const Dashboard = (): ReactElement => {
  const certificates = useLoaderData<IProcessingStatement[]>();
  return (
    <ProgressTable
      certificates={certificates}
      journey={Journeys.storageDocument}
    />
  );
};

export default Dashboard;