import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme, Button } from '@mui/material';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AuthContext from "../../context/AuthProvider";
import useAuth from '../../hooks/useAuth';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };
  
const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    const { setAuth } = useContext(AuthContext);
    const { auth } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

    return (
        <Box
        sx={{
            "& .pro-sidebar-inner": {
                background: `${colors.primary[400]} !important`
            },
            "& .pro-icon-wrapper": {
                backgroundColor: "transparent !important"
            },
            "& .pro-inner-item": {
                padding: "5px 35px 5px 20px !important"
            },
            "& .pro-inner-item:hover": {
                color: "#868dfd !important"
            },
            "& .pro-inner-item:active": {
                color: "#6870fa !important"
            }
        }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOG AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100]
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h4" color={colors.grey[100]}>
                                    ECRI
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {/* USER */}
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="Center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`../../assets/user.png`}
                                    style={{ cursor: "pointer", borderRadius:"50%"}}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography 
                                    variant="h5"
                                    color={colors.grey[100]} 
                                    fontWeight="bold" 
                                    sx={{ m: "10px 0 0 0"}}
                                >
                                    {!auth?.user ? "Web User" : auth.user}
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    color={colors.greenAccent[500]}
                                >
                                    Software Developer
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {/* MENU ITEMS */}
                    <Box paddingLeft={isCollapsed ? undefined : "10%" }>
                        <Item
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15p o 5px 20px"}}
                        >
                            Search
                        </Typography>
                        <Item
                            title="By Orders"
                            to="/searchByOrder"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="By Accounts"
                            to="/searchByAccount"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="By Users"
                            to="/searchByUser"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="By Memberships"
                            to="/searchByMemberships"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15p o 5px 20px"}}
                        >
                            Web Usage
                        </Typography>
                        
                        <Item
                            title="All Activity"
                            to="/allActivity"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Components"
                            to="/allComponents"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15p o 5px 20px"}}
                        >
                            Charts
                        </Typography>
                        
                        <Item
                            title="Top Accounts"
                            to="/topAccounts"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Top Web Users"
                            to="/topWebUsers"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Websites Usage"
                            to="/websitesUsage"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Hits Over Time"
                            to="hitsOverTime"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />             
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15p o 5px 20px"}}
                        >
                            Bookings
                        </Typography>
                        <Item
                            title="Current Month"
                            to="/"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />           
                        <Item
                            title="Year To Dateh"
                            to="/"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />           
                        <Item
                            title="Full Year"
                            to="/"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />              
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15p o 5px 20px"}}
                        >
                            Admin
                        </Typography>     
                        <Item
                            title="Team"
                            to="/team"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />            
                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15p o 5px 20px"}}
                        >
                            Account
                        </Typography>   
                        <IconButton onClick={logout}>
                            <PersonOutlinedIcon />
                            <Typography>Sign Out</Typography>
                        </IconButton>
                    </Box>
                </Menu>
            </ProSidebar>

        </Box>
    )
}

export default Sidebar
