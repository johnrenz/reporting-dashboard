import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import MultiSelect from '../../components/MultiSelect';
import { tokens } from '../../theme';


function AddEditWUUser() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode");
    const username = searchParams.get("username");
    const isAddMode = mode === 'add';
    const [wuUser, setWuUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [allRoles, setAllRoles] = useState(["WebUser", "Admin", "Editor", "BookingUser"]);
    const [roleSelections, setRoleSelections] = useState([]);
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();

    const styles = {
        fieldTextbox: {
            textAlign: 'left',
            position: 'absolute',
            bottom: '0',
            right: '0',
            top: '42px',
            left: '0',
            margin:'0px 10px',
            padding: '0 8px',
            borderRadius: '5px',
            borderStyle: 'solid',
            borderWidth: '1px',
            overflow: 'hidden',
            minWidth: '0%',
            borderColor: `${colors.primary[100]}`,
            backgroundColor: `${colors.primary[400]}`,
            color: `${colors.greenAccent[300]}`,
            height: '54px',
            writingMode: 'horizontal-tb !important'
        },
        margin1: {
            margin: '0px 10px'
        },
        height1: {
            height: '100px'
        },
        errorStyle: {
            color: `${colors.redAccent[500]}`,
            position: 'absolute',
            inset: '100px 15px'
        }
    }
    
    const initialValues = {
        fullname: "",
        username: "",
        roles: [],
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('Full Name is required'),
        username: Yup.string()
            .email('User Name/ Email is invalid')
            .required('User Name is required'),
        roles: Yup.array().of(Yup.string()).min(1, "select at least one roles"),
        password: Yup.string()
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password != '' || isAddMode) return schema.required('Confirm Password is required');
                if (isAddMode) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });
    
    const handleUserSubmit = (values, actions) => {
        setErrMsg('');
        if (isAddMode) {
            createWUUser(values, actions);
        } else {
            updateWUUser(values, actions);
        }
    }

    function createWUUser(values, actions) {
        const roles = values.roles.map((role) => { 
            return { "role": 
                { 
                    "type": role === "WebUser" ? 2001 : role === "Admin" ? 5150 : role === "Editor" ? 1984 : role === "BookingUser" ? 2002 : 0, 
                    "name": role
                }
            };
        });
        const sRoles = JSON.stringify(roles);
        let body = {
            username: values.username,
            fullname: values.fullname,
            roles: sRoles,
            password: values.password
        };
        axiosPrivate.post('/wuuser',
            body,
            {
                Headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        .then((response) => {
            if (response.data.message.includes("Success")) {
                navigate('/team');
            }
            setErrMsg(response.data.message);
            errRef.current.focus();
            actions.setSubmitting(false);
        })
        .catch((error) => {
            console.log(`createWUUser exception:${error}`);
            setErrMsg(error);
            errRef.current.focus();
            actions.setSubmitting(false);
        });
    }

    function updateWUUser(values, actions) {
        const roles = values.roles.map((role) => { 
            return { "role": 
                { 
                    "type": role === "WebUser" ? 2001 : role === "Admin" ? 5150 : role === "Editor" ? 1984 : role === "BookingUser" ? 2002 : 0, 
                    "name": role
                }
            };
        });
        const sRoles = JSON.stringify(roles);
        let body = {
            username: values.username,
            fullname: values.fullname,
            roles: sRoles
        };
        if (values.password !== '') {
            body = {...body, password: values.password}
        }
        axiosPrivate.put('/wuuser',
            body,
            {
                Headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
        .then((response) => {
            if (response.data.message.includes("Success")) {
                navigate('/team');
            }
            setErrMsg(response.data.message);
            errRef.current.focus();
            actions.setSubmitting(false);
        })
        .catch((error) => {
            console.log(`updateWUUser exception:${error}`);
            setErrMsg(error);
            errRef.current.focus();
            actions.setSubmitting(false);
        });
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values, actions) => handleUserSubmit(values, actions)}>
            {function ShowForm({ errors, touched, isSubmitting, setFieldValue, handleSubmit }) {
                const axiosPrivate = useAxiosPrivate();
                useEffect(() => {
                    if (!isAddMode) {
                        axiosPrivate.get('/wuuser',
                            {
                                Headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                params: {
                                    username: username
                                }
                            }
                        )
                        .then((response) => {
                            const wuUserData = response.data.result;
                            const roleNames = JSON.parse(wuUserData.roles).map(
                                role => { 
                                    return role.role.name 
                                }
                            )
                            setRoleSelections(roleNames);
                            const fields = ['fullname', 'username'];
                            fields.forEach(field => setFieldValue(field, response.data.result[field], false));
                            setWuUser(wuUserData);
                        })
                        .catch (err => {
                            console.log(err);
                        })
                    }
                }, []);

                return (
                    <Form onSubmit={handleSubmit}>
                        <h1 style={styles.margin1}>{isAddMode ? 'Add User' : 'Edit User'}</h1>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                            {errMsg}
                        </p>
                        <div className="form-row">
                            <div className="form-group col-4">
                                <label style={styles.margin1}>Username</label>
                                <Field name="username" type="text" readOnly={isAddMode ? false : true } style={styles.fieldTextbox} className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <div style={styles.errorStyle} >
                                    <ErrorMessage name="username" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-group col-4">
                                <label style={styles.margin1}>Full Name</label>
                                <div>
                                    <Field name="fullname" type="text" style={styles.fieldTextbox} className={'form-control' + (errors.fullname && touched.fullname ? ' is-invalid' : '')} />
                                </div>
                                <div style={styles.errorStyle} >
                                    <ErrorMessage name="fullname" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-group col-4">
                                <label style={styles.margin1}>Roles</label>
                                <MultiSelect 
                                    name="roles"
                                    data={allRoles} 
                                    initialSelections={roleSelections} //{["Admin","WebUser"]}
                                    label="roles"
                                    placeholder="Select roles"
                                />
                            </div>
                        </div>
                        {!isAddMode &&
                            <div>
                                <h3 className="pt-3" style={styles.margin1}>Change Password</h3>
                                <p style={styles.margin1}>Leave blank to keep the same password</p>
                            </div>
                        }
                        <div className="form-row">
                            <div className="form-group col-4" style={styles.height1}>
                                <label style={styles.margin1}>
                                    Password
                                    {!isAddMode &&
                                        (!showPassword
                                            ? <span> - <a onClick={() => setShowPassword(!showPassword)} className="text-primary">Show</a></span>
                                            : <span> - {wuUser.password}</span>
                                        )
                                    }
                                </label>
                                <div>
                                    <Field name="password" type="password" style={styles.fieldTextbox} className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                </div>
                                <div style={styles.errorStyle} >
                                    <ErrorMessage name="password"  className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-group col-4" style={styles.height1}>
                                <label>Confirm Password</label>
                                <div>
                                    <Field name="confirmPassword" type="password" style={styles.fieldTextbox} className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                </div>
                                <div style={styles.errorStyle} >
                                    <ErrorMessage name="confirmPassword" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-group col-4">

                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-12">
                                <br/><br/><br/>
                                <button type="submit" className="btn btn-primary" style={styles.margin1}>
                                    {/* disabled={isSubmitting}  */}
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                                </button>
                                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export { AddEditWUUser };