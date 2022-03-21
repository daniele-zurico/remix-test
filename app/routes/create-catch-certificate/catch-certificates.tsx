import { ReactElement } from "react";
import { json, useLoaderData } from "remix";
import { CatchCertificate, CompletedCertificate } from "./catchCertificate";
import { Notification } from "../../../data/notification";
import { ProgressTable, CompleteTable, NotificationBanner, PrimaryButton } from "~/components";
import { Journeys } from "../../../data/constants";

export const loader = async () => {
  const res = await fetch(`${process.env.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/documents/2022/3?type=catchCertificate`);
  const data = await res.json();

  const response = await fetch(`${process.env.MMO_ECC_ORCHESTRATION_SVC_URL}/v1/notification`);
  const notification = await response.json();

  return json({ ...data, notification });
};

const Dashboard = (): ReactElement => {
  const data = useLoaderData<{
    inProgress: CatchCertificate[],
    completed: CompletedCertificate[]
    notification: Notification
  }>();

  return (
    <>
      <NotificationBanner {...data.notification} />
      <h1 className='govuk-heading-xl'>Catch certificates</h1>
      <PrimaryButton>Create a new catch certificate</PrimaryButton>
      <h2 className='govuk-heading-l'>In progress</h2>
      <p className="govuk-body">
        A maximum of 50 draft catch certificates is allowed at any time.
        <br/>
        For pending submissions, refresh regularly to see updates.
        <br/>
        For failed submissions, continue the document to view resolution instructions.
      </p>
      <ProgressTable 
        certificates={data.inProgress}
        journey={Journeys.CatchCertificate}
      />
      <h2 className='govuk-heading-l'>Completed</h2>
      <CompleteTable 
        certificates={data.completed}
      />
    </>
  );
};

export default Dashboard;