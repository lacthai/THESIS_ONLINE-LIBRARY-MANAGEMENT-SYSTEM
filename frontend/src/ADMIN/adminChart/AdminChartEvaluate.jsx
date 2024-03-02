import Chart from 'chart.js/auto';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { backend_server } from '../../main';
import EventIcon from '@mui/icons-material/Event';
import Loading from '../../Components/Loading/Loading';
import AdminPieChartEvaluate from './adminPieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AdminMostUser from './AdminMostUser';


const AdminChartEvaluate = () => {
  const [mostBorrowedBooksData, setMostBorrowedBooksData] = useState(null);
  const [timeframe, setTimeframe] = useState('week');
  const mostBorrow_Api_url = `${backend_server}/api/v1/mostBorrowed?timeframe=${timeframe}`;

  useEffect(() => {
    fetchData();
  }, [timeframe]);

  const fetchData = async () => {
    try {
      const response = await axios.get(mostBorrow_Api_url);
      const { labels, data, bookTitles, bookCategories } = response.data;

      setMostBorrowedBooksData({
        labels,
        datasets: [
          {
            label: 'Number of Borrowings',
            data,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            bookTitles,
            labels,
            bookCategories,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setMostBorrowedBooksData(null);
    }
  };

  const handleChangeTimeframe = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className='h-[200vh] px-4'>
      <div className="flex h-[500px] mb-5 gap-3">
        <div className="w-[50%]  bg-[#DCDCDC] dark:bg-[#ffffff] shadow-xl shadow-slate-300 rounded-xl"><AdminPieChartEvaluate /></div>
        <div className="w-[50%]  bg-[#DCDCDC] dark:bg-[#ffffff] shadow-xl shadow-slate-300 rounded-xl">
          <div className="w-full h-[10%] flex justify-between items-center">
            <span className='flex justify-center items-center font-semibold text-[1.5rem] mt-4 mx-3'>Leaderboard<MilitaryTechIcon className='ml-2 text-[1.8rem]'/></span>
            <span className='mt-4 mx-3 italic text-[0.9rem] bg-slate-200 px-2 rounded-xl'>Rank the students who read the most books</span>
          </div>
          <AdminMostUser />
        </div>
      </div>
      <div className='shadow-xl shadow-slate-300 rounded-xl'>
        <div className='bg-[#DCDCDC] dark:bg-[#ffffff] w-full flex justify-between items-center rounded-tl-xl rounded-tr-xl'>
        <h2 className='text-[#303030] text-center font-semibold text-[1.5rem] ml-4 flex justify-center items-center'>Most Borrowed Books<BarChartIcon className='ml-2'/></h2>
          <div className="bg-[#eee] w-fit py-2 px-6 flex justify-center items-center gap-x-2 rounded-xl">
          <span className='bg-[#89CFF0] text-[#0000FF] p-2 rounded-full'><EventIcon /></span>
          <button onClick={() => handleChangeTimeframe('week')} className={`${timeframe === 'week' ? 'bg-[#ffffff]' : ''} px-4 py-[0.7rem] rounded-xl font-bold duration-[0.5s] ease-in-out`}>Week</button>
          <button onClick={() => handleChangeTimeframe('month')} className={`${timeframe === 'month' ? 'bg-[#ffffff]' : ''} px-4 py-[0.7rem] rounded-xl font-bold duration-[0.5s] ease-in-out`}>Month</button>
          <button onClick={() => handleChangeTimeframe('year')} className={`${timeframe === 'year' ? 'bg-[#ffffff]' : ''} px-4 py-[0.7rem] rounded-xl font-bold duration-[0.5s] ease-in-out`}>Year</button>
          </div>
        </div>
        {mostBorrowedBooksData ? (
          <Bar
            className='bg-[#DCDCDC] dark:bg-[#ffffff] rounded-bl-xl rounded-br-xl'
            data={mostBorrowedBooksData}
            options={{
              scales: {
                y: {
                  type: 'linear',
                  beginAtZero: true,
                },
                x: {
                  title: {
                    display: true,
                    text: 'Book ID',
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const dataset = mostBorrowedBooksData.datasets[context.datasetIndex];
                      const bookTitle = dataset.bookTitles[context.dataIndex];
                      return `Title: ${bookTitle}`;
                    },
                    afterLabel: (context) => {
                      const dataset = mostBorrowedBooksData.datasets[context.datasetIndex];
                      const category = dataset.bookCategories[context.dataIndex];
                      return `Category: ${category}`;
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default AdminChartEvaluate;
