import { FormattedRowData } from "../utils/mapData";

const TableRow = (props: FormattedRowData) => {
  const {
    status,
    name,
    customerLocation,
    rawSignUpDate,
    rawRequestSource,
    rawInvestmentDate,
    rawInvestmentTime,
    rawRefundRequestDate,
    rawRefundRequestTime,
  } = props;
  return (
    <tr>
      <td>
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 flex rounded-full ${
              status === "Approved" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span>{status}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>{customerLocation}</td>
      <td>{rawSignUpDate}</td>
      <td>{rawRequestSource}</td>
      <td>{rawInvestmentDate}</td>
      <td>{rawInvestmentTime}</td>
      <td>{rawRefundRequestDate}</td>
      <td>{rawRefundRequestTime}</td>
    </tr>
  );
};

export default TableRow;
