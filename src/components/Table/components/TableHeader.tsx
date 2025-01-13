import { ReactNode } from 'react';

type TableHeaderProps = { children: ReactNode } & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

const TableHeader = ({ children, ...props }: TableHeaderProps) => (
  <th {...props}>{children}</th>
);

export default TableHeader;
