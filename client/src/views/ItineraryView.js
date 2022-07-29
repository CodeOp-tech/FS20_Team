import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ItineraryList from "../components/ItineraryList";
import Api from "../helpers/Api";
import TripsContext from "../context/TripsContext.js";

// import the trip, getTrip, and getItineraries from context
// set initcolumns as the date field in trip (filter?)

function ItineraryView(props) {
  const { trip, getTrip, itineraries, fetchItineraries } =
    useContext(TripsContext);

  let InitColumns = {
    //   col1: [{ id: "box1", text: "La Pedrera at 6" }],
    //   col2: [{ id: "box2", text: "Dinner at 7" }],
    //   col3: [{ id: "box3", text: "Lunch at 2" }],
  };

  for (let i = 0; i < trip["itinerary"].length; i++) {
    InitColumns[`col${i}`] = [
      {
        //   change this to date
        id: trip["itinerary"][i].activityid,
        text: `${trip["itinerary"][i].activity} at ${trip["itinerary"][i].location}`,
      },
    ];
  }

  console.log(InitColumns);
  const [columns, setColumns] = useState(InitColumns);

  //   useEffect(() => {
  //     getTrip(id);
  //   }, []);

  //   defining cards for pass on to children
  //   let card = [`${trip.activity} ${trip.time}`];

  function moveBox(item, toColId) {
    let boxId = item.id;
    let fromColId = item.fromColId;

    let newColumns = { ...columns };
    //   find index of the box to be moved
    // console.log("Hello", newColumns, "hEY", fromColId);
    // let index = newColumns[fromColId].findIndex((b) => b.id === boxId);
    // remove from old column by splicing
    // let boxes = newColumns[fromColId].splice(index, 1);
    // add it to the new column
    // newColumns[toColId].push(boxes[0]);
    // update state
    setColumns((columns) => newColumns);
  }

  return (
    <div>
      <h1>Itinerary for Your Trip 📅 </h1>
      <div className="itinerary-container">
        {/* i think that this as well as sample card could be potentially editable with a similar thing as edit profile
      except onclick would apply to the whole element instead of a button */}

        <DndProvider backend={HTML5Backend}>
          {trip.itinerary.map((i) => (
            <ItineraryList
              key={""}
              id={i.date}
              date={i.date}
              itinerary={trip["itinerary"]}
              dropCb={moveBox}
            />
          ))}
        </DndProvider>

        {/* javascript insert time, activity, and location */}
        {/* {itineraryCards.map((card, index) => (
          <div key={index} className="itinerary-list-card" draggable>
            {card.Time}: {card.Activity}
          </div>
        ))} */}
        {/* <p>Time: Activity at Location</p> */}
      </div>
    </div>
  );
}

export default ItineraryView;
