import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { AuthContextProvider } from "./store/auth.context";
import ProtectedRoute from "./components/protected-route/";
import { BranchContextProvider } from "./store/branch.context";
import Admin from "./modules/admin";
import Booking from "./modules/booking";
import Home from "./modules/home";
import Tracking from "./modules/tracking";
// import Dashboard from './modules/dashboard/Dashboard';

import { theme } from "./theme.config";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AuthContextProvider>
          <BranchContextProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Router>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path='/admin' element={<Admin />} />
                  <Route path='/start-journey' element={<Tracking />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path='/booking' element={<Booking />} />
                  </Route>
                </Routes>
              </Router>
            </LocalizationProvider>
          </BranchContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
