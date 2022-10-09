import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import moment from "moment";

import { BranchContext } from "../../../store/branch.context";
import { AddBooking } from "../../../services/booking.service";
import { GetBranches } from "../../../services/static.service";

const BookingForm = () => {
  const branchCtx = useContext(BranchContext);

  const initialState = {
    branch: "",
    name: "",
    email: "",
    contact: "",
    companions: "",
    date_of_departure: moment(),
  };
  const [bookingValues, setBookingValues] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    getBranches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBranches = async () => {
    try {
      const { data } = await GetBranches();

      branchCtx.setBranches(data);
    } catch (e) {}
  };

  const onHandleChange = (identifier, event) => {
    let value;

    identifier === "date_of_departure"
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
      data.date_of_departure = moment(data.date_of_departure).format(
        "MM/DD/YYYY"
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
              background: "#e7ffec",
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
        display: "flex",
        alignItems: "center",
        background: "#fff",
        padding: 4,
        borderRadius: 2,
      }}
    >
      {renderAlert()}

      <Grid container spacing={1}>
        <Grid item md={2} xs={12}>
          <FormControl fullWidth>
            <InputLabel id='branch-label'>Mountain</InputLabel>
            <Select
              required
              labelId='branch-label'
              id='branch'
              label='Branch'
              value={bookingValues.branch}
              onChange={onHandleChange.bind(this, "branch")}
            >
              {branchCtx.data &&
                branchCtx.data.map((i) => (
                  <MenuItem key={i.slug} value={i.slug}>
                    {i.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2} xs={12}>
          <TextField
            required
            label='Name'
            value={bookingValues.name}
            onChange={onHandleChange.bind(this, "name")}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={2} xs={12}>
          <TextField
            required
            label='Email'
            value={bookingValues.email}
            onChange={onHandleChange.bind(this, "email")}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={2} xs={12}>
          <TextField
            required
            label='Contact No.'
            value={bookingValues.contact}
            onChange={onHandleChange.bind(this, "contact")}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={2} xs={12}>
          <DesktopDatePicker
            label='Departure'
            inputFormat='MM/DD/YYYY'
            value={bookingValues.date_of_departure}
            onChange={onHandleChange.bind(this, "date_of_departure")}
            minDate={moment()}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "100%" }} />
            )}
          />
        </Grid>

        <Grid item md={1} xs={12}>
          <TextField
            required
            label='Companion(s)'
            type='number'
            value={bookingValues.companions}
            onChange={onHandleChange.bind(this, "companions")}
            sx={{ width: "100%" }}
          />
        </Grid>

        <Grid item md={1} xs={12}>
          <Button
            variant='contained'
            size='large'
            sx={{
              height: "100%",
              width: "100%",
            }}
            onClick={onSubmitBookingHandler}
          >
            Book
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookingForm;
