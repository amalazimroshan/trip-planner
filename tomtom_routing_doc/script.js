let api_key = "AyzGbh3aEXUxzJuFOceNZlxddvLMJOeh";
let map = tt.map({
  key: api_key,
  container: "map",
  center: [-3.70379, 40.416775],
  zoom: 5,
});
map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());

let instructions = null;
let results = null;

function convertTime(sec) {
  var hours = Math.floor(sec / 3600);
  hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
  var min = Math.floor(sec / 60);
  min >= 1 ? (sec = sec - min * 60) : (min = "00");
  sec < 1 ? (sec = "00") : void 0;

  min.toString().length == 1 ? (min = "0" + min) : void 0;
  sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

  return {
    hrs: hours,
    mins: min,
    secs: sec,
  };
}

document.getElementById("submit-btn").addEventListener("click", calculateRoute);

function calculateRoute() {
  const lat0 = 40.416775 || document.getElementById("lat-origin").value;
  const long0 = -3.70379 || document.getElementById("long-origin").value;
  const lat1 = 39.4699 || document.getElementById("lat-dest").value;
  const long1 = -0.3763 || document.getElementById("long-dest").value;
  const lat2 = 37.888175;
  const long2 = -4.779383;
  console.table({ source: [lat0, long0], destination: [lat1, long1] });
  new tt.Marker().setLngLat([long0, lat0]).addTo(map);
  new tt.Marker().setLngLat([long1, lat1]).addTo(map);
  new tt.Marker().setLngLat([long2, lat2]).addTo(map);

  fetch(
    // `https://api.tomtom.com/routing/1/calculateRoute/${lat0},${long0}:${lat1},${long1}/json?routeRepresentation=summaryOnly&instructionsType=text&key=${api_key}`
    `https://api.tomtom.com/routing/1/calculateRoute/${lat0},${long0}:${lat1},${long1}:${lat2},${long2}/json?routeRepresentation=summaryOnly&instructionsType=text&key=${api_key}`
  )
    .then((response) => response.json())
    .then((data) => {
      loadMapWithStopTimes(data, lat0, long0, lat1, long1);
    });
}

function loadMapWithStopTimes(data, long0, long1, lat0, lat1) {
  const { hrs, mins, secs } = convertTime(
    data.routes[0].summary.travelTimeInSeconds
  );
  const timeBtn = document.getElementById("time");
  timeBtn.innerHTML = `Your Journey will take ${hrs} hours, ${mins} minutes and ${secs} seconds`;

  instructions = data.routes[0].guidance.instructions;
  let label = document.createElement("label");
  label.innerHTML = "choose a time to stop for a meal";
  console.log(data);
  let select = document.createElement("select");
  select.id = "stop-time";
  select.name = "time";
  select.onchange = getRestaurants;

  let minTracker = null;
  instructions.forEach((instruction, index) => {
    if (index !== 0 && index !== 1 && index !== instruction.length - 1) {
      let { hrs, mins } = convertTime(instruction.travelTimeInSeconds);

      if (mins !== minTracker) {
        minTracker = mins;
        let option = document.createElement("option");
        option.setAttribute("value", instruction.travelTimeInSeconds);
        option.innerHTML = `${hrs} ${hrs === 1 ? "hour" : "hours"} and ${mins}`;
        select.appendChild(option);
      }
    }
  });
  document.getElementById("form-section").remove();
  let targetEl = document.getElementById("select-input-div");
  targetEl.appendChild(label);
  targetEl.appendChild(select);
}
function getRestaurants() {
  const option = document.getElementById("stop-time").value;
  const selectedLoc = instructions.find((instruction) => {
    return instruction.travelTimeInSeconds == option;
  });

  const lat = selectedLoc.point.latitude;
  const long = selectedLoc.point.longitude;
  console.log(lat, long);

  fetch(
    `https://api.tomtom.com/search/2/categorySearch/pizza.json?lat=${lat}&lon=${long}&radius=1700&categorySet=7315&view=Unified&relatedPois=off&key=AyzGbh3aEXUxzJuFOceNZlxddvLMJOeh`
  )
    .then((response) => response.json())
    .then((data) => {
      results = data.results;
      results.forEach((result) => {
        let dl = document.createElement("dl");
        dl.className = "restaurants_list";

        const dt_1 = document.createElement("dt");
        dt_1.innerHTML = `Restaurant Name:`;

        const dd_1 = document.createElement("dd");
        dd_1.innerHTML = result.poi.name;

        const dt_2 = document.createElement("dt");
        dt_2.innerHTML = `Address:`;

        const dd_2 = document.createElement("dd");
        dd_2.innerHTML = result.address.freeformAddress;

        const dt_3 = document.createElement("dt");
        dt_3.innerHTML = `Phone No:`;

        const dd_3 = document.createElement("dd");
        dd_3.innerHTML = result.poi.phone;

        const btn = document.createElement("button");
        btn.id = result.id;
        btn.className = "restaurants";
        btn.innerHTML = "Add to map";

        dl.appendChild(dt_1);
        dl.appendChild(dd_1);

        dl.appendChild(dt_2);
        dl.appendChild(dd_2);

        dl.appendChild(dt_3);
        dl.appendChild(dd_3);

        dl.appendChild(btn);

        document.getElementById("time").appendChild(dl);
      });
    });
}
let resButtons = document.getElementsByClassName("restaurants");
for (let i = 0; i < resButtons.length; i++) {
  resButtons[i].addEventListener("click", () => {
    let selectedRes = results.find((result) => {
      return result.id == resButtons[i].id;
    });

    const lat = selectedRes.position.lat;
    const lon = selectedRes.position.lon;

    const popup = new tt.Popup({ offset: 50 }).setText(selectedRes.poi.name);

    new tt.Marker()
      .setLngLat({ lat: lat, lng: lon })
      .setPopup(popup)
      .addTo(map);
  });
}
