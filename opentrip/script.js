// const apiKey = "5ae2e3f221c38a28845f05b6d886530450fb7b620a277537786aa156";

// function apiGet(method, query) {
//   return new Promise(function (resolve, reject) {
//     var otmAPI =
//       "https://api.opentripmap.com/0.1/en/places/" +
//       method +
//       "?apikey=" +
//       apiKey;
//     if (query !== undefined) {
//       otmAPI += "&" + query;
//     }
//     fetch(otmAPI)
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch(function (err) {
//         console.log("Fetch Error :-S", err);
//       });
//   });
// }

// const pageLength = 5; // number of objects per page

// let lon = 80;
// let lat = -10;

// let offset = 0; // offset from first object in the list
// let count = 4; // total objects count
// let radius = 10;
// let city_name = "moscow";

// apiGet(
//   "radius",
//   "name=" +
//     `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2&format=count`
// ).then(function (data) {
//   let message = "Name not found";
//   console.log(data);
// });

async function fetchData() {
  let response = await fetch(
    "https://api.opentripmap.com/0.1/en/places/radius?radius=100000&lon=77.200507&lat=38.269239&apikey=5ae2e3f221c38a28845f05b6d886530450fb7b620a277537786aa156"
  );
  let data = await response.json();
  console.log(data);
}

fetchData();
