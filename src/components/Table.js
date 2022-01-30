import React, { useMemo, useState, Fragment } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import products from "./products.json";
import { COLUMNS } from "./columns.js";
import "./table.css";
import CheckboxComp from "./Checkbox";
import { GlobalFilter } from "./GlobalFilter";
import { PriceInput } from "./PriceInput";

const initialState = {
  isHidden: true,
};

export const Table = () => {
  let [values, setValues] = useState(initialState);

  let rawData = { ...products };

  let dataCategory = products.filter(function (currentObject) {
    if (currentObject.category in rawData) {
      return false;
    } else {
      rawData[currentObject.category] = true;
      return true;
    }
  });

  let dataManu = products.filter(function (currentObject) {
    if (currentObject.manufacturer in rawData) {
      return false;
    } else {
      rawData[currentObject.manufacturer] = true;
      return true;
    }
  });

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => products, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },

    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  const togglePanel = () => {
    setValues({ ...values, isHidden: !values.isHidden });
  };
  return (
    <>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />{" "} */}
      <div className="flex-container">
        <button type="button" onClick={togglePanel} className="button">
          Options
        </button>
        {console.log(globalFilter)}
        {!values.isHidden ? (
          <Fragment>
            <ul>
              <p>Filter By Category</p>
              {dataCategory.map((data) => (
                <li>
                  <CheckboxComp
                    prop="category"
                    data={data}
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />{" "}
                </li>
              ))}
            </ul>
            <ul>
              <p>Filter By Manufacturer</p>
              {dataManu.map((data) => (
                <li>
                  <CheckboxComp
                    prop="manufacturer"
                    data={data}
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                  />
                </li>
              ))}
            </ul>
            <ul>
              <p>Filter By Price</p>
              <li>
                <PriceInput filter={globalFilter} setFilter={setGlobalFilter} />
              </li>
            </ul>
            <div>
              <button type="button" onClick className="button">
                Apply
              </button>
              <button type="button" onClick className="button">
                Reset
              </button>
            </div>
          </Fragment>
        ) : (
          ""
        )}
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};
