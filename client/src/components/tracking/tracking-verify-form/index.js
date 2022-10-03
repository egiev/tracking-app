import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import { StartTracking } from "../../../services/booking.service";

const VerifyTrackingCode = ({ setUser }) => {
  const [code, setCode] = useState("");

  const onVerifyCodeHandler = async () => {
    try {
      const { data } = await StartTracking({ code });

      console.log(data);
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box sx={{ maxWidth: "320px" }}>
      <TextField
        required
        label='Enter code'
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ width: "100%" }}
      />

      <Button
        variant='contained'
        size='large'
        sx={{ mt: 3, height: "50px", width: "100%" }}
        onClick={onVerifyCodeHandler}
      >
        Verify
      </Button>
    </Box>
  );
};

export default VerifyTrackingCode;
