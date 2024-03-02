import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { backend_server } from "../../main";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import PieChartIcon from "@mui/icons-material/PieChart";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const BookPieChart = () => {
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${backend_server}/api/v1/mostBorrowedCategories`
      );
      setBookData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setBookData(null);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[50px] flex justify-between items-center">
        <span className=" font-semibold text-[1.5rem] mx-3 mt-4 flex justify-center items-center capitalize">
          Pie chart <PieChartIcon className="ml-2" />
        </span>
        <Link
          to="/admin/managebooks"
          className=" no-underline mx-3 mt-4 bg-[#6a5af9] dark:bg-[#4cceac] text-[#ffffff] p-2 rounded-xl font-semibold hover:scale-[1.05] duration-[0.4s] flex justify-center items-center"
          >
          More Details
          <HelpOutlineIcon className=" ml-1 text-[1.3rem]" />
        </Link>
      </div>
      <span className="flex justify-center items-center h-[50px] w-fit ml-3 mt-1 bg-slate-200 px-2  rounded-2xl italic text-[#303030]  ">Top most popular book genres</span>
      {bookData ? (
        <div className="h-[400px] w-full flex items-center justify-center">
          <Pie
            className="ml-4"
            data={{
              labels: bookData.labels,
              datasets: [
                {
                  data: bookData.data,
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#8A2BE2",
                    "#20B2AA",
                    "#7FFF00",
                    "#FF69B4",
                    "#00FFFF",
                    "#5F9EA0",
                    "#6F00FF",
                    "#8DA399",
                    "#FBCEB1",
                    "#97233F",
                    "#E44D2E",
                    "#F400A1",
                    "#FFC72C",
                    "#FFFF00",
                    "#FFD700",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  position: "right", // Position the legend to the right
                  labels: {
                    boxWidth: 15, // Adjust legend box width
                    padding: 15, // Adjust legend padding
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.label || "";
                      const value = context.parsed || 0;
                      const dataset = context.dataset;
                      const total = dataset.data.reduce(
                        (previousValue, currentValue) =>
                          previousValue + currentValue,
                        0
                      );
                      const percent = parseFloat(
                        ((value / total) * 100).toFixed(2)
                      );
                      return `${label}: ${percent}%`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default BookPieChart;
