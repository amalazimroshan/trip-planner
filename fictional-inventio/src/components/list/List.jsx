import React from "react";
import Cards from "../cards/Cards";
export const List = ({ propertiseList }) => {
  // console.log(propertyList);
  return (
    <>
      <h4 style={{ textAlign: "center" }}>list of propertise</h4>

      <div
        style={{
          height: "90vh",
          overflow: "scroll",
          flexWrap: "wrap",
          justifyContent: "space-around",
          // alignItems: "stretch",
          display: "flex",
        }}
      >
        {propertiseList?.map((property, i) => {
          return (
            // <p key={property._id}> {property.name}</p>;
            <Cards property={property} key={i} />
          );
        })}
      </div>
    </>
  );
};
export default List;
