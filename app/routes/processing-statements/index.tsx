import { ReactElement } from "react";
import { json, useLoaderData } from "remix";
import { ProcessingStatement, getProcessingStatements } from "./processingStatement";
import { ProgressTable } from "~/components";
import { Journeys } from "../../../data/constants";

export const loader = async () => {
  return json(getProcessingStatements());
};

const Dashboard: React.FC = (): ReactElement => {
  const certificates = useLoaderData<ProcessingStatement[]>();
  return (
    <ProgressTable
      certificates={certificates}
      journey={Journeys.storageDocument}
    />
  );
};

export default Dashboard;