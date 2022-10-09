import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const { mapboxgl } = window;

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

const TrackingMap = ({ coordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rvmabanta/cl8mw8hs0000n14mi0hmm3lmg",
      center: coordinates,
      zoom: 16,
      pitch: 64,
      bearing: 150,
      interactive: false,
      hash: false,
    });

    addMarker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (marker) marker.remove();

    addMarker();
    map.current.setCenter(coordinates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  const addMarker = () => {
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

    setMarker(marker);
  };

  return (
    <Box sx={styles.wrapper}>
      <Box ref={mapContainer} sx={styles.mapContainer}></Box>
    </Box>
  );
};

export default TrackingMap;
