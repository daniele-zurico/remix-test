import React, { useState } from "react";
import {
  Form,
  redirect,
  json,
  LoaderFunction,
  useLoaderData,
  useCatch,
} from "remix";
import type { MetaFunction } from "remix";
import { isEmpty } from "lodash";
import { IAction, IUserReferenceProps, IError } from "../../../../types";

import { BackButton, Help, HintTextInput } from "../../../../components";
import { ErrorSummary } from "~/components/errorSummary";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { addUserReference, getUserReference } from "./addYourReference";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { getErrorMessage, getTransformedError } from "~/helpers";
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title:
    "Add your reference for this export - Create a UK catch certificate - GOV.UK",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

export const loader: LoaderFunction = async ({ params }: DataFunctionArgs) => {
  return json(await getUserReference(params.catchCertificate));
};

export const action = async ({
  request,
  params,
}: IAction): Promise<Response> => {
  const form = await request.formData();
  return redirect(
    await addUserReference(params.catchCertificate, form.get("userReference"))
  );
};

export function CatchBoundary() {
  const caught = useCatch();
  const lookupErrorMessage: IError[] = [
    {
      key: "userReference",
      message: getErrorMessage(caught.data.userReferenceError),
    },
  ];
  const errorUserReference: string = caught.data.userReference;
  return (
    <UserReferencePage
      errors={getTransformedError(lookupErrorMessage)}
      userReference={errorUserReference}
    />
  );
}

const UserReferencePage = ({
  errors = {},
  userReference,
}: React.PropsWithChildren<IUserReferenceProps>) => {
  const data: { userReference: string } = useLoaderData<{
    userReference: string;
  }>() || { userReference };
  const [userRefernce, setUserReference] = useState<string>(data.userReference);

  const onChangeUserReference: React.FormEventHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setUserReference(event.currentTarget.value);
  };

  return (
    <div className="govuk-!-padding-top-6">
      {!isEmpty(errors) && (
        <ErrorSummary
          errors={Object.keys(errors).flatMap((key: string) => errors[key])}
        />
      )}
      <BackButton to="/create-catch-certificate/catch-certificates" />
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">
        Add your reference for this export
      </h1>
      <Form method="post">
        <HintTextInput
          hint="Enter a reference to help you identify this catch certificate within the service. This reference is for your own use and will not appear on the final certificate. For example, you could choose a reference number from your organisation."
          id="userReference"
          label="Your reference (optional)"
          id_hint="userReferenceHint"
          value={userRefernce}
          error={errors.userReference}
        />
        <Button
          label="Save as draft"
          type={BUTTON_TYPE.SUBMIT}
          className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary"
          data-module="govuk-button"
        />
        <Button
          label="Save and continue"
          type={BUTTON_TYPE.SUBMIT}
          className="govuk-button"
          data-module="govuk-button"
        />
      </Form>
      <Help />
    </div>
  );
};

export default UserReferencePage;
