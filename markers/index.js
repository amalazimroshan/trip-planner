// Initialize and add the map

function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.031 };
  // The map, centered at Uluru
  window.map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
}
const main = async () => {
  const app = new Realm.App({ id: "appllication-01-brmct" });
  const user = await app.logIn(Realm.Credentials.anonymous());

  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongodb.db("realestate").collection("propertise"); // Everytime a change happens in the stream, add it to the list of events

  const result = await user.functions.getAllPositions();
  console.log(result);
  addmarkers(result);
};
main();
window.initMap = initMap;
console.log(window.map);

async function addmarkers(data) {
  data.forEach((element) => {
    let coords = {
      lat: element.position.coordinates[1],
      lng: element.position.coordinates[0],
    };
    // console.log(coords);
    const marker = new google.maps.Marker({
      position: coords,
      map: map,
    });

    let div = document.createElement("div");
    div.textContent = element.description;
    document.body.appendChild(div);
  });
}
