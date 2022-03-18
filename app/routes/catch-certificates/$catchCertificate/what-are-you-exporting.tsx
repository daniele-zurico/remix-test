import { Tab, TabGroup } from "@capgeminiuk/dcx-react-library";
import { json, LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async ({ params }) => {
  return json(params.catchCertificate);
};

const $catchCertificate = () => {
  const ccNumber = useLoaderData();
  return (
    <>
      CatchCertificate: {ccNumber}
      <h1 className="govuk-heading-l">What are you exporting?</h1>
      <TabGroup
        containerClassName="govuk-tabs"
        className="govuk-tabs__list"
        tabClassName="govuk-tabs__list-item"
        tabLinkClassName="govuk-tabs__tab"
        activeTabClassName="govuk-tabs__list-item--selected"
        contentClassName="govuk-tabs__panel"
      >
        <Tab label="Add products" eventKey="tab-pane-add-products">
          <div>I'm the content of the tab Add products</div>
        </Tab>
        <Tab
          label="Add products from favourites"
          eventKey="tab-pane-add-products-from-favourites"
        >
          <div>I'm the content of the tab from favourites</div>
        </Tab>
      </TabGroup>
    </>
  );
};

export default $catchCertificate;
