let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },

    zoom: 8,
    mapId: "eb07bfa233a67aa3",
  });
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(-34.397, 150.644),
    map: map,
  });
  map.fit;

  google.maps.event.addListener(map, "idle", () => {
    let bounds = map.getBounds();
    let center = map.getCenter();
    console.log({
      northEast: bounds.getNorthEast(),
      //   center: center,
      southWest: bounds.getSouthWest(),
    });
    // fetchData({
    //   northEast: bounds.getNorthEast(),
    //   //   center: center,
    //   southWest: bounds.getSouthWest(),
    // });
  });
}

// window.addEventListener("load", () => {
//   setTimeout(() => {
//     // console.log("kiu");
//     let bounds = map.getBounds();
//     console.log(bounds);
//   }, 4000);
// });
