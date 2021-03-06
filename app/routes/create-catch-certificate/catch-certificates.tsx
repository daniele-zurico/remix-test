import { json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { IDashboardData, Journeys } from "~/types";
import {
  ProgressTable,
  CompleteTable,
  NotificationBanner,
} from "~/composite-components";
import { getCatchCertificates } from "~/models";

export const loader: LoaderFunction = async () => {
  return json(await getCatchCertificates());
};

const CatchCertificate = () => {
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

export default CatchCertificate;
