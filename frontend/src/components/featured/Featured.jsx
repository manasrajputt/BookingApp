import React from "react";
import "./featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels/countByCity?cities=berlin,newyork,london"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredIem">
            <img
              src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQd9Az43WXF8Mwvn9iLU7B7TEbUShOxMA_GnM1_TOarN9-zeJmWRn7dF7lNCpV8wi-VgEExnayegj1dWATFBGVU4ootxwQjdNuuIJU9Hg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>Berlin</h1>
              <h2>
                {data.filter((obj) => obj.city === "berlin")[0]?.count}{" "}
                properties
              </h2>
            </div>
          </div>
          <div className="featuredIem">
            <img
              src="https://lh5.googleusercontent.com/p/AF1QipPJA1W3rAPK3xAArAOtYdTMu5rgRDbkTAotGV3t=w675-h390-n-k-no"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>London</h1>
              <h2>
                {data.filter((obj) => obj.city === "london")[0]?.count}{" "}
                properties
              </h2>
            </div>
          </div>
          <div className="featuredIem">
            <img
              src="https://lh3.googleusercontent.com/proxy/g-ljxmC9hqYpgbNRM2dhT4x30UsLIeylGkNR8j7xU75F3uXUHTB-hNcdjNy_H5_ZxgnbUxNUvne8TOZBcYT-BwoIQZgXwXlkyciXBHBPkNH2SavG7WhWDqT383O5PPPhie3Pw0fSRriv3TF8TEb8cu7JuH5-_Q=w675-h390-n-k-no"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>New York</h1>
              <h2>
                {data.filter((obj) => obj.city === "newyork")[0]?.count}{" "}
                properties
              </h2>
            </div>
          </div>
          {/* <div className="featuredIem">
            <img
              src="https://lh5.googleusercontent.com/p/AF1QipMaApJnlRzCopWyBTtYPVhTMh1_vDMrobQmNzMZ=w675-h390-n-k-no"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitle">
              <h1>Switzerland</h1>
              <h2>{data.filter(obj => obj.city === "switzerland").length === 0 ? 0 : data.filter(obj => obj.city === "switerzerland")[0]?.count} properties</h2>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Featured;
