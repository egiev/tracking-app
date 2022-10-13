import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

// import { TicketContext } from "../../../store/ticket.context";
import Layout from "../../../components/ui/layout/layout";
import {
  ChangeBookingStatus,
  FetchBookings,
} from "../../../services/booking.service";
import { Box } from "@mui/system";

const styles = {
  dataTableContainer: { boxShadow: "none" },

  dataTableContainerTable: { minWidth: 650 },

  dataTableContainerTableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [action, setAction] = useState("approve");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await FetchBookings();

        console.log(data);
        setBookings(data);
      } catch (e) {}
    };

    fetchBookings();
  }, []);

  const changeBookingStatusHandler = async () => {
    try {
      const { data } = await ChangeBookingStatus({
        slug: selectedBooking.slug,
        status: action,
      });

      const idx = bookings.findIndex((booking) => booking.slug === data.slug);
      const newBookingList = [...bookings];
      newBookingList[idx] = data;

      setBookings(newBookingList);
      setIsModalOpen(false);
    } catch (e) {}
  };

  return (
    <Layout>
      <TableContainer component={Paper} sx={styles.dataTableContainer}>
        <Table sx={styles.dataTableContainerTable} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact No.</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date of Departure</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((row, index) => (
              <TableRow key={row.slug} sx={styles.dataTableContainerTableRow}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>
                  {row.status && row.status === "approve" && "Approved"}
                  {row.status && row.status === "reject" && "Rejected"}
                </TableCell>
                <TableCell>{row.date_of_departure}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedBooking(row);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <TablePagination
        component="div"
        count={ticketCtx.totalCount}
        page={ticketCtx.query.page - 1}
        onPageChange={ticketCtx.onPageChange}
        rowsPerPage={ticketCtx.query.page_size}
        onRowsPerPageChange={(e) => {
          ticketCtx.setQuery((prev) => {
            return {
              ...prev,
              page: 1,
              page_size: e.target.value,
            };
          });
        }}
      /> */}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmation
          </Typography>

          <FormControl fullWidth sx={{ mt: 4 }}>
            <InputLabel id="action-label">Select Action</InputLabel>
            <Select
              labelId="action-label"
              id="action-select"
              value={action}
              label="Select Action"
              onChange={({ target }) => setAction(target.value)}
            >
              <MenuItem value="approve">Approve</MenuItem>
              <MenuItem value="reject">Reject</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{
              display: "flex",
              columnGap: 1,
              justifyContent: "flex-end",
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              color={action === "approve" ? "primary" : "error"}
              onClick={changeBookingStatusHandler}
              disableElevation
            >
              {action === "approve" ? "Approve" : "Reject"}
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setIsModalOpen(false)}
              disableElevation
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Layout>
  );
};

export default AdminBookings;
