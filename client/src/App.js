import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { AuthContextProvider } from "./store/auth.context";
import ProtectedRoute from "./components/protected-route/";
import { BranchContextProvider } from "./store/branch.context";
import Auth from "./modules/admin";
import Home from "./modules/home";
import Tracking from "./modules/tracking";
// import Dashboard from './modules/dashboard/Dashboard';

import { theme } from "./theme.config";
import Dashboard from "./modules/admin/dashboard";

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
                  <Route path='/start-journey' element={<Tracking />} />
                  <Route path='/admin' element={<Auth />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path='/admin/dashboard' element={<Dashboard />} />
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
