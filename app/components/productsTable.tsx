import { Button } from "@capgeminiuk/dcx-react-library";
import { IProduct } from "../interfaces/catch-certificate.interface";

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
          <th scope="col" className="govuk-table__header govuk-!-text-align-right">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {products.map(({ product, commodityCode }) => (
          <tr key={commodityCode} className="govuk-table__row">
            <td scope="row" className="govuk-table__cell">
              {product}
            </td>
            <td className="govuk-table__cell">{commodityCode}</td>
            <td className="govuk-table__cell govuk-!-text-align-right">
              <Button
                label="Edit"
                className="govuk-button  govuk-!-margin-right-4 govuk-button--secondary"
                data-module="govuk-button"
              />
              <Button
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
