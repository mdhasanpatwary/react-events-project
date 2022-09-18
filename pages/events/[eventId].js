// import { getEventById } from "../../dummy-data";
import { getEventById, getAllEvents } from "../../helpers/api-util";
import { Fragment } from "react";
import EventSummery from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import ErrorAlert from "../../components/ui/error-alert";
import { useRouter } from "next/router";

function EventDetailsPage({ event }) {
  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found!</p>
      </ErrorAlert>
    );
  }
  return (
    <Fragment>
      <EventSummery title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.imageAlt}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailsPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      event: event,
    },
  };
}

export async function getStaticPaths() {
  const allEvents = await getAllEvents();
  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: false,
  };
}
