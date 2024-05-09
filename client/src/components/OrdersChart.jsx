import React from "react";
import Chart from 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";

// Import necessary scales from Chart.js
import 'chartjs-adapter-date-fns';
import 'chartjs-adapter-luxon';
import 'chartjs-adapter-moment';

const OrdersChart = ({ ordersData }) => {
  const dates = ordersData.map((order) => {
    const date = new Date(order.createdAt);
    return date.toLocaleDateString(); // Convert to locale date string (e.g., "MM/DD/YYYY")
  });
  const amounts = ordersData.map((order) => order.amount);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Orders Amount",
        data: amounts,
        fill: false,
        backgroundColor: 'rgba(10, 5, 10)', // Background color of bars
        borderColor: 'rgba(75, 192, 192, 1)', // Border color of bars
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  };

  return (
    <div className=" w-full">
      <h1 className=" text-center font-bold uppercase py-5">Orders Graph</h1>
      <Bar data={data} />
    </div>
  );
};

export default OrdersChart;
