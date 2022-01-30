import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "#",
    Footer: "#",
    accessor: "id",
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "product_name",
  },
  {
    Header: "Category",
    Footer: "Category",
    accessor: "category",
  },
  {
    Header: "Price",
    Footer: "Price",
    accessor: "price",
  },
  {
    Header: "Manufacturer",
    Footer: "Manufacturer",
    accessor: "manufacturer",
  },
  {
    Header: "Production Date",
    Footer: "Production Date",
    accessor: "productionDate",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
];
