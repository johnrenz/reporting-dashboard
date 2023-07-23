import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
//import dayjs from 'dayjs';
import { useField, useFormikContext } from 'formik';

const DateTimePicker = ({
  name,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleDateChange = (newDate) => {
    console.log('handleDateChange');
    console.log(`handleDateChange newdate: ${newDate}`);
    const formatDate = newDate.format('MM/DD/YYYY')
    console.log(`handleDateChange formatdate: ${formatDate}`);
    setFieldValue(name, formatDate); 
  };

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    variant: 'outlined'
  };

  if(meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    
    <LocalizationProvider 
        dateAdapter={AdapterDayjs}
    >
        <DemoContainer components={['DatePicker']}>
            <DatePicker 
                {...configDateTimePicker}
                onChange={(newValue) => handleDateChange(newValue)}
            />
        </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateTimePicker;