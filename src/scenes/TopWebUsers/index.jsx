import { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../components/Header';
import BarChart from '../../components/barChart';
import TabPanel from '../../components/TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { tokens } from '../../theme';

function CustomToolbar() {
    const theme = useTheme(); 
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
}

const TopWebUsers = ({topWebUsers, topWebUsersLoading}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [sortedTopUsers, setSortedTopUsers] = useState(topWebUsers);
    const [topCount, setTopCount] = useState(5);    
    const [selected, setSelected] = useState(0);
    const [topWebUsersWithID, setTopWebUsersWithID] = useState(
        topWebUsers.map((item, i) => { return {...item, ID: i }; })
    );

    const columns = [
        { field: "Email", headerName: "Email", flex: 1 },
        { field: "UsageCount", headerName: "Usage", flex: 1}
    ]

    const handleChange = (event) => {
        setTopCount(event.target.value);        
    };
    useEffect(() => {
        const copyArray = [...topWebUsers];
        copyArray.sort((a, b) => {
            return b.UsageCount - a.UsageCount;
        });
        const copyArraySortAgain = copyArray.slice(0, topCount);
        copyArraySortAgain.sort((a, b) => {
            return a.UsageCount - b.UsageCount;
        });
        setSortedTopUsers(copyArraySortAgain); //re-render
    },[topCount, topWebUsers])

    const handleSelect = (e, newValue) => {
        setSelected(newValue);
    };  
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };
    return (
        <Box m="20px">
            <Header title="Users" subtitle="Top Users By Usage" />
            {
                topWebUsersLoading 
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
                    <Box>                 
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={selected} onChange={handleSelect} aria-label="Top Users By Usage">
                                <Tab label={<span style={{ color: colors.primary[100] }}>Chart</span>} {...a11yProps(0)} />
                                <Tab label={<span style={{ color: colors.primary[100] }}>Grid</span>} {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={selected} index={0}>
                            <InputLabel id="demo-simple-select-autowidth-label">Top</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={topCount}
                                onChange={handleChange}
                                autoWidth
                                label="Age"
                            >
                                <MenuItem value={5}>Five</MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={15}>Firteen</MenuItem>
                            </Select>
                            <Box height="75vh">
                                <BarChart data={sortedTopUsers} leftAxisKeyName="Email" bottomAxisIndexName="UsageCount" topCount={topCount} />
                            </Box>
                        </TabPanel>
                        <TabPanel value={selected} index={1}>
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
                                    rows={topWebUsersWithID}
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
                        </TabPanel>
                    </Box>
                )
            }
        </Box>
        
    )
}

export default TopWebUsers;