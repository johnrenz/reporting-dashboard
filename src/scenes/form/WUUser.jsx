import { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

const initialValues = {
    fullname: "",
    username: "",
    roles: ""
};

const phoneRegExp = 
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    username: yup
        .string()
        .email("invalid email")
        .required("required"),
    roles: yup.string().required("required")
});

const WUUser = () => {    
    const [wuUser, setWuUser] = useState({});
    const params = useParams();
    const axiosPrivate = useAxiosPrivate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const getWUUser = async () => {
        try {
          const response = await axiosPrivate.get('/wuuser',
            {
                Headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                params: {
                    username: params.username
                }
            }
          );
          const wuUserData = response.data.result;
          setWuUser(wuUserData);
      }
      catch (err) {
          console.log(err);
      }
    }
    
    useEffect(() => {
        getWUUser();
    }, []);

    const handleFormSubmit = (values) => {
        console.log(values);
    }

    return <Box m="20px">
        <Header title="EDIT USER" subtitle={params.fullname} />

        <Formik
            onSubmit={handleFormSubmit}
            initialValues={wuUser}
            validationSchema={userSchema}
            enableReinitialize={true}
        >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit}) =>(
                <form onSubmit={handleSubmit}>
                    <Box 
                        display="grid" 
                        gap="30px" 
                        gridTemplateColumns="repeat(4, minmax((0, 1fr)"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span: 4"}
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="User Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.username}
                            name="username"
                            error={!!touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Full Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.fullname}
                            name="fullname"
                            error={!!touched.fullname && !!errors.fullname}
                            helperText={touched.fullname && errors.fullname}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Roles"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.roles}
                            name="roles"
                            error={!!touched.roles && !!errors.roles}
                            helperText={touched.roles && errors.roles}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                            Create New User
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>

    </Box>

}

export default WUUser;
