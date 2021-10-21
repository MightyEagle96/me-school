import React, { useState } from "react";
import Swal from "sweetalert2";
import SideMenu from "../../components/SideMenu/SideMenu";
import { httpService, loggedInUser } from "../../data/services";

export default function ProfilePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const user = loggedInUser;

  const uploadPhoto = async () => {
    console.log(selectedFile);

    const formData = new FormData();
    formData.append("profilePhoto", selectedFile, selectedFile.name);

    const path = "/users/uploadPhoto";
    const res = await httpService.post(path, formData);
    if (res) {
      setSelectedFile(null);
      Swal.fire({
        icon: "success",
        title: "Profile photo updated",
        showConfirmButton: false,
        timer: 2000,
      });
      const path = "/users/me";
      const res = await httpService.get(path);
      if (res) {
        localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
        window.location.reload();
      }
    }
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-3">
          <SideMenu />
        </div>
        <div className="col-md-9 pr-3">
          <div className="d-flex flex-wrap">
            <div className="p-3 mt-3 col-md-3">
              <div className="h5">Name: {user.fullName}</div>
              <div className="h5">Email: {user.email}</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setSelectedFile(e.target.files[0]);
                }}
              />
              {selectedFile ? (
                <button className="btn btn-danger" onClick={uploadPhoto}>
                  Upload Photo{" "}
                  <span>
                    <i class="fa fa-camera" aria-hidden="true"></i>
                  </span>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
