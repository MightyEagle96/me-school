import React, { useState } from 'react';
import { MDBInput } from 'mdbreact';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './LoginPage.css';
import { httpService } from '../../data/services';

import Swal from 'sweetalert2';
import { IsLoading } from '../../assets/aesthetics/IsLoading';
import { loginRouting } from './routes';

export const LoginPage = () => {
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
      const path = 'auth/login';
      const res = await httpService.post(path, loginData);
      setLoading(false);
      if (res) {
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
        setLoading(false);
        Swal.fire({
          icon: 'success',
          titleText: 'Welcome',
          text: 'Logged in successfully',
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
    <div>
      <Navbar></Navbar>
      <section className="login">
        <div className="d-flex justify-content-center">
          <div className="shadow-lg rounded   ">
            <div className="card p-3">
              <div className="h3 mb-4 mt-4 text-center text-primary">
                Login Here
              </div>
              <hr className="bg-primary" />
              <form className="needs-validation" onSubmit={login} noValidate>
                {error ? (
                  <div className="alert alert-danger">
                    Password and Email are required
                  </div>
                ) : (
                  ''
                )}
                <div className="grey-text">
                  <MDBInput
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <div className="">
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleChange}
                      validate
                    />
                  </div>
                </div>
                <div class="row mb-4">
                  <div class="col d-flex justify-content-center">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="form1Example3"
                        checked
                      />
                      <label class="form-check-label" for="form1Example3">
                        {' '}
                        Remember me{' '}
                      </label>
                    </div>
                  </div>
                  <div class="col">
                    <a href="#!">Forgot password?</a>
                  </div>
                </div>
                <button className="btn btn-primary btn-block" type="submit">
                  {loading ? <IsLoading /> : 'LOGIN'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};
