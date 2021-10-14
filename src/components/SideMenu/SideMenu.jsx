import React, { useState } from "react";
import { backendUrl, loggedInUser } from "../../data/services";
import "./SideMenu.scss";
import maleAvatar from "../../assets/images/avatars/maleDefault.png";
import femaleAvatar from "../../assets/images/avatars/femaleDefault.jpeg";

export default function SideMenu() {
  const [selectedFile, setSelectedFile] = useState(null);

  let avatar;
  if (loggedInUser) {
    if (loggedInUser.imageUrl) {
      avatar = `${backendUrl}/images/${loggedInUser.imageUrl}`;
    } else {
      loggedInUser.gender === "male"
        ? (avatar = maleAvatar)
        : (avatar = femaleAvatar);
    }
  }
  return (
    <div className="shadow-lg">
      <div className="p-4 sideMenu text-white">
        <div className="mb-4 mt-4">
          <div className="text-center ">
            <img className="avatar" src={avatar} />
          </div>
          <hr className="bg-white" />
        </div>
        <div>
          <ul class="staffList mb-5">
            <li className="mb-4  ">
              <a href="/studentHome">
                <span class="fa fa-home mr-3"></span> Home
              </a>
            </li>
            {/* Student menu */}
            {loggedInUser && loggedInUser.role === "student" ? (
              <div>
                {" "}
                <li className=" mb-4 ">
                  <a href="/registerSubject">
                    <span class="fa fa-briefcase mr-3"></span> Registered
                    Subjects
                  </a>
                </li>
                <li className="mb-4  ">
                  <a href="/testChoice">
                    <span class="fa fa-sticky-note mr-3"></span> Take tests or
                    exams
                  </a>
                </li>
                <li className="mb-4  ">
                  <a href="/testChoice">
                    <span class="fa fa-sticky-note mr-3"></span> View Results
                  </a>
                </li>{" "}
              </div>
            ) : (
              ""
            )}
            {loggedInUser && loggedInUser.role === "classTeacher" ? (
              <div>
                <li className="mb-4  ">
                  <a href="#">
                    <span class="fa fa-paper-plane mr-3"></span> Class Record
                  </a>
                </li>
              </div>
            ) : (
              ""
            )}
            {loggedInUser &&
            (loggedInUser.role === "classTeacher" ||
              loggedInUser.role === "teacher") ? (
              <div>
                {" "}
                <li className=" mb-4 ">
                  <a href="/chooseExamToSet">
                    <span class="fa fa-briefcase mr-3"></span> Set Exams
                  </a>
                </li>
                <li className="mb-4  ">
                  <a href="#">
                    <span class="fa fa-sticky-note mr-3"></span> Student's
                    Performance
                  </a>
                </li>
              </div>
            ) : (
              ""
            )}

            <li className="mb-4  ">
              <a href="#">
                <span class="fa fa-paper-plane mr-3"></span> Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
