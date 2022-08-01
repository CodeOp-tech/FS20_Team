import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItineraryCard from "./ItineraryCard";
import "./ItineraryList.css";

// define empty form
const EMPTY_FORM = {
  activity: "",
  date: "",
  location: "",
  //   somehow make it so that both activity and location are accepted in the same input?
  time: "",
  //   date is column date
};

function ItineraryList(props) {
  const [formData, setFormData] = useState(EMPTY_FORM);

  let itinerary = props.itinerary;

  function handleChange(event) {
    let { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.addToItineraryCb(formData);
    alert("woohooo! new activity added!");
    setFormData(EMPTY_FORM);
  }

  // Courtesy of Jim!
  //    converts sql date to human
  function convertDbDateToHuman(dbDateTime) {
    // Create a date obj
    let dateObj = new Date(dbDateTime);

    // Convert it to a (long) human readable format
    let humanReadable = dateObj.toString(); // 'Fri Jul 08 2022 00:00:00 GMT+0200'

    // I only want to keep the date part of it
    let humanDate = humanReadable.substring(4, 15); // 'Jul 08 2022'

    return humanDate;
  }

  const [collected, dropRef] = useDrop(() => ({
    accept: "box",

    // this is called when a box is dropped (between columns)
    drop(item, monitor) {
      // pass up the box prop and column id
      props.dropCb(item, props.id);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),

    // possibly include: a box cant be dropped on the column where the drag started?
    // A box can't be dropped on the column where the drag started!
    canDrop(item, monitor) {
      let box = document.getElementById(item.id);
      let col = document.getElementById(props.id);

      return box.parentElement !== col;
    },
  }));

  // sort activities by date
  let sortedByDate = itinerary.filter(
    (itinerary) => (itinerary.date = props.date)
  );

  //   sort by time

  // set background color if box is being dragged over a different column
  let canDropClass = collected.isOver && collected.canDrop ? "can-drop" : "";
  return (
    <div
      id={props.id}
      key={props.id}
      ref={dropRef}
      className={`itinerary-list-wrapper col ${canDropClass}`}
    >
      {/* i think that this as well as sample card could be potentially editable with a similar thing as edit profile
      except onclick would apply to the whole element instead of a button */}
      <h2>{convertDbDateToHuman(props.date)}</h2>
      {itinerary
        .filter((itinerary) => itinerary.date === props.date)
        .map((itinerary) => (
          <ItineraryCard
            id={itinerary.date}
            key={itinerary.activityid}
            itinerary={itinerary}
          >
            <strong>{itinerary.time}</strong> <br /> {itinerary.activity} at{" "}
            {itinerary.location}
          </ItineraryCard>
        ))}
      <input
        className="itinerary-card-input"
        id=""
        // value:
        type="text"
        onChange={handleChange}
        placeholder="Add something..."
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default ItineraryList;
