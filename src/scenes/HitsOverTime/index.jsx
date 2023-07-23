import { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../components/Header';
import LineChart from '../../components/lineChart';
import TabPanel from '../../components/TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { tokens } from '../../theme';

function CustomToolbar() {
    const theme = useTheme();
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
}

const HitsOverTime = ({hitsOverTime, hitsOverTimeLoading}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);  
    const [selected, setSelected] = useState(0);
    const [hitsOverTimeWithID, setHitsOverTimeWithID] = useState(
        hitsOverTime[0].data.map((item, i) => { return {ID: i, Month: item.x, Hits: item.y }; })
    );
    
    const columns = [
        { field: "Month", headerName: "Month", flex: 1 },
        { field: "Hits", headerName: "Usage", flex: 1}
    ]

    const handleSelect = (e, newValue) => {
        setSelected(newValue);
    };  
    useEffect(() => {
        setHitsOverTimeWithID(
            hitsOverTime[0].data.map((item, i) => { return {ID: i, Month: item.x, Hits: item.y }; })
        );
    },[hitsOverTime])

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
            <Header title="Web Usage" subtitle="Hits Over Time" />
            {
                hitsOverTimeLoading 
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
                        <Tabs value={selected} onChange={handleSelect} aria-label="Hits Over Time">
                            <Tab label={<span style={{ color: colors.primary[100] }}>Chart</span>} {...a11yProps(0)} />
                            <Tab label={<span style={{ color: colors.primary[100] }}>Grid</span>} {...a11yProps(1)} />
                        </Tabs>
                        </Box>
                        <TabPanel value={selected} index={0}>
                            <Box height="75vh">
                                <LineChart hitsOverTime={hitsOverTime} leftAxisKeyName="Hits" bottomAxisIndexName="Month" />
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
                                    rows={hitsOverTimeWithID}
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

export default HitsOverTime;