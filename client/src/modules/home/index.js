import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import Navigation from '../../components/navigation';
import BookingForm from '../../components/booking/booking-form';
import styles from './home.module.css';

const Home = () => {
  const { palette } = useTheme();

  return (
    <>
      <Navigation />

      <Box className={styles.header}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#fff',
              }}
            >
              <Typography sx={{ marginBottom: 2 }}>HIKING ADVENTURE</Typography>

              <Typography
                variant="h3"
                sx={{
                  color: palette.primary.main,
                  textTransform: 'uppercase',
                  lineHeight: 1.4,
                }}
              >
                Mt. Kalisungan{' '}
                <Typography
                  variant="span"
                  sx={{ color: '#fff', textTransform: 'lowercase' }}
                >
                  is one of the shorter mountains in Laguna located in Calauan.
                </Typography>
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{ mt: 5, alignSelf: 'flex-start' }}
              >
                Explore
              </Button>
            </Grid>

            <Grid item md={6} xs={12}>
              <BookingForm />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Box sx={{ height: '300px' }}>
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            in eius nobis quaerat deleniti assumenda libero natus quasi saepe
            eaque repellendus, temporibus ab ex maiores at impedit, itaque ad
            eveniet.
          </Typography>{' '}
          <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            in eius nobis quaerat deleniti assumenda libero natus quasi saepe
            eaque repellendus, temporibus ab ex maiores at impedit, itaque ad
            eveniet.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Home;
