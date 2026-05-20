import React from "react";
import NavBar from "./features/shared/components/NavBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AppLayout;