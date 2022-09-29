import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import turf from "turf";

import styles from "./map.module.css";
// import Select from "../select";

mapboxgl.accessToken =
  "pk.eyJ1IjoicnZtYWJhbnRhIiwiYSI6ImNsNzhuZjlzbjBiazIzcXM2ZDZibnM5bjEifQ.3flpVG66izuFPJpZJrMKog";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(121.0741213);
  const [lat, setLat] = useState(14.5775637);
  const [zoom, setZoom] = useState(13);
  const [markers, setMarkers] = useState([]);

  const [pinRouteGeojson, setPenrouteGeojson] = useState();

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return;

    console.log("lajsdfsss");

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rvmabanta/cl8mw8hs0000n14mi0hmm3lmg",
      //   center: [lng, lat],
      center: [6.58968, 45.39701],
      zoom: zoom,
      pitch: 76,
      bearing: 150,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      interactive: false,
      hash: false,
    });

    // Start downloading the route data, and wait for map load to occur in parallel
    const getCoordinate = async () => {
      const [geojson] = await Promise.all([
        fetch(
          "https://docs.mapbox.com/mapbox-gl-js/assets/route-pin.geojson"
        ).then((response) => response.json()),
        map.current.once("load"),
      ]);

      console.log(geojson);

      setPenrouteGeojson(geojson);

      const pinRoute = geojson.features[0].geometry.coordinates;
      // Create the marker and popup that will display the elevation queries
      const popup = new mapboxgl.Popup({ closeButton: false });
      const marker = new mapboxgl.Marker({
        color: "red",
        scale: 0.8,
        draggable: false,
        pitchAlignment: "auto",
        rotationAlignment: "auto",
      })
        .setLngLat(pinRoute[0])
        .setPopup(popup)
        .addTo(map.current)
        .togglePopup();

      // Add a line feature and layer. This feature will get updated as we progress the animation
      map.current.addSource("line", {
        type: "geojson",
        // Line metrics is required to use the 'line-progress' property
        lineMetrics: true,
        data: geojson,
      });

      map.current.addLayer({
        type: "line",
        source: "line",
        id: "line",
        paint: {
          "line-color": "rgba(0,0,0,0)",
          "line-width": 5,
        },
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
      });

      // Add some fog in the background
      map.current.setFog({
        range: [-0.5, 2],
        color: "white",
        "horizon-blend": 0.2,
      });

      // Add a sky layer over the horizon
      map.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-color": "rgba(85, 151, 210, 0.5)",
        },
      });

      // Add terrain source, with slight exaggeration
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 14,
      });

      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      await map.current.once("idle");

      setMapLoaded(true);

      animate(pinRoute, popup, marker);
    };

    getCoordinate();
  }, []);

  const animate = (pinRoute, popup, marker) => {
    // The total animation duration, in milliseconds
    const animationDuration = 20000;
    // Use the https://turfjs.org/ library to calculate line distances and
    // sample the line at a given percentage with the turf.along function.
    const path = turf.lineString(pinRoute);
    // Get the total line distance
    const pathDistance = turf.lineDistance(path);
    let start;
    function frame(time) {
      if (!start) start = time;
      const animationPhase = (time - start) / animationDuration;
      if (animationPhase > 1) {
        return;
      }

      // Get the new latitude and longitude by sampling along the path
      const alongPath = turf.along(path, pathDistance * animationPhase).geometry
        .coordinates;
      const lngLat = {
        lng: alongPath[0],
        lat: alongPath[1],
      };

      // Sample the terrain elevation. We round to an integer value to
      // prevent showing a lot of digits during the animation
      const elevation = Math.floor(
        // Do not use terrain exaggeration to get actual meter values
        map.current.queryTerrainElevation(lngLat, { exaggerated: false })
      );

      // Update the popup altitude value and marker location
      popup.setHTML("Altitude: " + elevation + "m<br/>");
      marker.setLngLat(lngLat);

      // Reduce the visible length of the line by using a line-gradient to cutoff the line
      // animationPhase is a value between 0 and 1 that reprents the progress of the animation
      map.current.setPaintProperty("line", "line-gradient", [
        "step",
        ["line-progress"],
        "red",
        animationPhase,
        "rgba(255, 0, 0, 0)",
      ]);

      // Rotate the camera at a slightly lower speed to give some parallax effect in the background
      const rotation = 150 - animationPhase * 40.0;
      map.current.setBearing(rotation % 360);

      window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  };

  useEffect(() => {
    if (!map.current) return;

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div className={styles.wrapper}>
      <div ref={mapContainer} className={styles.mapContainer} />
    </div>
  );
};

export default Map;
