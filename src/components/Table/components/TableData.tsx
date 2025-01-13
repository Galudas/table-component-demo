import { ReactNode } from 'react';

type TableDataProps = { children: ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

const TableData = ({ children, ...props }: TableDataProps) => (
  <td {...props}>{children}</td>
);

export default TableData;
