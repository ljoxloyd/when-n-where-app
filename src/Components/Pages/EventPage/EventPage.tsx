import React from "react";
import UserSchedule from "./UserSchedule/UserSchedule";
import EventLocation from "./EventLocation/EventLocation";

const EventPage = () => (
  <main className="container grid grid-cols-8 xl:grid-cols-9 pb-32 gap-4 items-start">
    <UserSchedule />
    <EventLocation />
  </main>
);

export default EventPage