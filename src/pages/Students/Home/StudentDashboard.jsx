import React from 'react';
import { loggedInUser } from '../../../data/services';
import './StudentDashboard.scss';

export default function StudentDashboard() {
  return (
    <div className="mr-2">
      <div className="jumbotron jumbotron-fluid studentBanner">
        <div className="container">
          <div className="display-4">Welcome, {loggedInUser.firstName}</div>
          <div></div>
        </div>
      </div>
      <div className="row text-center p-3">
        <div className="col-md-4 mb-4   p-3">
          <div className="display-4 text-info">
            <i class="fas fa-database    "></i>
          </div>
          <div className="h4 mt-3 mb-3" style={{ fontWeight: 100 }}>
            RELIABLE DATABASE
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            inventore vel ullam repellat magni debitis ducimus, nostrum
            accusantium quia. Quod quos nesciunt cupiditate obcaecati vero magni
            asperiores a quia unde.
          </div>
        </div>
        <div className="col-md-4 mb-4   p-3">
          <div className="display-4 text-warning">
            <i class="fas fa-pen    "></i>
          </div>
          <div className="h4 mt-3 mb-3" style={{ fontWeight: 100 }}>
            TESTS & EXAMINATIONS
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas qui
            natus at perferendis impedit incidunt obcaecati delectus dolore quod
            non expedita quos exercitationem voluptates libero dolores veniam
            earum, animi sapiente?
          </div>
        </div>
        <div className="col-md-4 mb-4   p-3">
          <div className="display-4 text-success">
            {/* <i class="fas fa-laptop    "></i> */}
            <i class="fas fa-desktop    "></i>
            {/* <i class="fas fa-mobile    "></i>
            <i class="fas fa-tablet-alt    "></i> */}
          </div>
          <div className="h4 mt-3 mb-3" style={{ fontWeight: 100 }}>
            INSTANT VIEW OF RESULTS
          </div>
          <div>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
            reprehenderit corporis facere dolorem, reiciendis vitae laboriosam
            animi eveniet similique. Voluptas ipsum possimus iste eveniet
            corporis error minus numquam enim ab?
          </div>
        </div>
      </div>
    </div>
  );
}
