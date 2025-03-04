import React from "react";
import styles from "../../style/Style.js";
import EventCard from "./EventCard.jsx";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  console.log(allEvents);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allEvents?.length > 0 ? (
              allEvents.map((event, index) => (
                <EventCard key={index} data={event} />
              ))
            ) : (
              <h4 className="text-[25px] font-[400] ml-10">
                No Events Available!
              </h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
