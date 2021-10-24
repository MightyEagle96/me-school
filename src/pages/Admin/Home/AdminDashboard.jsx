import React from "react";
import SideMenu from "../../../components/SideMenu/SideMenu";

export default function AdminDashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <SideMenu />
        </div>
        <div className="col-md-9 pr-3"></div>
      </div>
    </div>
  );
}
