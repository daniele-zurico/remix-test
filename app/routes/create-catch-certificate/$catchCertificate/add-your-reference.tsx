import React, { useState } from "react";
import { Form, redirect, json, LoaderFunction, useLoaderData } from "remix";
import type { MetaFunction } from "remix";
import { Action } from "../../../../interfaces/action.interface";
import { 
  BackButton,
  Help,
  HintTextInput,
  PrimaryButton,
  SecondaryButton
} from "../../../components";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Add your reference for this export - Create a UK catch certificate - GOV.UK",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#0b0c0c",
});

export const loader: LoaderFunction = async ({ params }) => {
  const { catchCertificate = '' } = params;
  const response = await fetch("http://localhost:3001/orchestration/api/v1/userReference", {
    method: 'GET',
    headers: {
      documentnumber: catchCertificate
    }
  });
  const userReference: string = await response.text();
  return json({ userReference });
};

export const action = async ({ request, params }: Action) => {
  const { catchCertificate = '' } = params;
  const form = await request.formData();
  const userReference = form.get('userReference');

  await fetch("http://localhost:3001/orchestration/api/v1/userReference", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      documentnumber: catchCertificate
    },
    body: JSON.stringify({ userReference: userReference })
  });
  
  return redirect(`/create-catch-certificate/${catchCertificate}/what-are-you-exporting`);
}

const UserReferencePage: React.FC = () => {
  const data: { userReference: string } = useLoaderData<{ userReference: string }>();
  const [userRefernce, setUserReference] = useState<string>(data.userReference);

  const onChangeUserReference: React.FormEventHandler = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUserReference(event.currentTarget.value);
  }

  return (
    <div className="govuk-!-padding-top-6">
      <BackButton href='/create-catch-certificate/catch-certificates'/>
      <h1 className="govuk-heading-xl govuk-!-margin-bottom-6">Add your reference for this export</h1>
      <Form method="post">
        <HintTextInput 
          hint="Enter a reference to help you identify this catch certificate within the service. This reference is for your own use and will not appear on the final certificate. For example, you could choose a reference number from your organisation."
          id="userReference"
          label="Your reference (optional)"
          id_hint="userReferenceHint"
          value={userRefernce}
          onChange={onChangeUserReference}
        />
        <SecondaryButton>Save as draft</SecondaryButton>
        <PrimaryButton>Save and continue</PrimaryButton>
      </Form>
      <Help />
    </div>
  )
};

export default UserReferencePage;