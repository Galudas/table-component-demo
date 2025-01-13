import { ReactNode } from 'react';

type TableRowProps = { children: ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

const TableRow = ({ children, ...props }: TableRowProps) => (
  <tr {...props}>{children}</tr>
);

export default TableRow;
