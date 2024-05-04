// HighPriorityTodos.js
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, ButtonGroup, Chip, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HighPriorityTodos = () => {
  const [midPriorityRows, setmidPriorityRows] = useState([]);

  const fetchHighPriorityTodos = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      const headers = {
        'Content-Type': 'application/json',
        'auth-token': `${authToken}`,
      };
      // Fetch high-priority todos based on your API endpoint
      const response = await fetch(`https://todo-kb-intern.onrender.com/api/main/midtodo`, {
        headers: headers,
      });

      const data = await response.json();

      setmidPriorityRows(data.midPriorityTodos);
    } catch (error) {
      console.error('Error fetching high-priority todos:', error);
    }
  };

  useEffect(() => {
    fetchHighPriorityTodos(); // Initial fetch

    // Run fetchHighPriorityTodos every 3 seconds
    const intervalId = setInterval(fetchHighPriorityTodos, 3000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const renderPriorityCell = (params) => {
    const priority = params.value;

    let priorityText = '';
    let priorityColor = '';

    switch (priority) {
      case 0:
        priorityText = 'Low';
        priorityColor = 'default';
        break;
      case 1:
        priorityText = 'Mid';
        priorityColor = 'primary';
        break;
      case 2:
        priorityText = 'High';
        priorityColor = 'secondary';
        break;
      default:
        break;
    }

    return <Chip label={priorityText} color={priorityColor} />;
  };

  const renderStatusCell = (params) => {
    const status = params.value;

    let statusText = '';
    let statusColor = '';

    switch (status) {
      case false:
        statusText = 'Not Completed';
        statusColor = 'error';
        break;
      case true:
        statusText = 'Completed';
        statusColor = 'success';
        break;
      default:
        break;
    }

    return <Chip label={statusText} color={statusColor} />;
  };

  const navigate = useNavigate();

  const renderEditDeleteCell = (params) => {
    const handleEditClick = () => {
      // Implement your edit logic here, you can navigate to an edit page or show a modal
      navigate(`/edittodo/?todoId=${params.row._id}`)
      console.log('Edit clicked for row:', params.row);
    };

    const handleDeleteClick = async () => {
      // Assuming params.row._id contains the ID of the item to be deleted
      const id = params.row._id;

      try {
        const authToken = localStorage.getItem('authToken');

        const headers = {
          'Content-Type': 'application/json',
          'auth-token': `${authToken}`,
        };

        const response = await fetch(`https://todo-kb-intern.onrender.com/api/main/todos/${id}`, {
          method: 'DELETE',
          headers: headers,
        });

        if (response.ok) {
          // Handle successful deletion
          toast.success("Todo Deleted Successfully");
          console.log('Item deleted successfully');

          // Fetch updated data
          const updatedResponse = await fetch(`https://todo-kb-intern.onrender.com/api/main/midtodo`, {
            headers: headers,
          });

          const updatedData = await updatedResponse.json();

          setmidPriorityRows(updatedData.midPriorityTodos);
        } else {
          // Handle error response
          toast.error("Failed to Delete TODO");
          console.error('Failed to delete item');
        }
      } catch (error) {
        // Handle fetch error
        console.error('Error deleting item:', error);
      }
    };

    return (
      <ButtonGroup>
        <Button onClick={handleEditClick} variant="outlined" color="primary">
          Edit
        </Button>
        <Button onClick={handleDeleteClick} variant="outlined" color="error">
          Delete
        </Button>
      </ButtonGroup>
    );
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'user_email', headerName: 'User Email', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'status', headerName: 'Status', width: 200, renderCell: renderStatusCell },
    { field: 'priority', headerName: 'Priority', width: 120, renderCell: renderPriorityCell },
    { field: 'due_datetime', headerName: 'Due Date', width: 200, renderCell: (params) => formatDate(params.value), sortComparator: (v1, v2) => new Date(v1) - new Date(v2) },
    { field: 'created_at', headerName: 'Created At', width: 200, renderCell: (params) => formatDate(params.value), sortComparator: (v1, v2) => new Date(v1) - new Date(v2) },
    {
      field: 'editDelete',
      headerName: 'Edit/Delete',
      width: 200,
      renderCell: renderEditDeleteCell,
    },// Add more columns as needed
  ];

  const handleEnter = () => {
    document.body.style.overflow = 'hidden';
  };

  const handleExit = () => {
    document.body.style.overflow = '';
  };


  const renderFooter = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
        <div>Total Rows : {midPriorityRows.length}</div>
        {/* Add any additional content or calculations you want in the footer */}
      </div>
    );
  };
  
  return (
    <div style={{ width: '90%', height: 'auto', margin: '0 auto', textAlign: 'center' }}>
      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 500, exit: 300 }}
        onEnter={handleEnter}
        onExited={handleExit}
      >
        <div style={{height: midPriorityRows.length === 0 ? '300px' : 'auto',}}>
          <DataGrid
            rows={midPriorityRows}
            columns={columns}
            {...midPriorityRows}
            slots={{
              toolbar: GridToolbar,
              footer: renderFooter, // Use your custom footer component
              noRowsOverlay: () => (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p>No Mid Priority todos available. Add a new one!</p>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/addtodo')}
                  >
                    Add New Todo
                  </Button>
                </div>
              ),
            }}
            hideFooterPagination
            hideFooterSelectedRowCount
          />
        </div>
      </Slide>
    </div>
  );
};

export default HighPriorityTodos;
