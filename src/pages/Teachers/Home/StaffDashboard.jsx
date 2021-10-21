import React from "react";
import SideMenu from "../../../components/SideMenu/SideMenu";

export default function StaffDashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <SideMenu />
        </div>
        <div className="col-md-9 pr-4">
          <div className="mt-3">
            <div className="alert alert-info">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat,
              pariatur, nostrum consequatur recusandae quos libero illo fuga
              eaque modi at rem harum magni dolores maiores assumenda ab
              accusantium. Sint, doloribus!
            </div>
            <div className="card shadow-lg p-3">
              <div className="h3 text-right">Jss1 Class</div>
              <div className="row">
                <div className="col-md-4">
                  <div className="border border-dark p-3">
                    <div className="h3">
                      Class Reports <i class="fab fa-analytics    "></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}