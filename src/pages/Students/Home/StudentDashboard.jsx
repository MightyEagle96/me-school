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
        <div className="col-md-9 p-3">
           <div className="d-flex flex-wrap ">
             <div className="col-md-3 bg-white text-danger shadow-lg p-3 mr-3">
               <div className="d-flex justify-content-between">
                <div> <i class="fa fa-tasks" aria-hidden="true"></i></div>
                 <div className="h4">Performance Report</div>
               </div>
             </div>
             <div className="col-md-3 bg-white text-primary shadow-lg p-3  p-3 mr-3">
               <div className="d-flex justify-content-between">
                <div> 
               <i class="fas fa-pen    "></i>
                </div>
                 <div className="h4">Take a test</div>
               </div>
             </div>
             <div className="col-md-3  bg-white text-success shadow-lg p-3  p-3 mr-3">
               <div className="d-flex justify-content-between">
                <div> 
               <i class="fas fa-users"></i>
                </div>
                 <div className="h4">Class mates</div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
