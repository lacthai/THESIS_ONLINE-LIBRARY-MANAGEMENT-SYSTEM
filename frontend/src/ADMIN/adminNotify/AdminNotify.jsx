import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { backend_server } from '../../main';

const AdminNotify = () => {
  const [userInputs, setUserInputs] = useState([]);

  useEffect(() => {
    const fetchUserInputs = async () => {
      try {
        const response = await axios.get(`${backend_server}/api/v1/userInputs`);
        setUserInputs(response.data);
      } catch (error) {
        console.error('Error fetching user inputs:', error);
      }
    };

    fetchUserInputs();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 180 },
    { field: 'problem', headerName: 'Problem', width: 200 },
    { field: 'suggestion', headerName: 'Suggestion', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 200 }
  ];

  return (
    <div className='h-[120vh] w-full'>
        <div className="h-[300px] w-[90%]">

      <DataGrid
        rows={userInputs}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
      />
        </div>
    </div>
  );
};

export default AdminNotify;
