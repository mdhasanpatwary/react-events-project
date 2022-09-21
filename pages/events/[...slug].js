import { Fragment } from "react";
// import { getFilteredEvents } from "../../dummy-data";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
// import { useRouter } from "next/router";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/Button";

function FilteredEventPage(props) {
  // const router = useRouter();
  // const filterDate = router.query.slug;

  // if (!filterDate) {
  //   return <p className="center">Loading...</p>;
  // }
  // const [filteredYear, filteredMonth] = filterDate;

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter. Please Adjust Your Values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events Found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const date = new Date(numYear, numMonth - 1);
  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const filterDate = params.slug;

  const [filteredYear, filteredMonth] = filterDate;

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: "/error"
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      date: {
        year: numYear,
        month: numMonth,
      },
      events: filteredEvents,
    },
  };
}
