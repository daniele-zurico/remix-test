import { json, useLoaderData } from "remix";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { ProgressTable, CompleteTable, NotificationBanner } from "~/components";
import { IDashboardPSData } from "~/interfaces";
import { Journeys } from "~/data/constants";
import CONFIG from "~/config";

export const loader = async () => {
  const res = await fetch(
    `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/documents/2022/3?type=processingStatement`
  );
  const data = await res.json();

  const response = await fetch(
    `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/notification`
  );
  const notification = await response.json();

  return json({ ...data, notification });
};

const Dashboard = () => {
  const data = useLoaderData<IDashboardPSData>();
  return (
    <>
      <NotificationBanner {...data.notification} />
      <h1 className="govuk-heading-xl">Processing statements</h1>
      <Button
        label="Create a new processing statement"
        type={BUTTON_TYPE.SUBMIT}
        className="govuk-button"
        data-module="govuk-button"
      />
      <h2 className="govuk-heading-l">In progress</h2>
      <p className="govuk-body">
        A maximum of 50 draft processing statements is allowed at any time.
      </p>
      <ProgressTable
        certificates={data.inProgress}
        journey={Journeys.ProcessingStatement}
      />
      <h2 className="govuk-heading-l">Completed</h2>
      <CompleteTable certificates={data.completed} />
    </>
  );
};

export default Dashboard;
