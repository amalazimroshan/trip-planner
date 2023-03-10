const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "78c73ab0f5mshdd41090fa4894e5p161ec2jsn7764533f972e",
    "X-RapidAPI-Host": "airbnb19.p.rapidapi.com",
  },
};

fetch("https://airbnb19.p.rapidapi.com/api/v1/getLanguages", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));

async function fetchData(coordinates) {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "78c73ab0f5mshdd41090fa4894e5p161ec2jsn7764533f972e",
      "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
    },
    body: `{"contentId":"cc8fc7b8-88ed-47d3-a70e-0de9991f6604","contentType":"restaurant","filters":[{"id":"placetype","value":["hotel","attraction","restaurant"]},{"id":"minRating","value":["5"]}],"boundingBox":{"northEastCorner":{"latitude":${coordinates.northEast.lat()},"longitude":${coordinates.northEast.lng()},"southWestCorner":{"latitude":${coordinates.southWest.lat()},"longitude":${coordinates.southWest.lng()}}}}`,
  };

  fetch(
    "https://travel-advisor.p.rapidapi.com/locations/v2/list-nearby?currency=USD&units=km&lang=en_US",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
