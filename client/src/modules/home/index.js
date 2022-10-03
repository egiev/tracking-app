import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import AOS from "aos";

import Navigation from "../../components/navigation";
import BookingForm from "../../components/booking/booking-form";
import PulagImg1 from "../../assets/images/pulag1.jpg";

import styles from "./home.module.css";

const Home = () => {
  const { palette } = useTheme();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Navigation />

      <Box className={styles.header}>
        <Container maxWidth='xl'>
          <Box
            md={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              color: "#fff",
              textAlign: "center",
            }}
          >
            <Typography
              variant='h3'
              sx={{
                // color: palette.primary.main,
                textTransform: "uppercase",
                lineHeight: 1.4,
              }}
              data-aos='fade-down'
              data-aos-delay='300'
              data-aos-duration='1000'
            >
              Akyat pinas{" "}
            </Typography>

            <Typography
              variant='h4'
              sx={{ color: "#fff", letterSpacing: 2 }}
              data-aos='fade-down'
              data-aos-delay='500'
              data-aos-duration='1000'
            >
              Explore mountains in the Philippines
            </Typography>

            <Button
              variant='contained'
              size='large'
              sx={{ mt: 5, alignSelf: "center" }}
              data-aos='fade-down'
              data-aos-delay='700'
              data-aos-duration='1000'
            >
              Explore
            </Button>
          </Box>

          <Box
            sx={{ mt: 20 }}
            data-aos='fade-down'
            data-aos-delay='900'
            data-aos-duration='1000'
          >
            <BookingForm />
          </Box>
        </Container>
      </Box>

      <Box sx={{ paddingY: 12, background: "#fff" }}>
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid
              item
              sm={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              data-aos='fade-right'
              data-aos-delay='300'
              data-aos-duration='1000'
            >
              <Typography variant='h3' sx={{ mb: 4 }}>
                Mt. Pulag
              </Typography>

              <Typography sx={{ mb: 4 }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium in eius nobis quaerat deleniti assumenda libero natus
                quasi saepe eaque repellendus, temporibus ab ex maiores at
                impedit, itaque ad eveniet.
              </Typography>

              <Button
                variant='contained'
                size='large'
                sx={{ alignSelf: "flex-start" }}
              >
                Read More
              </Button>
            </Grid>

            <Grid item sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  columnGap: 2,
                }}
              >
                <Box
                  className={styles.box1}
                  data-aos='fade-left'
                  data-aos-delay='300'
                  data-aos-duration='1000'
                >
                  <img src={PulagImg1} alt='mt. pulag' />
                </Box>

                <Box
                  className={styles.box2}
                  data-aos='fade-left'
                  data-aos-delay='500'
                  data-aos-duration='1000'
                >
                  <img src={PulagImg1} alt='mt. pulag' />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
