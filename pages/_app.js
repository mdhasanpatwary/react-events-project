import Layout from "../components/layout/layout";
import Head from "next/head";
import { NotificationContextProvider } from "../store/notification-context";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Event</title>
          <meta name="description" content="NextJS Event" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
