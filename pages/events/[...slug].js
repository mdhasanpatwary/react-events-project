import { Fragment } from "react";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import { useRouter } from "next/router";
import ResultsTitle from "../../components/events/results-title";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/Button";

function FilteredEventPage() {
  const router = useRouter();
  const filterDate = router.query.slug;

  if (!filterDate) {
    return <p className="center">Loading...</p>;
  }
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

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

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

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventPage;
