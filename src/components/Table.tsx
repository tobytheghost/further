import { useEffect, useState } from "react";
import { getMappedData, type TableDataItem } from "../data/tableData";
import { FormattedRowData } from "../utils/mapData";
import TableRow from "./TableRow";

type TableHeaders = Record<keyof TableDataItem, string>;

const TABLE_HEADERS: TableHeaders = {
  name: "Name",
  customerLocation: "Customer Location",
  rawSignUpDate: "Sign Up Date",
  rawRequestSource: "Request Source",
  rawInvestmentDate: "Investment Date",
  rawInvestmentTime: "Investment Time",
  rawRefundRequestDate: "Refund Request Date",
  rawRefundRequestTime: "Refund Request Time",
} as const;

const Table = () => {
  const [tableRows, setTableRows] = useState<FormattedRowData[]>([]);
  const [dataError, setDataError] = useState(false);

  useEffect(() => {
    try {
      const mappedData = getMappedData();
      setTableRows(mappedData);
    } catch (error) {
      console.error(error);
      setDataError(true);
    }
  }, []);

  if (dataError) return <div>Error loading table data.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-max">
        <thead>
          <TableRow {...TABLE_HEADERS} status="Status" isHeader />
        </thead>
        <tbody>
          {tableRows.map((row) => (
            <TableRow key={row.name} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
