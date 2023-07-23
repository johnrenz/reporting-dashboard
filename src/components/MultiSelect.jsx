import { useState, useEffect } from 'react';
import { TextField, Autocomplete, useTheme } from "@mui/material";
import { useField, useFormikContext } from 'formik';
import { tokens } from '../theme';

const MultiSelect = ({name, data, initialSelections, ...otherProps}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [selections, setSelections] = useState([]);

  const handleChange = (event, selections) => {
    console.log(`MultiSelect:${selections}`);
    setFieldValue(name, selections); 
    setSelections(selections);
  };

  const configMultiSelect = {
    ...otherProps,
    variant: 'outlined'
  };

  if(meta && meta.touched && meta.error) {
    configMultiSelect.error = true;
    configMultiSelect.helperText = meta.error;
  }
  useEffect(() => {
    if(initialSelections) {
      setFieldValue(name, initialSelections); //added this fir addeditwuuser
      setSelections(initialSelections);
    }
  },[initialSelections]) //added,[initialSelections] for addEditWUUser

  return (
    <Autocomplete
      {...field}
      sx={{ 
          m: 1, width: 500,
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                borderColor: `{colors.grey[100]}`,
                },
                '&:hover fieldset': {
                borderColor: `{colors.primary[100]}`,
                },
                '&.Mui-focused fieldset': {
                borderColor: `{colors.primary[100]}`,
                }
            }
         }}
      multiple
      options={data}
      getOptionLabel={(option) => option}
      disableCloseOnSelect
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          {...configMultiSelect}
        />
      )}
      value={selections}
    />
  );
}
export default MultiSelect;