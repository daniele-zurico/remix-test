import { json, useLoaderData } from "remix";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import {
  ProgressTable,
  CompleteTable,
  NotificationBanner,
} from "~/composite-components";
import { IDashboardPSData, Journeys } from "~/types";
import { getProcessingStatments } from "~/models";

export const loader = async () => {
  return json(await getProcessingStatments());
};

const ProcessingStatement = () => {
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

export default ProcessingStatement;
