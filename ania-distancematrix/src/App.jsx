import { useEffect, useState, useRef } from "react";
import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import "./App.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

function App() {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setlongitude] = useState(-0.112869);
  const [lattitude, setLattitude] = useState(51.504);

  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  const drawRoute = (geoJson, map) => {
    if (map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
    console.log({ geoJSON: geoJson });
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geoJson,
      },
      paint: {
        "line-color": "#4a90e2",
        "line-width": 6,
      },
    });
  };
  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement("div");
    element.className = "markerDelivery";
    new tt.Marker({
      element: element,
    })
      .setLngLat(lngLat)
      .addTo(map);
  };
  useEffect(() => {
    const origin = {
      lng: longitude,
      lat: lattitude,
    };
    const destinations = [];

    let map = tt.map({
      key: "AyzGbh3aEXUxzJuFOceNZlxddvLMJOeh",
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      center: [longitude, lattitude],
      zoom: 7,
    });
    setMap(map);

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25],
      };
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(
        "this is you"
      );
      const element = document.createElement("div");
      element.className = "marker";
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, lattitude])
        .addTo(map);
      marker.on("dragend", () => {
        const lnglat = marker.getLngLat();
        setlongitude(lnglat.lng);
        setLattitude(lnglat.lat);
      });
      marker.setPopup(popup).togglePopup();
    };
    addMarker();

    const sortDestinations = (locations) => {
      const pointsForDestinations = locations.map((destinations) => {
        return convertToPoints(destinations);
      });
      const callParameters = {
        key: "AyzGbh3aEXUxzJuFOceNZlxddvLMJOeh",
        destinations: pointsForDestinations,
        origins: [convertToPoints(origin)],
      };
      return new Promise((resolve, reject) => {
        ttapi.services
          .matrixRouting(callParameters)
          .then((matrixAPIResults) => {
            const results = matrixAPIResults.matrix[0];
            console.table({
              time: results[0].response.routeSummary.travelTimeInSeconds,
              distance: results[0].response.routeSummary.lengthInMeters,
            });
            const resultsArray = results.map((result, index) => {
              return {
                location: locations[index],
                drivingtime: result.response.routeSummary.travelTimeInSeconds,
              };
            });
            resultsArray.sort((a, b) => {
              return a.drivingtime - b.drivingtime;
            });
            const sortedLocations = resultsArray.map((result) => {
              return result.location;
            });
            resolve(sortedLocations);
          });
      });
    };
    // const pointsForDestination = locations.map
    // const callParameters = {
    //   key:"AyzGbh3aEXUxzJuFOceNZlxddvLMJOeh",
    //   destinations:pointsForDestination,
    //   origins:[covertToPoints(origin)]
    // }
    // return new Promise((resolve,reject)=>{
    //   ttapi.services
    //   .matrixRouting(callParameters)
    // })

    const recalculateRoutes = () => {
      sortDestinations(destinations).then((sorted) => {
        sorted.unshift(origin);
        ttapi.services
          .calculateRoute({
            key: "AyzGbh3aEXUxzJuFOceNZlxddvLMJOeh",
            locations: sorted,
          })
          .then((routeData) => {
            const geoJSON = routeData.toGeoJson();
            drawRoute(geoJSON, map);
          });
      });
    };
    map.on("click", (e) => {
      console.log(e.lngLat);
      destinations.push(e.lngLat);
      addDeliveryMarker(e.lngLat, map);
      recalculateRoutes();
    });

    return () => map.remove();
  }, [longitude, lattitude]);

  return (
    <>
      {map && (
        <div className="App">
          <div ref={mapElement} className="map" />
          <div className="search-bar">
            <h1>Where to?</h1>
            <input
              type="text"
              id="longitude"
              placeholder="longitude"
              onChange={(e) => {
                setlongitude(e.target.value);
              }}
            />
            <input
              type="text"
              id="lattitude"
              placeholder="lattitude"
              onChange={(e) => {
                setLattitude(e.target.value);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
