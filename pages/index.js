// import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
// import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

export default function Home(props) {
  return (
    <div className={styles.container}>
      <EventList events={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const transformedEvents = await getFeaturedEvents();

  return {
    props: {
      events: transformedEvents,
    },
  };
}
