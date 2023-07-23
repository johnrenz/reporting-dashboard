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

const TopAccounts = ({topAccounts, topAccountsLoading}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [sortedTopAccounts, setSortedTopAccounts] = useState(topAccounts);
    const [topCount, setTopCount] = useState(5);    
    const [selected, setSelected] = useState(0);
    const [topAccountsWithID, setTopAccountsWithID] = useState(
        topAccounts.map((item, i) => { return {...item, ID: i }; })
    );
    //color not used as I wanted.  Barchart ResponsiveBar colorBy="indexValue" sets colors of bars
    const [topAccountsWithColor, setTopAccountsWithColor] = useState(
        topAccounts.map((item, i) => { 
            return {...item, 
                color: 
                    (i === 1 ? colors.blueAccent[300] 
                        : i === 2 ? colors.greenAccent[300]
                        : i === 3 ? colors.grey[300]
                        : i === 4 ? colors.primary[300]
                        : colors.redAccent[300]
                    )
            };
        })
    );

    const columns = [
        { field: "Accountname", headerName: "Accountname", flex: 1 },
        { field: "UsageCount", headerName: "Usage", flex: 1}
    ]

    const handleChange = (event) => {
        setTopCount(event.target.value);        
    };
    useEffect(() => {
        const copyArray = [...topAccountsWithColor];
        copyArray.sort((a, b) => {
            return b.UsageCount - a.UsageCount;
        });
        const copyArraySortAgain = copyArray.slice(0, topCount);
        copyArraySortAgain.sort((a, b) => {
            return a.UsageCount - b.UsageCount;
        });
        setSortedTopAccounts(copyArraySortAgain); //re-render
    },[topCount, topAccountsWithColor])
    
    useEffect(() => {
        setTopAccountsWithColor(
            topAccounts.map((item, i) => { 
                return {...item, 
                    color: 
                        (i === 1 ? colors.blueAccent[300] 
                            : i === 2 ? colors.greenAccent[300]
                            : i === 3 ? colors.grey[300]
                            : i === 4 ? colors.primary[300]
                            : colors.redAccent[300]
                        )
                };
            })
        );
    },[topAccounts])

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
            <Header title="Accounts" subtitle="Top Accounts By Usage" />
            {
                topAccountsLoading 
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
                        <Tabs value={selected} onChange={handleSelect} aria-label="Top Accounts By Usage">
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
                                <BarChart data={sortedTopAccounts} leftAxisKeyName="Accountname" bottomAxisIndexName="UsageCount" topCount={topCount} />
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
                                    rows={topAccountsWithID}
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

export default TopAccounts;