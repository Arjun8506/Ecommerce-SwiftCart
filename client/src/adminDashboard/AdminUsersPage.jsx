import React, { useEffect } from "react";
import SidePanel from "./SidePanel";
import { useGetAllUsers } from "../hooks/useAllUsers";
import "../utilsStyle.css";
import { useTable, useSortBy, usePagination } from "react-table";
import { useNavigate } from "react-router-dom";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useDeleteUser } from "../hooks/useDeleteUser";

const AdminUsersPage = () => {
  const { loading, error, users, getAllUsers } = useGetAllUsers();
  useEffect(() => {
    async function fetchdata() {
      await getAllUsers();
    }
    fetchdata();
  }, []);

  const { deleteUser } = useDeleteUser()

  const navigate = useNavigate();

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "_id" },
      { Header: "Name", accessor: "fullname" },
      { Header: "Email", accessor: "email" },
      {
        Header: "IsAdmin",
        accessor: (row) => (row.isAdmin === true ? <p className="font-bold text-green-600">Admin</p> : <p className="font-bold text-red-600">User</p>),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="flex justify-between px-4">
            <button
              onClick={() =>
                navigate(`/admin/users/edit/${row.original._id}`)
              }
              className="py-1 px-3 bg-red-500 text-white rounded-lg hover:opacity-80"
            >
              Edit
            </button>
            <button
              onClick={() => deleteUser(row.original._id)}
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

  const data = React.useMemo(() => users, [users]);

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
    <section>
      <SidePanel />
      <div className="w-full px-5 mb-24 py-24">
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
              disabled={pageIndex === 0}
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
              disabled={pageIndex === pageCount - 1}
              className="btn bg-black text-white"
              onClick={() => gotoPage(pageCount - 1)}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminUsersPage;
