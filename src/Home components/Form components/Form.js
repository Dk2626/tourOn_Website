import React, { useContext } from "react";
import "./Form.css";
import { ApiContext } from "../../Context/ApiContext";

export default function Form() {
  const { countries } = useContext(ApiContext);

  return (
    <div className="search_form">
      <h2>Search tour</h2>
      <p> Ready to rest? We are ready to help with the search</p>
      <form>
        <div className="searches">
          <div className="searchBox">
            <label>Name</label>
            <input type="text" name="" required="name" />
          </div>
          <div className="searchBox">
            <label>Mobile no</label>
            <input type="text" name="" required="name" />
          </div>
          <div className="searchBox">
            <label>Country Name</label>
            <div className="select_search">
              <select>
                {countries.map((c, index) => {
                  return (
                    <option key={index} value={c.countryName}>
                      {c.countryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="searchBox">
            <label>Duration</label>
            <div className="select_search">
              <select>
                <option value="travel_1">3 - 4 Days</option>
                <option value="travel_2">4 - 5 Days</option>
                <option value="travel_3">5 - 7 Days</option>
              </select>
            </div>
          </div>
        </div>
        <div className="btn-search">
          <button className="search_bt">Submit</button>
        </div>
      </form>
    </div>
  );
}
