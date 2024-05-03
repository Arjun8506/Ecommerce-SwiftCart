import React, { useEffect } from "react";
import SidePanel from "./SidePanel";
import { useGetAllReviews } from "../hooks/useGetAllReviews";

const AdminReviewsPage = () => {
  const { getAllReviews, reviews } = useGetAllReviews();

  useEffect(() => {
    async function fetchData() {
      getAllReviews();
    }
    fetchData();
  }, []);

  console.log(reviews);

  return (
    <section>
      <SidePanel />
      <div className="w-full min-h-screen pt-24 bg-slate-100 flex items-center">
        <div className="w-full min-h-screen rounded-l-md">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="bg-base-200">
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminReviewsPage;
