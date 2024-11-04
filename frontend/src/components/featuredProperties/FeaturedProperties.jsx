import React from "react";
import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "https://bookingapp-backend-su6r.onrender.com/api/hotels?featured=true&limit=4"
  );

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={
                  item.photos.length !== 0
                    ? item.photos[0].url
                    : "https://cf.bstatic.com/static/img/theme-index/bg_holidayhomes/8cd8cfbc91ca86a0fac09532b9f5da4eb4960c2e.jpg"
                }
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
