import React from "react";
import "./propertyList.css";
import useFetch from "../../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels/countByType"
  );

  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="pListItem">
            <img
              src="https://3.imimg.com/data3/JV/KJ/MY-15827078/hotels-booking.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Hotels</h1>
              <h2>
                {data.filter((obj) => obj.type === "hotel")[0]?.count} Hotels
              </h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Apartment</h1>
              <h2>
                {data.filter((obj) => obj.type === "apartments")[0]?.count}{" "}
                Apartments
              </h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://www.mptourandtravels.com/bhopal/hotels/Hotel%20Palash%20Residency/01.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Resorts</h1>
              <h2>
                {data.filter((obj) => obj.type === "resorts")[0]?.count} Resorts
              </h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://res.cloudinary.com/simpleview/image/upload/v1686072977/clients/milwaukee/VM_Hilton_Plaza_Suite_King_Room_9b5d673a-95c6-445e-ad6b-5ae85e260f18.jpg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Cabins</h1>
              <h2>
                {data.filter((obj) => obj.type === "cabins")[0]?.count} Cabins
              </h2>
            </div>
          </div>
          <div className="pListItem">
            <img
              src="https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/62/30/a10202b376aca144b56cb75f8b7b6022c3d7d39716e091e7610214e2c947.jpeg"
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>Villas</h1>
              <h2>
                {data.filter((obj) => obj.type === "villas")[0]?.count} Villas
              </h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyList;
