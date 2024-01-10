import { mappedData } from "../data/tableData";
import TableRow from "./TableRow";

const Table = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-max">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Customer Location</th>
            <th>Sign Up Date</th>
            <th>Request Source</th>
            <th>Investment Date</th>
            <th>Investment Time</th>
            <th>Refund Request Date</th>
            <th>Refund Request Time</th>
          </tr>
        </thead>
        <tbody>
          {mappedData.map((row) => (
            <TableRow key={row.name} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
