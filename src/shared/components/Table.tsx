interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <table className="table-auto w-full text-center">
      <thead>
        <tr className="border-b border-gray-300">
          {headers.map((header) => (
            <th key={header} className="p-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
