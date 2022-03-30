import {
  Form,
  redirect,
  json,
  LoaderFunction,
  ActionFunction,
  useLoaderData,
  useActionData,
  MetaFunction
} from "remix";
import { isEmpty } from "lodash";
import { IUserReference, IError } from "~/types";
import { BackButton, ErrorSummary, Help } from "~/components";
import {
  Button,
  BUTTON_TYPE,
  ErrorPosition,
  FormInput,
} from "@capgeminiuk/dcx-react-library";
import { addUserReference, getUserReference } from "./add-your-reference/addYourReference";
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
  const { catchCertificate } = params;
  const form = await request.formData();
  const userReference: IUserReference = await addUserReference(
    catchCertificate,
    form.get("userReference") as string
  );
  const errors: IError[] = userReference.errors || [];

  if (errors.length > 0) {
    return json(
      {
        errors: getTransformedError(errors),
        userReference: userReference.userReference,
      },
      { status: 400 }
    );
  }

  return redirect(
    `/create-catch-certificate/${catchCertificate}/what-are-you-exporting`
  );
};

const UserReferencePage = () => {
  const { errors = {}, userReference } = useActionData() || {};
  const data = useLoaderData<IUserReference>();
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
        <FormInput
          label="Your reference (optional)"
          containerClassName="govuk-form-group"
          inputClassName="govuk-input govuk-!-width-two-thirds"
          labelClassName="govuk-label"
          name="userReference"
          inputProps={{ id: "userReference" }}
          type="text"
          value={userReference || data.userReference}
          hint={{
            position: "above",
            text: "Enter a reference to help you identify this catch certificate within the service. This reference is for your own use and will not appear on the final certificate. For example, you could choose a reference number from your organisation.",
            id: "userReferenceHint",
            className: "govuk-hint govuk-!-width-two-thirds",
          }}
          errorProps={{ className: "govuk-error-message" }}
          staticErrorMessage={errors?.userReference?.message}
          errorPosition={ErrorPosition.AFTER_LABEL}
          containerClassNameError="govuk-form-group--error"
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
