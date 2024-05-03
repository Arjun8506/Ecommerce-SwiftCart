import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const ProductTable = ({ products, onDelete }) => {
  const navigate = useNavigate();

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Category", accessor: "category" },
      { Header: "Brand", accessor: "brand" },
      { Header: "Price", accessor: "price" },
      { Header: "Availability", accessor: "availability" },
      { Header: "Quantity", accessor: "quantity" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex justify-between px-4">
            <button
              onClick={() =>
                navigate(`/admin/products/edit/${row.original._id}`)
              }
              className="py-1 px-3 bg-red-500 text-white rounded-lg hover:opacity-80"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(row.original._id)}
              className="py-1 px-3 bg-green-500 text-white rounded-lg hover:opacity-80"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => products, [products]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="w-full px-5 mb-24 overflow-x-hidden">
      <table {...getTableProps()} className="w-full horizontal">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted && (
                    <span className="text-purple-400 text-xs">
                      {column.isSortedDesc ? (
                        <>
                          <br />
                          Desending
                        </>
                      ) : (
                        <>
                          <br />
                          Acending
                        </>
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full py-2">
        <div className=" w-fit mx-auto  flex gap-3 items-center">
          <button
            className="btn bg-black text-white"
            onClick={() => gotoPage(0)}
            disabled ={pageIndex === 0}
          >
            First
          </button>
          <button
            disabled={!canPreviousPage}
            className="btn bg-black text-white"
            onClick={previousPage}
          >
            <GrLinkPrevious />
          </button>

          <span>
            {pageIndex + 1} of {pageCount}
          </span>
          <button
            disabled={!canNextPage}
            className="btn bg-black text-white"
            onClick={nextPage}
          >
            <GrLinkNext />
          </button>
          <button
          disabled ={pageIndex === (pageCount - 1)}
            className="btn bg-black text-white"
            onClick={() => gotoPage(pageCount - 1)}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
