import { type TableDataItem } from "../data/tableData";

type TableRowProps = Record<keyof TableDataItem, string> & {
  status: string;
  isHeader?: boolean;
};

const TableRow = (props: TableRowProps) => {
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
    isHeader,
  } = props;
  const El = isHeader ? "th" : "td";
  return (
    <tr>
      <El>
        {!isHeader ? (
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 flex rounded-full ${
                status === "Approved" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span>{status}</span>
          </div>
        ) : (
          status
        )}
      </El>
      <El>{name}</El>
      <El>{customerLocation}</El>
      <El>{rawSignUpDate}</El>
      <El>{rawRequestSource}</El>
      <El>{rawInvestmentDate}</El>
      <El>{rawInvestmentTime}</El>
      <El>{rawRefundRequestDate}</El>
      <El>{rawRefundRequestTime}</El>
    </tr>
  );
};

export default TableRow;
