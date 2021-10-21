import React, { useState } from "react";
import { MDBInput } from "mdbreact";
import "./HomePage.scss";
import logo from "../../assets/images/homeLogo.svg";
import { httpService } from "../../data/services";
import Swal from "sweetalert2";
import { IsLoading } from "../../assets/aesthetics/IsLoading";
import { loginRouting } from "../Auth/routes";

const HomePage = () => {
  const defaultData = {};
  const [loginData, setLoginData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    } else {
      setLoading(true);
      const path = "auth/login";
      const res = await httpService.post(path, loginData);
      setLoading(false);
      if (res) {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
        setLoading(false);
        Swal.fire({
          icon: "success",
          titleText: "Welcome",
          text: "Logged in successfully",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          loginRouting(res.data.user.role);
        });
      } else {
      }
    }
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <img src={logo} className="img-fluid" />
      </div>
      <div className="col-md-6  d-flex align-items-center justify-content-center">
        <div>
          <div className="mb-4 h2 text-primary">Login into your account</div>
          <div className="grey-text mt-4">
            <MDBInput
              icon="envelope"
              group
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              validate
              error="wrong"
              success="right"
              label="Enter your email"
            />
            <MDBInput
              label="Enter your password"
              icon="lock"
              group
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              validate
            />
            <div>
              <button
                className="btn btn-primary btn-block"
                type="submit"
                onClick={login}
              >
                {loading ? <IsLoading show={loading} /> : "LOGIN"}
              </button>
              <p className="text-primary mt-4">
                Don't have an account{" "}
                <span className="text-danger">Sign Up</span>
              </p>
            </div>
            <div>
              <em>
                <b>
                  Powered by the <strong>MIGHTY EAGLE CORP</strong>
                </b>
              </em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
