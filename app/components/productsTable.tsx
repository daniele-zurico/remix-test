import { Button } from "@capgeminiuk/dcx-react-library";
import { IProduct } from "../types/catchCertificate";

interface ProductProps {
  products: IProduct[];
}

export const ProductTable = ({ products }: ProductProps) => {
  return (
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th scope="col" className="govuk-table__header">
            Product
          </th>
          <th scope="col" className="govuk-table__header">
            Commodity code
          </th>
          <th
            scope="col"
            className="govuk-table__header govuk-!-text-align-right"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {products.map(({ id, speciesCode, state, presentation, species, stateLabel, presentationLabel, commodityCode, commodityCodeDescription }, index) => (
          <tr key={index} id={`species_${speciesCode}_${state}_${presentation}`} className="govuk-table__row">
            <td scope="row" className="govuk-table__cell" style={{ verticalAlign: 'top', width: '20%' }}>
              {`${species}, ${stateLabel}, ${presentationLabel}`}
            </td>
            <td className="govuk-table__cell" style={{ verticalAlign: 'top', width: '50%' }}>{`${commodityCode} ${
              commodityCodeDescription
                ? '- ' + commodityCodeDescription
                : ''
            }`.trim()}</td>
            <td className="govuk-table__cell govuk-!-text-align-right" style={{ verticalAlign: 'top', width: '20%', margin: 0, placeContent: 'flex-end' }}>
              <Button
                id={`edit_${id}`}
                label="Edit"
                className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary"
                data-module="govuk-button"
              />
              <Button
                id={`remove_${id}`}
                label="Remove"
                className="govuk-button govuk-button--secondary"
                data-module="govuk-button"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
