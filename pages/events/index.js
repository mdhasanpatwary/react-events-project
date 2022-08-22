import { Fragment } from "react";
import { useRouter } from "next/router";
import EventsSearch from "../../components/event-detail/events-search";
import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";

function AllEvenstPage() {
  const allEvents = getAllEvents();
  const router = useRouter();

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventHandler} />
      <EventList events={allEvents} />
    </Fragment>
  );
}

export default AllEvenstPage;
