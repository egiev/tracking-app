import { useEffect, useRef, useState } from "react";

import styles from "./tracking-map.module.css";

const { mapboxgl } = window;

const TrackingMap = ({ coordinate }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rvmabanta/cl8mw8hs0000n14mi0hmm3lmg",
      center: coordinate,
      zoom: 16,
      pitch: 64,
      bearing: 150,
      interactive: false,
      hash: false,
    });

    addMarker();
  }, []);

  useEffect(() => {
    console.log(map.current);
    if (marker) marker.remove();

    addMarker();
    map.current.setCenter(coordinate);
  }, [coordinate]);

  const addMarker = () => {
    const marker = new mapboxgl.Marker({
      color: "red",
      scale: 0.8,
      draggable: false,
      pitchAlignment: "auto",
      rotationAlignment: "auto",
    })
      .setLngLat(coordinate)
      // .setPopup(popup)
      .addTo(map.current);
    // .togglePopup();

    setMarker(marker);
  };

  return (
    <div className={styles.wrapper}>
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  );
};

export default TrackingMap;
