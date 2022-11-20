import Head from "next/head";
import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import Notification from "../../components/ui/notification";
import NotificationContext from "../../store/notification-context";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <Head>
        <title>Events Project</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}
export default Layout;
