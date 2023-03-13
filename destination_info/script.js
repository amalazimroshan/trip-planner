let api_key = "AyzGbh3aEXUxzJuFOceNZlxddvLMJOeh";
let destination_list = document.querySelector(".destination_list_container");
let map = tt.map({
  key: api_key,
  container: "map",
  center: [-3.70379, 40.416775],
  zoom: 5,
});
const main = async () => {
  const app = new Realm.App({ id: "appllication-01-brmct" });
  const user = await app.logIn(Realm.Credentials.anonymous());

  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const collection = mongodb.db("realesate").collection("propertise");

  const result = await user.functions.getAllPositions();
  result.forEach((destination) => {
    if (destination.position) {
      render_destination_card(destination);
      render_destination_marker(destination);
    }
  });
};
main();

function render_destination_card(data) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.textContent = data.position.coordinates[0];
  destination_list.appendChild(card);

  const options = {
    root: destination_list,
    rootMargin: "10px",
    threshold: 1,
  };
  const observer = new IntersectionObserver(callback, options);
  function callback(entries) {
    entries.forEach((entry) => {
      const intersecting = entry.isIntersecting;
      entry.target.setAttribute("focus", intersecting ? true : false);
      if (intersecting) {
        console.log({
          textcontent: entry.target.textContent,
          intersectionRatio: entry.intersectionRatio,
          insectionRect: entry.intersectionRect,
          bounds: entry.rootBounds,
        });
      }
    });
  }
  document.querySelectorAll(".card").forEach((elem) => {
    observer.observe(elem);
  });
}
function render_destination_marker(data) {
  console.log(data.position.coordinates);
  new tt.Marker().setLngLat(data.position.coordinates).addTo(map);
}
