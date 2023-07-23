import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
//import { mockDataTeam } from '../../data/mockData';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Header from '../../components/Header';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Team = () => {
    const [wuUsers, setWuUsers] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    
    const getWUUsers = async () => {
        try {
          const response = await axiosPrivate.get('/wuusers',
            {
                Headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
            }
          );
          const wuUsersData = response.data.result;
          const users = wuUsersData.map((item, i) => {
            return {
                id: i,
                ...item, 
                roles: JSON.parse(item.roles).map(
                    role => { 
                        return { 
                            role: {
                                type: role.role.type,
                                name: role.role.name 
                            }
                        }
                    }
                )
            }
          });
          setWuUsers(users);
      }
      catch (err) {
          console.log(err);
      }
    }
    
    useEffect(() => {
        getWUUsers();
    }, []);
    const columns = [
        { field: "username", headerName: "User Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "fullname", headerName: "Full Name", flex: 1 },
        { 
            field: "roles",
            headerName: "Roles",
            width:800,
            renderCell: (params) => {
                return (
                    <>
                        {
                            Object.entries(params.value).map((item) => {
                                return (
                                    <Box
                                        width="20%"
                                        m="0 5px"
                                        p="5px"
                                        display="flex"
                                        justifyContent="center"
                                        backgroundColor={
                                            item[1].role.name === "Admin"
                                            ? colors.greenAccent[600]
                                            : colors.greenAccent[700]                        
                                        }
                                        borderRadius="4px"
                                    >
                                        {item[1].role.name ==="Admin" && <AdminPanelSettingsOutlinedIcon />}
                                        {item[1].role.name ==="Editor" && <SecurityOutlinedIcon />}
                                        {item[1].role.name ==="WebUser" && <LockOpenOutlinedIcon />}
                                        {item[1].role.name ==="BookingUser" && <SecurityOutlinedIcon />}
                                        <Typography color={colors.grey[100]} sx={{ ml: "5px"}}>
                                            {item[1].role.name}
                                        </Typography>
                                    </Box>
                                )
                        })}
                    </>
                );
            }
        },
        { 
            field: "",
            headerName: "Action",
            sortable: false,
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => (
                <Button
                    sx={{ 
                        backgroundColor: 
                        colors.blueAccent[700], 
                        color: colors.grey[100], 
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px"
                    }}
                    onClick={() => {
                        navigate({
                            pathname: '/AddEditWUUser',
                            search: `?mode=edit&username=${params.row.username}`,
                          });
                    }}
                >
                    <PersonOutlinedIcon sx={{ mr:"10px" }} />
                    Edit
                </Button>
            )
        }
    ]
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="TEAM" subtitle="Managing the Team Members" />
                
                <Box>
                    <Button
                        sx={{
                            backgroundColor: 
                            colors.blueAccent[700], 
                            color: colors.grey[100], 
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px"
                        }}                        
                        onClick={() => {
                            navigate({
                                pathname: '/AddEditWUUser',
                                search: '?mode=add',
                            });
                        }}
                    >
                        <PersonOutlinedIcon sx={{ mr:"10px" }} />
                        New Team Member
                    </Button>
                </Box>
            </Box>
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700]
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400]
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700]
                    },
                }}
            >
                <DataGrid
                    rows={wuUsers}
                    columns={columns}
                    getRowId={(row) => row.id}
                >

                </DataGrid>
            </Box>
        </Box>
    )
}


export default Team
