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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-4">
            {allEvents?.length > 0 ? (
              allEvents.map((event, index) => (
                <EventCard key={index} active={true} data={event} />
              ))
            ) : (
              <h4 className="text-[25px] font-[400] ml-10">
                No Events Available!
              </h4>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;