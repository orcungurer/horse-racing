import React from "react";

interface TableWrapperProps {
  title: string;
  children: React.ReactNode;
}

const TableWrapper: React.FC<TableWrapperProps> = ({ title, children }) => {
  return (
    <div>
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto border border-gray-300 rounded">
        {children}
      </div>
    </div>
  );
};

export default TableWrapper;
