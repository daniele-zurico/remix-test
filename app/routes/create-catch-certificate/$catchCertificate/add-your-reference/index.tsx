import React, { useState } from "react";
import {
  Form,
  redirect,
  json,
  LoaderFunction,
  ActionFunction,
  useLoaderData,
  useActionData,
} from "remix";
import type { MetaFunction } from "remix";
import { isEmpty } from "lodash";
import { IUserReference, IError } from "../../../../types";

import { BackButton, Help, HintTextInput } from "../../../../components";
import { ErrorSummary } from "~/components/errorSummary";
import { Button, BUTTON_TYPE } from "@capgeminiuk/dcx-react-library";
import { addUserReference, getUserReference } from "./addYourReference";
import { DataFunctionArgs } from "@remix-run/server-runtime";
import { getTransformedError } from "~/helpers";
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

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<Response> => {
  const form = await request.formData();
  const { catchCertificate } = params;
  const userReference: IUserReference = await addUserReference(catchCertificate, form.get("userReference") as string);
  const errors: IError[] = userReference.errors || [];

  if (errors.length > 0) {
    return json({
      errors: getTransformedError(errors),
      userReference: userReference.userReference
    }, { status: 400 });
  }

  return redirect(`/create-catch-certificate/${catchCertificate}/what-are-you-exporting`);
};

const UserReferencePage = () => {
  const data:IUserReference = useLoaderData<IUserReference>() || {};
  const { errors = {}, userReference } = useActionData() || {};
  const [userRefernce, setUserReference] = useState<string | undefined>(userReference || data.userReference);

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
          onChange={onChangeUserReference}
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
