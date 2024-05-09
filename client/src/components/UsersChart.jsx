import React from "react";
import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";

// Import necessary scales from Chart.js
import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import 'chartjs-adapter-moment';

const UsersChart = ({usersData}) => {

    console.log(usersData);

    // Count the number of admin and non-admin users
  const adminCount = usersData.filter(user => user.isAdmin).length;
  const nonAdminCount = usersData.length - adminCount;

  // Define data for the pie chart
  const chartData = {
    labels: ['Admin Users', 'Non-Admin Users'],
    datasets: [
      {
        data: [adminCount, nonAdminCount],
        backgroundColor: [
          'rgba(255, 99, 132)', // Red for admin users
          'rgba(54, 162, 235)', // Blue for non-admin users
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };


      return (
        <div className=" w-[60%]">
            <h1 className=" text-center font-bold uppercase py-5">Users Chart</h1>
          <Pie data={chartData} />
        </div>
      );
}

export default UsersChart