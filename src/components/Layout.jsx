import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <Header />
      {/* push content below fixed header */}
      <div style={{ paddingTop: "140px" }}>
        <Outlet />
      </div>
    </>
  );
}
