
import {  useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import useAxiosPrivate from './hooks/useAxiosPrivate';
import { useMode } from './theme';
import { Routes, Route } from 'react-router';
import Dashboard from './scenes/dashboard/index';
import AllActivity from './scenes/AllActivity';
import AllComponents from './scenes/AllComponents';
import SearchByOrder from './scenes/form/searchByOrder';
import SearchByAccount from './scenes/form/searchByAccount';
import SearchByUser from './scenes/form/searchByUser';
import { AddEditWUUser } from './scenes/form/AddEditWUUser';
import Login from './scenes/form/Login';
import Team from './scenes/team';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import SearchByMemberships from './scenes/form/searchByMemberships';
import WebsitesUsage from './scenes/WebsitesUsage';
import TopWebUsers from './scenes/TopWebUsers';
import TopAccounts from './scenes/TopAccounts';
import HitsOverTime from './scenes/HitsOverTime';
import '@progress/kendo-theme-default/dist/all.css';
import { tokens } from './theme';
import WithNav from './WithNav';
import WithoutSidebar from './WithoutSidebar';
import useAuth from "./hooks/useAuth";

function App() {
  const { auth } = useAuth();
  const [userRoles, setUserRoles] = useState();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [parameters, setParameters] = useState({
    SearchType: "Account",
    Orders: [],
    Accounts: [ "Childrens Philadelphia", "Boston Collegec", "Urgent Care" ],
    Users: [],
    Websites: [],
    StartDate: "12/01/2021", //new Date(2022, 0, 1),
    EndDate: "02/20/2023" //new Date(2022, 11, 30)
  });
  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [components, setComponents] = useState([]);
  const [componentsLoading, setComponentsLoading] = useState(false);
  const [websiteUsage, setWebsiteUsage] = useState([]);
  const [websiteUsageLoading, setWebsiteUsageLoading] = useState(false);
  const [topWebUsers, setTopWebUsers] = useState([]);
  const [topWebUsersLoading, setTopWebUsersLoading] = useState(false);
  const [topAccounts, setTopAccounts] = useState([]);
  const [topAccountsLoading, setTopAccountsLoading] = useState(false);
  const [hitsOverTimeLineData, setHitsOverTimeLineData] = useState([]);
  const [hitsOverTimeLineDataLoading, setHitsOverTimeLineDataLoading] = useState([]);
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [totalPageViewsLoading, setTotalPageViewsLoading] = useState([]);
  const [allWebsites, setAllWebsites] = useState([]);
  
  const getAllWebsites = async (parameters) => {
    try {
      const response = await axiosPrivate.get('/websites',
        {
          Headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      setAllWebsites(response.data.result.map((item) => item.Website.trim() ));
    }
    catch (err) {
      console.log(err);
    }
  }

  const getTotalPageViews = async (parameters) => {
      setTotalPageViewsLoading(true);
      try {
        const response = await axiosPrivate.post('/totalPageViews',
          {
            SearchType : parameters.SearchType,
            Orders : parameters.Orders,
            Accounts : parameters.Accounts,
            Users : parameters.Users,
            StartDate : parameters.StartDate,
            EndDate :   parameters.EndDate,
            Websites :  parameters.Websites.length === 0 ? "all" : parameters.Websites
          }, 
          {
              Headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
          }
        );
        setTotalPageViews(response.data.result.totalPageViews);
        setTotalPageViewsLoading(false);
    }
    catch (err) {
        console.log(err);
    }
  }

  const getAllActivity = async (parameters) => {
      setActivitiesLoading(true);
      try {
          const response = await axiosPrivate.post('/AllActivity',
          {
            SearchType : parameters.SearchType,
            Orders : parameters.Orders,
            Accounts : parameters.Accounts,
            Users : parameters.Users,
            StartDate : parameters.StartDate,
            EndDate :   parameters.EndDate,
            Websites :  parameters.Websites.length === 0 ? "all" : parameters.Websites
          }, 
          {
              Headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
          }
        );
        setActivities(response.data.result);
        setActivitiesLoading(false);
    }
    catch (err) {
        console.log(err);
    }
  }
  
  const getComponents = async (parameters) => {
    setComponentsLoading(true);
    try {
      const response = await axiosPrivate.post('/Components',
        {
          SearchType : parameters.SearchType,
          Orders : parameters.Orders,
          Accounts : parameters.Accounts,
          Users : parameters.Users,
          StartDate : parameters.StartDate,
          EndDate :   parameters.EndDate,
          Websites :  parameters.Websites.length === 0 ? "all" : parameters.Websites
        }, 
        {
            Headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        }
      );
      setComponents(response.data.result);
      setComponentsLoading(false);
    }
    catch (err) {
        console.log(err);
    }
  }
  
  const getUsageData = async (parameters) => {   
    setWebsiteUsageLoading(true);
    try {
      const response = await axiosPrivate.post('/usageByWebsite',
        {
          SearchType : parameters.SearchType,
          Orders : parameters.Orders,
          Accounts : parameters.Accounts,
          Users : parameters.Users,
          StartDate : parameters.StartDate,
          EndDate :   parameters.EndDate,
          Websites :  parameters.Websites.length === 0 ? "all" : parameters.Websites
        }, 
        {
            Headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        }
      );
      setWebsiteUsage(response.data.result);
      setWebsiteUsageLoading(false);
    }
    catch (err) {
        console.log(err);
    }      
  };
  const getTopWebUsers = async (parameters) => {  
    setTopWebUsersLoading(true); 
    try {
      const response = await axiosPrivate.post('/topWebUsers',
        {
          SearchType : parameters.SearchType,
          Orders : parameters.Orders,
          Accounts : parameters.Accounts,
          Users : parameters.Users,
          StartDate : parameters.StartDate,
          EndDate :   parameters.EndDate,
          Websites :  parameters.Websites.length === 0 ? "all" : parameters.Websites
        }, 
        {
            Headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        }
      );
      setTopWebUsers(response.data.result);
      setTopWebUsersLoading(false);
    }
    catch (err) {
        console.log(err);
    }      
  };
  
  const getTopAccounts = async (parameters) => {   
    setTopAccountsLoading(true);
    try {
      const response = await axiosPrivate.post('/topAccounts',
        {
          SearchType : parameters.SearchType,
          Orders : parameters.Orders,
          Accounts : parameters.Accounts,
          Users : parameters.Users,
          StartDate : parameters.StartDate,
          EndDate :   parameters.EndDate,
          Websites :  parameters.Websites.length === 0 ? "all" : parameters.Websites
        }, 
        {
            Headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        }
      );
      setTopAccounts(response.data.result);
      setTopAccountsLoading(false);
    }
    catch (err) {
        console.log(err);
    }      
  };
  
  const hitsOverTime = async (parameters) => { 
    setHitsOverTimeLineDataLoading(true);  
    try {
      const response = await axiosPrivate.post('/hitsOverTime',
        {
          SearchType : parameters.SearchType,
          Orders : parameters.Orders,
          Accounts : parameters.Accounts,
          Users : parameters.Users,
          StartDate : parameters.StartDate,
          EndDate :   parameters.EndDate,
          Websites :  parameters.Websites.length === 0 ? "all" : parameters.Websites
        }, 
        {
            Headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        }
      );
      const lineData = [
        {
          id: "Web Usage",
          color: tokens("dark").greenAccent[500],         
          data:             
            response.data.result.map((item) => { return { x :item.Month, y: item.Hits } })          
        }
      ];
      setHitsOverTimeLineData(lineData);
      setHitsOverTimeLineDataLoading(false);
    }
    catch (err) {
        console.log(err);
    }      
  };
  useEffect(() => {
    if (userRoles?.find(role => role === ROLES.User))
    {
      getAllWebsites();
      getAllActivity(parameters);
      getTopWebUsers(parameters);
      getTopAccounts(parameters);
      getUsageData(parameters);
      hitsOverTime(parameters);
      getTotalPageViews(parameters);
      getComponents(parameters);
    }
    else {
      console.log('not logged in, dont reload');
    }
  }, [parameters, userRoles])
  
  useEffect(() => {
    setUserRoles(auth.roles);
  });

  const handleSearchSubmit = (newParameters) => {
    setParameters(newParameters);    
    navigate('/');
  };
  const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
  }

  return (
            <Routes>
              {/* public routes */}
              <Route element={<WithoutSidebar />}>
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
              </Route>

              {/* we want to protect these routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />} >
                <Route element={<WithNav />}>
                  <Route path="/" element={<Dashboard 
                      parameters={parameters} 
                      totalPageViews={totalPageViews}
                      totalPageViewsLoading={totalPageViewsLoading}
                      usageByWebsite={websiteUsage} 
                      websiteUsageLoading={websiteUsageLoading} 
                      topWebUsers={topWebUsers} 
                      topWebUsersLoading={topWebUsersLoading} 
                      topAccounts={topAccounts} 
                      topAccountsLoading={topAccountsLoading} 
                      hitsOverTime={hitsOverTimeLineData} 
                      hitsOverTimeLoading={hitsOverTimeLineDataLoading} 
                      />} 
                  />
                  <Route path="/allActivity" element={<AllActivity activities={activities} activitiesLoading={activitiesLoading} />} />
                  <Route path="/allComponents" element={<AllComponents components={components} componentsLoading={componentsLoading} />} />
                  <Route path="/searchByOrder" element={<SearchByOrder 
                    handleSearchSubmit={handleSearchSubmit} 
                    parameters={parameters}
                    allWebsites={allWebsites} 
                  />} />
                  <Route path="/searchByAccount" element={<SearchByAccount 
                    handleSearchSubmit={handleSearchSubmit} 
                    parameters={parameters}
                    allWebsites={allWebsites} 
                  />} />
                  <Route path="/searchByUser" element={<SearchByUser 
                    handleSearchSubmit={handleSearchSubmit} 
                    parameters={parameters}
                    allWebsites={allWebsites} 
                  />} />
                  <Route path="/searchByMemberships" element={<SearchByMemberships 
                    handleSearchSubmit={handleSearchSubmit} 
                    parameters={parameters}
                    allWebsites={allWebsites} 
                  />} />
                  {/* <Route path="/wuUser/:username" element={<WUUser />} /> */}
                  <Route path="/websitesUsage" element={<WebsitesUsage usageByWebsite={websiteUsage} websiteUsageLoading={websiteUsageLoading} />} />
                  <Route path="/topWebUsers" element={<TopWebUsers topWebUsers={topWebUsers} topWebUsersLoading={topWebUsersLoading} />} />
                  <Route path="/topAccounts" element={<TopAccounts topAccounts={topAccounts} topAccountsLoading={topAccountsLoading} />} />
                  <Route path="/hitsOverTime" element={<HitsOverTime hitsOverTime={hitsOverTimeLineData} hitsOverTimeLoading={hitsOverTimeLineDataLoading} />} />
                </Route>
              </Route>              
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />} >
                <Route element={<WithNav />}>
                  <Route path="/team" element={<Team />} />                 
                </Route>
              </Route>              
              <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />} >
                <Route element={<WithNav />}>
                  <Route path="/AddEditWUUser" element={<AddEditWUUser />} />                  
                </Route>
              </Route>
            </Routes>
    
  );
}

export default App;

