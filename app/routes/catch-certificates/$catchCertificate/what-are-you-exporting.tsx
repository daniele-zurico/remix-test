import { Tab, TabGroup } from "@capgeminiuk/dcx-react-library";
import { json, LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async ({ params }) => {
  return json(params.catchCertificate);
};

const $catchCertificate = () => {
  const ccNumber = useLoaderData();
  return (
    <div className="govuk-!-padding-top-6">
      <h1 className="govuk-heading-xl">What are you exporting?</h1>
      <TabGroup
        containerClassName="govuk-tabs"
        className="govuk-tabs__list"
        tabClassName="govuk-tabs__list-item"
        tabLinkClassName="govuk-tabs__tab"
        activeTabClassName="govuk-tabs__list-item--selected"
        contentClassName="govuk-tabs__panel"
      >
        <Tab label="Add products" eventKey="tab-pane-add-products">
          <>
            <h2 className="govuk-heading-l">Add products</h2>
          </>
        </Tab>
        <Tab
          label="Add products from favourites"
          eventKey="tab-pane-add-products-from-favourites"
        >
          <>
            <h2 className="govuk-heading-l">Add products from favourites</h2>
          </>
        </Tab>
      </TabGroup>
    </div>
  );
};

export default $catchCertificate;
