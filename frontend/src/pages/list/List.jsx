import React, { useContext, useState } from "react";
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `https://bookingapp-backend-su6r.onrender.com/api/hotels?city=${destination}&min=${min||0}&max=${max||999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label>Check-In-Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptionItem">
                <span className="lsItemText">
                  Min Price <small>per night</small>
                </span>
                <input
                  type="number"
                  onChange={(e) => setMin(e.target.value)}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsItemText">
                  Max Price <small>per night</small>
                </span>
                <input
                  type="number"
                  onChange={(e) => setMax(e.target.value)}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsItemText">Adult</span>
                <input
                  type="number"
                  min={1}
                  placeholder={options.adult}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsItemText">Children</span>
                <input
                  type="number"
                  min={0}
                  placeholder={options.children}
                  className="lsOptionInput"
                />
              </div>
              <div className="lsOptionItem">
                <span className="lsItemText">Room</span>
                <input
                  type="number"
                  min={1}
                  placeholder={options.room}
                  className="lsOptionInput"
                />
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
