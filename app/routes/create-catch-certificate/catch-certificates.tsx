import { ReactElement } from "react";
import { json, useLoaderData } from "remix";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { IDashboardData } from "../../../interfaces/catch-certificate.interface";
import { ProgressTable, CompleteTable, NotificationBanner } from "~/components";
import { Journeys } from "../../../data/constants";
import CONFIG from "../../../config/config";

export const loader = async () => {
  const res = await fetch(
    `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/documents/2022/3?type=catchCertificate`
  );
  const data = await res.json();

  const response = await fetch(
    `${CONFIG.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/notification`
  );
  const notification = await response.json();

  return json({ ...data, notification });
};

const Dashboard = (): ReactElement => {
  const data = useLoaderData<IDashboardData>();

  return (
    <>
      <NotificationBanner {...data.notification} />
      <h1 className="govuk-heading-xl">Catch certificates</h1>
      <Button
        label="Create a new catch certificate"
        type={BUTTON_TYPE.SUBMIT}
        className="govuk-button"
        data-module="govuk-button"
      />
      <h2 className="govuk-heading-l">In progress</h2>
      <p className="govuk-body">
        A maximum of 50 draft catch certificates is allowed at any time.
        <br />
        For pending submissions, refresh regularly to see updates.
        <br />
        For failed submissions, continue the document to view resolution
        instructions.
      </p>
      <ProgressTable
        certificates={data.inProgress}
        journey={Journeys.CatchCertificate}
      />
      <h2 className="govuk-heading-l">Completed</h2>
      <CompleteTable certificates={data.completed} />
    </>
  );
};

export default Dashboard;
