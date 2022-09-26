import { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import { AddBooking } from '../../../services/booking.service';

const BookingForm = () => {
  const initialState = {
    name: '',
    email: '',
    contact: '',
    address: '',
    companions: '',
    date_of_arrival: moment(),
    date_of_departure: moment(),
  };
  const [bookingValues, setBookingValues] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onHandleChange = (identifier, event) => {
    let value;

    identifier === 'date_of_arrival' || identifier === 'date_of_departure'
      ? (value = moment(event))
      : (value = event.target.value);

    setBookingValues((prev) => {
      return {
        ...prev,
        [identifier]: value,
      };
    });
  };

  const onSubmitBookingHandler = async () => {
    try {
      // Format payload
      const data = { ...bookingValues };
      data.date_of_arrival = moment(data.date_of_arrival).format('MM/DD/YYYY');
      data.date_of_departure = moment(data.date_of_arrival).format(
        'MM/DD/YYYY'
      );

      // Add Booking
      await AddBooking(data);
      setIsSubmitted(true);

      // Reset values
      setBookingValues(initialState);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 20000);
    } catch (e) {
      console.log(e);
    }
  };

  const renderAlert = () => {
    if (isSubmitted) {
      return (
        <Box>
          <Typography
            sx={{
              background: '#e7ffec',
              borderRadius: 0.5,
              padding: 2.5,
              mb: 2,
            }}
          >
            Thank you for scheduling a hike at Mt. Kalisungan. Our admin staff
            will review your schedule and send a confirmation regarding your
            tour.
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        padding: 6,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{ textTransform: 'uppercase', mb: 3 }}>
        Book your Tour
      </Typography>

      {renderAlert()}

      <TextField
        required
        label="Name"
        value={bookingValues.name}
        onChange={onHandleChange.bind(this, 'name')}
        sx={{ mb: 2 }}
      />

      <TextField
        required
        label="Address"
        value={bookingValues.address}
        onChange={onHandleChange.bind(this, 'address')}
        sx={{ mb: 2 }}
      />

      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextField
            required
            label="Email"
            value={bookingValues.email}
            onChange={onHandleChange.bind(this, 'email')}
            sx={{ mb: 2, width: '100%' }}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            required
            label="Contact No."
            value={bookingValues.contact}
            onChange={onHandleChange.bind(this, 'contact')}
            sx={{ mb: 2, width: '100%' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <DesktopDatePicker
            label="Arrival"
            inputFormat="MM/DD/YYYY"
            value={bookingValues.date_of_arrival}
            onChange={onHandleChange.bind(this, 'date_of_arrival')}
            minDate={moment()}
            renderInput={(params) => (
              <TextField {...params} sx={{ mb: 2, width: '100%' }} />
            )}
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <DesktopDatePicker
            label="Departure"
            inputFormat="MM/DD/YYYY"
            value={bookingValues.date_of_departure}
            onChange={onHandleChange.bind(this, 'date_of_departure')}
            minDate={bookingValues.date_of_arrival}
            renderInput={(params) => (
              <TextField {...params} sx={{ mb: 2, width: '100%' }} />
            )}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            required
            label="Compoanion(s)"
            type="number"
            value={bookingValues.companions}
            onChange={onHandleChange.bind(this, 'companions')}
            sx={{ mb: 2, width: '100%' }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 3, height: '50px' }}
        onClick={onSubmitBookingHandler}
      >
        Book
      </Button>
    </Box>
  );
};

export default BookingForm;
