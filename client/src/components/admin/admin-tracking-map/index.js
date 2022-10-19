import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const { mapboxgl } = window;
mapboxgl.accessToken =
  "pk.eyJ1IjoicnZtYWJhbnRhIiwiYSI6ImNsNzhuZjlzbjBiazIzcXM2ZDZibnM5bjEifQ.3flpVG66izuFPJpZJrMKog";

const styles = {
  wrapper: {
    position: "relative",
    height: "100%",
    width: "100%",
  },

  mapContainer: {
    position: "absolute",
    top: "0",
    bottom: "0",
    height: "100%",
    width: "100%",
  },
};

const AdminTrackingMap = ({ users }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [marker, setMarker] = useState([]);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rvmabanta/cl8mw8hs0000n14mi0hmm3lmg",
      center: [121.0740042, 14.5777359],
      zoom: 16,
      pitch: 64,
      bearing: 150,
      interactive: false,
      hash: false,
    });

    // addMarker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(users);
    if (marker.length > 0) marker.forEach((m) => m.remove());

    users.forEach((user) => {
      const coordinates = user.location.coordinates[0];
      addMarker(coordinates);

      console.log(coordinates, "marker created");
    });

    // map.current.setCenter(coordinates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const addMarker = (coordinates) => {
    const marker = new mapboxgl.Marker({
      color: "red",
      scale: 0.8,
      draggable: false,
      pitchAlignment: "auto",
      rotationAlignment: "auto",
    })
      .setLngLat(coordinates)
      // .setPopup(popup)
      .addTo(map.current);
    // .togglePopup();

    setMarker((prev) => [...prev, marker]);
  };

  return (
    <Box sx={styles.wrapper}>
      <Box ref={mapContainer} sx={styles.mapContainer}></Box>
    </Box>
  );
};

export default AdminTrackingMap;
