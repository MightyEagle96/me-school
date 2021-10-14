import React from "react";
import SideMenu from "../../../components/SideMenu/SideMenu";

import { loggedInUser } from "../../../data/services";

// console.log(loggedInUser.imageUrl);
export default function StudentDashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <SideMenu />
        </div>
        <div className="col-md-9">
          <img
            src={loggedInUser.imageUrl}
            alt=""
            srcset={loggedInUser.imageUrl}
          />
        </div>
      </div>
    </div>
  );
}
