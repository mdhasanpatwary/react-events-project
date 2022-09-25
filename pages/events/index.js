import { Fragment } from "react";
import { useRouter } from "next/router";
import EventsSearch from "../../components/event-detail/events-search";
import EventList from "../../components/events/event-list";
// import { getAllEvents } from "../../dummy-data";
import { getAllEvents } from "../../helpers/api-util";

function AllEvenstPage(props) {
  // const allEvents = getAllEvents();
  const router = useRouter();

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventHandler} />
      <EventList events={props.events} />
    </Fragment>
  );
}

export default AllEvenstPage;

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 1800,
  };
}
