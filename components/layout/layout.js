import Head from "next/head";
import { Fragment } from "react";
import MainHeader from "./main-header";

function Layout(props) {
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
    </Fragment>
  );
}
export default Layout;
