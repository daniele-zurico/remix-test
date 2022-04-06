import { json, useLoaderData } from "remix";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { ProgressTable, CompleteTable, NotificationBanner } from "~/components";
import { IDashboardSDData, Journeys } from "~/types";
import { getStorageDocuments } from "~/models";

export const loader = async () => {
  return json(await getStorageDocuments());
};

const Dashboard = () => {
  const data = useLoaderData<IDashboardSDData>();
  return (
    <>
      <NotificationBanner {...data.notification} />
      <h1 className="govuk-heading-xl">Storage documents Daniele</h1>
      <Button
        label="Create a new processing statement"
        type={BUTTON_TYPE.SUBMIT}
        className="govuk-button"
        data-module="govuk-button"
      />
      <h2 className="govuk-heading-l">In progress</h2>
      <p className="govuk-body">
        A maximum of 50 draft storage documents is allowed at any time.
      </p>
      <ProgressTable
        certificates={data.inProgress}
        journey={Journeys.storageDocument}
      />
      <h2 className="govuk-heading-l">Completed</h2>
      <CompleteTable certificates={data.completed} />
    </>
  );
};

export default Dashboard;
