import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Map from "./components/map/Map";
import List from "./components/list/List";
import Navbar from "./components/navbarr/Navbarr";
import { Container, Row, Col } from "react-bootstrap";

const App = () => {
  // const [restaurantList, setRestaurantList] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [propertyList, setPropertyList] = useState([]);
  const [filters, setFilters] = useState({
    price: 10000000,
    bedroom: 5,
    parking: false,
  });

  const REALM_APP_ID = "monogodb-atlas-appid";
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();

  const getProprtyData = async (values) => {
    // setPropertydata(values);
    try {
      const result = await (
        await app.logIn(credentials)
      ).functions.PostData(values);
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    async function getProprtyList() {
      try {
        console.log({ coordinates_changed: bounds, filters });

        const user = await app.logIn(credentials);
        const propertise = await user.functions.funcToTestArg({
          bounds,
          filters,
        });
        setPropertyList(propertise);
        console.log({ dataFromSrvr: propertise });
        // console.log(propertyList);
      } catch (err) {
        console.error(err);
      }
    }
    Object.keys(bounds).length !== 0 && getProprtyList();
  }, [bounds, filters]);


  return (
    <Container fluid>
      <Row>
        <Navbar getProprtyData={getProprtyData} setFilters={setFilters} />
      </Row>
      <Row style={{ flexDirection: "row-reverse" }}>
        {/* map */}
        <Col lg={8} className="p-0" style={{ background: "hsl(120,40%,80%)" }}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={propertyList}
          />
        </Col>
        {/* list */}
        <Col style={{ backgroundColor: "#fff" }}>
          <List propertiseList={propertyList} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
