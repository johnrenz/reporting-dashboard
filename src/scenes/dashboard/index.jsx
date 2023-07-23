import { Box, Button, Typography, useTheme } from '@mui/material';
import Header from '../../components/Header';
import { tokens } from '../../theme';
// import { mockTransactions } from '../../data/mockData';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
// import EmailIcon from '@mui/icons-material/Email';
// import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import TrafficIcon from '@mui/icons-material/Traffic';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GridOnIcon from '@mui/icons-material/GridOn';
import WebIcon from '@mui/icons-material/Web';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LineChart from '../../components/lineChart';
import BarChart from '../../components/barChart';
import StatBox from '../../components/StatBox';
import CircularProgress from '@mui/material/CircularProgress';

const Dashboard = ({
        parameters, 
        totalPageViews, 
        totalPageViewsLoading, 
        usageByWebsite, 
        websiteUsageLoading, 
        topWebUsers, 
        topWebUsersLoading, 
        topAccounts, 
        topAccountsLoading, 
        hitsOverTime, 
        hitsOverTimeLoading }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="REPORTING DASHBOARD" subtitle="Reporting dashboard" />
            
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
                    >
                        <DownloadOutlinedIcon sx={{ mr:"10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>
            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* ROW 1 */}
                <Box 
                    gridColumn="span 3" 
                    backgroundColor={colors.primary[400]} 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <StatBox
                        title={`${parameters.SearchType} Search`}
                        subtitle={!parameters.SearchType 
                            ? "" 
                            : parameters.SearchType === "Order"
                                ? parameters.Orders.map((item) => { 
                                    return `${item}` 
                                })
                                : parameters.SearchType === "Account"
                                    ? parameters.Accounts.map((item) => { 
                                        return `${item}` 
                                    })
                                    : parameters.SearchType === "User"
                                    ? parameters.Users.map((item) => { 
                                        return `${item}` 
                                    })
                                    : ""
                        }
                        progress="0.75"
                        icon={
                            <GridOnIcon sx={{ 
                                    color: colors.greenAccent[600], 
                                    fontSize: "26px" 
                                }} 
                            />
                        }
                    />
                </Box>
                <Box 
                    gridColumn="span 3" 
                    backgroundColor={colors.primary[400]} 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <StatBox
                        title="Date Range"
                        subtitle={`${parameters.StartDate} - ${parameters.EndDate}`}
                        progress="0.5"
                        icon={
                            <CalendarTodayIcon sx={{ 
                                    color: colors.greenAccent[600], 
                                    fontSize: "26px" 
                                }} 
                            />
                        }
                    />
                </Box>
                <Box 
                    gridColumn="span 3" 
                    backgroundColor={colors.primary[400]} 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    <StatBox
                        title="Websites"
                        subtitle={!parameters.Websites 
                            ? "All" 
                            : parameters.Websites.length === 0 
                                ? "All" 
                                : parameters.Websites.map((item) => { 
                                        return `${item}` 
                                    })
                            }
                        progress="0.530"
                        icon={
                            <WebIcon sx={{ 
                                    color: colors.greenAccent[600], 
                                    fontSize: "26px" 
                                }} 
                            />
                        }
                    />
                </Box>
                <Box 
                    gridColumn="span 3" 
                    backgroundColor={colors.primary[400]} 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    {
                        totalPageViewsLoading 
                        ? (
                            <Box>
                                <CircularProgress style={{'color': colors.blueAccent[300]}} />
                            </Box>
                        )
                        :
                        (
                            <StatBox
                                title="Total Page Views"
                                subtitle={totalPageViews}
                                progress="0.30"
                                icon={
                                    <ContactPageIcon sx={{ 
                                            color: colors.greenAccent[600], 
                                            fontSize: "26px" 
                                        }} 
                                    />
                                }
                            />
                        )
                    }
                </Box>
            {/* ROW 2 */}
                <Box
                    gridColumn="span 6"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Top Websites by Usage
                    </Typography>
                    <Box height="400px" mt="-20px">
                        {                            
                            websiteUsageLoading 
                            ? (
                                <Box 
                                    backgroundColor={colors.primary[400]} 
                                    display="flex" 
                                    alignItems="center" 
                                    justifyContent="center"
                                    sx={{ padding: "100px 0 0 0" }}
                                >
                                    <CircularProgress style={{'color': colors.blueAccent[300]}} />
                                </Box>
                              )
                            : (
                                <BarChart data={usageByWebsite?.sort((a, b) => {
                                        return b.UsageCount - a.UsageCount;
                                    })
                                    .slice(0, 5)
                                    .sort((a, b) => {
                                        return a.UsageCount - b.UsageCount;
                                    })}  
                                    leftAxisKeyName="Website" 
                                    bottomAxisIndexName="UsageCount" 
                                />
                             )                                                 
                        }
                    </Box>
                </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Top Users by Usage
                    </Typography>
                    <Box height="400px" mt="-20px">
                        {                            
                            topWebUsersLoading 
                            ? (
                                <Box 
                                    backgroundColor={colors.primary[400]} 
                                    display="flex" 
                                    alignItems="center" 
                                    justifyContent="center"
                                    sx={{ padding: "100px 0 0 0" }}
                                >
                                    <CircularProgress style={{'color': colors.blueAccent[300]}} />
                                </Box>
                              )
                            : (
                                <BarChart 
                                    data={topWebUsers?.sort((a, b) => {
                                        return b.UsageCount - a.UsageCount;
                                    })
                                    .slice(0, 5)
                                    .sort((a, b) => {
                                        return a.UsageCount - b.UsageCount;
                                    })} 
                                    leftAxisKeyName="Email" 
                                    bottomAxisIndexName="UsageCount"
                                />
                              )                                                 
                           }
                    </Box>
                </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Top Accounts by Usage
                    </Typography>
                    <Box height="400px" mt="-20px">
                        {                            
                            topAccountsLoading 
                            ? (
                                <Box 
                                    backgroundColor={colors.primary[400]} 
                                    display="flex" 
                                    alignItems="center" 
                                    justifyContent="center"
                                    sx={{ padding: "100px 0 0 0" }}
                                >
                                    <CircularProgress style={{'color': colors.blueAccent[300]}} />
                                </Box>
                              )
                            : (
                                <BarChart 
                                    data={topAccounts?.sort((a, b) => {
                                        return b.UsageCount - a.UsageCount;
                                    })
                                    .slice(0, 5)
                                    .sort((a, b) => {
                                        return a.UsageCount - b.UsageCount;
                                    })} 
                                    leftAxisKeyName="Accountname" 
                                    bottomAxisIndexName="UsageCount"
                                />
                            )                                                 
                        }
                    </Box>
                </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 3"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Web Usage over Time
                    </Typography>
                    <Box height="400px" mt="-20px">
                        {                            
                            hitsOverTimeLoading 
                            ? (
                                <Box 
                                    backgroundColor={colors.primary[400]} 
                                    display="flex" 
                                    alignItems="center" 
                                    justifyContent="center"
                                    sx={{ padding: "100px 0 0 0" }}
                                >
                                    <CircularProgress style={{'color': colors.blueAccent[300]}} />
                                </Box>
                              )
                            : (
                                <LineChart hitsOverTime={hitsOverTime} leftAxisKeyName="Hits" bottomAxisIndexName="Month" />
                              )                                                 
                        }
                    </Box>
                </Box>
            </Box>                
        </Box>
    )
}

export default Dashboard
