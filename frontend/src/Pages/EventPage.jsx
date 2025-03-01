import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../component/Events/EventCard";
import Header from "../component/Layout/Header";
import Loader from "../component/Layout/Loader";
// import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  // console.log(allEvents)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <EventCard active={true} data={allEvents && allEvents[0]} />
        </div>
      )}
    </>
  );
};

export default EventsPage;