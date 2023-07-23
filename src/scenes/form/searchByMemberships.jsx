import { useState, useEffect } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import TransferList from '../../components/TransferList';
import dayjs from 'dayjs';
import DateTimePicker from '../../components/DateTimePicker';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { tokens } from '../../theme';

const userSchema = yup.object().shape({
    SearchType: yup.string(),
    Websites: yup.array().of(yup.string()),
    StartDate: yup.date().required("required"),
    EndDate: yup.date().required("required")
});

const SearchByMemberships = ({handleSearchSubmit, parameters, allWebsites}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [newParameters, setNewParameters] = useState(parameters);
    const [startDate, setStartDate] = useState(dayjs(parameters.StartDate));
    const [endDate, setEndDate] = useState(dayjs(parameters.EndDate));
    const [websiteSelections, setWebsiteSelections] = useState(parameters.Websites);

    const initialValues = {
        SearchType: "Membership",
        Websites: parameters.Websites,
        StartDate: parameters.StartDate,
        EndDate: parameters.EndDate
    };

    const handleStartDateChange = (newDate) => {
        const formatDate = newDate.format('MM/DD/YYYY')
        setNewParameters({
            ...newParameters,
            StartDate: formatDate
        });
    };
    const handleEndDateChange = (newDate) => {
        const formatDate = newDate.format('MM/DD/YYYY')
        setNewParameters({
            ...newParameters,
            EndDate: formatDate
        });
    };

    return <Box m="20px">
        <Header title="SEARCH" subtitle="Search for web usage by memberships" />

        <Formik
            onSubmit={(values) => handleSearchSubmit(values)}
            initialValues={initialValues}
            validationSchema={userSchema}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit}) =>(
                <form onSubmit={handleSubmit}>
                    <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4, minmax((0, 1fr)"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span: 4"},
                            
                        }}
                        
                        
                    >
                        <Box gridColumn="span 2"
                            border="2px white solid"
                            borderColor={colors.primary[100]} 
                            borderRadius="5px"
                            sx={{margin:"20px 600px 20px 600px;"}}
                        >
                            <br/ >
                            <Typography 
                                justifyContent="center" 
                                display="flex"
                                
                            >
                                Select Websites
                            </Typography>
                            <Box
                                
                                display="flex"
                                alignItems="center" 
                                justifyContent="center"
                            >
                                <TransferList name="Websites" title="" selections={allWebsites} selectedItems={websiteSelections} />
                            </Box>
                            
                                <Box 
                                   display="flex"
                                   justifyContent="center"
                                   gap="30px" 
                                   padding="20px 0 20px 0"
                                >
                                    <Box
                                        
                                        display="flex"
                                        alignItems="center" 
                                        justifyContent="right"
                                    >
                                        <DateTimePicker
                                            name="StartDate"
                                            label="Start Date"
                                            value={startDate}
                                        />
                                    </Box>
                                    <Box
                                        
                                        display="flex"
                                        alignItems="center" 
                                        justifyContent="left"
                                    >
                                        <DateTimePicker
                                            name="EndDate"
                                            label="End Date"
                                            value={endDate}
                                        />
                                    </Box>
                                </Box>
                            
                        </Box>
                        <Box gridColumn="span 2" />
                    </Box>
                    <Box display="flex" mt="20px" justifyContent="center">
                        <Button type="submit" color="secondary" variant="contained">
                            Search
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>

    </Box>

}

export default SearchByMemberships;
