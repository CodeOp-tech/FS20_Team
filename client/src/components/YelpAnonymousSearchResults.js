import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

function YelpAnonymousSearchResults(props) {
  const { goToLogin } = useContext(UserContext);

  return (
    <div>
      <h3>Search Results</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <h3>Name</h3>
              </th>
              <th>
                <h3>Image</h3>
              </th>
              <th>
                <h3>Details</h3>
              </th>
              <th>
                <h3>Add to Itinerary</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.searchResults &&
              props.searchResults.map((r) => (
                <tr key={r.id}>
                  <td>
                    <h3>{r.name}</h3>
                    <h4>{r.price}</h4>

                    <img
                      src={`/YelpImages/${r.rating}.png`}
                      alt={`rating ${r.rating}`}
                      width="60"
                    />
                    <a href={r.url} target="_blank" rel="noreferrer">
                      <img
                        alt="yelp logo"
                        src="/YelpImages/yelp_logo.png"
                        width="60"
                      ></img>
                    </a>
                    <p>Based on{" " + r.review_count + " "}reviews</p>
                  </td>
                  <td>
                    <img
                      src={r.image_url}
                      width="120"
                      height="120"
                      alt={"image of" + r.name}
                    />
                  </td>
                  <td>
                    <b>Address: </b>
                    {r.location.address1}, <br /> {r.location.city},{" "}
                    {r.location.zip_code} <br />
                    <b>Phone: </b>
                    {r.phone}
                  </td>

                  <td>
                    <button
                      onClick={(e) => goToLogin(e)}
                      className="btn btn-primary"
                    >
                      Add to Itinerary
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default YelpAnonymousSearchResults;
