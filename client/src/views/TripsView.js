import React, { useState, useEffect, useContext, useParams } from "react";
import { Link } from "react-router-dom";
import AddTripPopUp from "../components/AddTripPopUp.js";
import TripsContext from "../context/TripsContext.js";
import MapsView from "./MapsView.js";
import TripByIdView from "./TripByIdView.js";
import UserContext from "../context/UserContext";

function TripsView(props) {
  const [openPopUp, setOpenPopUp] = useState(false);
  const { user } = useContext(UserContext);
  const { addTrip, getTrip } = useContext(TripsContext);

  return (
    <div>
      {/* button to add a new trip OPENS POP UP COMPONENT*/}
      <div>
        <button className="modalBtn" onClick={() => setOpenPopUp(true)}>
          Add New Trip
        </button>
      </div>
      {/* used pop up component */}
      <AddTripPopUp
        addTrip={(trip) => addTrip(trip)}
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
      />
      <div className="container">
        {/* map through trip cards */}
        {user &&
          user.trips.map((trip) => (
            <div className="row" key={trip.trip_id} style={{ width: "25rem" }}>
              <div className="card-body">
                <h4 className="card-title">{trip.destination}</h4>
                <h6 className="card-text">
                  {trip.startDate} - {trip.endDate}
                </h6>
              </div>
              {/* button for editing trip info ///// !!NOT FUNCTION YET!! ///// */}
              <div className="card-footer">
                <button
                  className="btn btn-outline-primary"
                  onClick={(e) => getTrip(trip.trip_id)}
                >
                  Trip Details
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TripsView;
