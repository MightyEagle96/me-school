import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAlert } from 'react-alert';
import { httpService, loggedInUser } from '../../data/services';
import { IsLoading } from '../../assets/aesthetics/IsLoading';
import AvatarEditor from 'react-avatar-editor';

export default function ProfilePage() {
  const alert = useAlert();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = loggedInUser;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const uploadPhoto = async () => {
    if (selectedFile.size > 1_000_000) {
      return Swal.fire({ icon: 'error', title: 'File is larger than 1Mb' });
    } else {
      const formData = new FormData();
      formData.append('profilePhoto', selectedFile, selectedFile.name);

      const path = '/users/uploadPhoto';
      const res = await httpService.post(path, formData);
      if (res) {
        setSelectedFile(null);
        Swal.fire({
          icon: 'success',
          title: 'Profile photo updated',
          showConfirmButton: false,
          timer: 2000,
        });
        const path = '/users/me';
        const res = await httpService.get(path);
        if (res) {
          localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
          window.location.reload();
        }
      }
    }
  };

  async function updatePassword() {
    setLoading(true);
    const path = 'users/updatePassword';
    const res = await httpService.post(path, loginData);
    if (res) {
      setLoading(false);
      if (res.data.success) {
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ ...loggedInUser, isNewAccount: false })
        );
        window.location.reload();
        Swal.fire({ icon: 'success', text: res.data.success });
      } else Swal.fire({ icon: 'error', text: res.data.failed });
    } else {
      setLoading(false);
      alert.error('Error in making request');
    }
  }
  return (
    <div>
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
            <div>
              <AvatarEditor
                image={selectedFile}
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.4]} // RGBA
                scale={1.0}
                rotate={0}
              />
              <button className="btn btn-danger" onClick={uploadPhoto}>
                Upload Photo{' '}
                <span>
                  <i class="fa fa-camera" aria-hidden="true"></i>
                </span>
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="P-3">
        <div className="col-md-4 border p-3 border-dark">
          <div className="h3">Update your password</div>
          <div className="input-group mb-3 mt-3">
            <div className="input-group-prepend">
              <input
                type={showPassword ? 'text' : 'password'}
                name="oldPassword"
                id=""
                aria-describedby="password"
                className="form-control passwordField"
                value={loginData.oldPassword}
                onChange={handleChange}
                placeholder="Old password"
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {!showPassword ? (
                    <i class="fas fa-eye    "></i>
                  ) : (
                    <i class="fas fa-eye-slash    "></i>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <input
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                id=""
                placeholder="New password"
                aria-describedby="password"
                className="form-control passwordField"
                value={loginData.newPassword}
                onChange={handleChange}
              />
              <div className="input-group-append">
                <span
                  className="input-group-text"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {!showPassword ? (
                    <i class="fas fa-eye    "></i>
                  ) : (
                    <i class="fas fa-eye-slash    "></i>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div>
            <button className="btn btn-primary" onClick={updatePassword}>
              {loading ? (
                <IsLoading show={loading} color={'text-white'} />
              ) : (
                'Update Password'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
