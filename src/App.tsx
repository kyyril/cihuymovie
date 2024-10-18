import { Outlet } from "react-router-dom";
import Layout from "./components/Layout";

function MyApp() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default MyApp;
