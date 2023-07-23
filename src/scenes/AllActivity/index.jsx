import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbarContainer, GridToolbarExport  } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { tokens } from '../../theme';
//import { mockDataAllActivity } from '../../data/mockData';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';

function CustomToolbar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);  
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
}

const AllActivity = ({activities, activitiesLoading}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: "ID", headerName: "ID" },
        { field: "Accountname", headerName: "Account Name", flex: 1 },
        { field: "Owner", headerName: "Owner", flex: 1 },
        { field: "Fullname", headerName: "Full Name", flex: 1 },
        { field: "Title", headerName: "Title", flex: 1 },
        { field: "Email", headerName: "Email", flex: 1 },
        { field: "Date", headerName: "Date", flex: 1 },
        { field: "Time", headerName: "Time", flex: 1 },
        { field: "Website", headerName: "Website", flex: 1 },
        { field: "source", headerName: "Source", flex: 1 },
        { field: "Activity", headerName: "Activity", flex: 1 },
        { field: "Detail", headerName: "Detail", flex: 2 }
    ]
    return (
        <Box m="20px">
            <Header title="ACTIVITY" subtitle="All Actvity" />
            {
                activitiesLoading 
                ? (
                    <Box 
                        backgroundColor={colors.primary[400]} 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center"
                        height="95vh"
                    >
                        <CircularProgress style={{'color': colors.blueAccent[300]}} />
                    </Box>
                )
                :
                (                       
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
                            "& .MuiButton-root": {
                                backgroundColor: colors.blueAccent[700]
                            }
                        }}
                    >
                        <DataGrid
                            rows={activities}
                            columns={columns}
                            getRowId={(row) => row.ID}
                            components={{
                                Toolbar: CustomToolbar,
                            }}
                            sx={{
                                '@media print': {
                                '.MuiDataGrid-main': { color: 'rgba(0, 0, 0, 0.87)' },
                                },
                            }}
                        >

                        </DataGrid>
                    </Box>
                )
            }
        </Box>
    )
}

export default AllActivity
