import React, { useState } from 'react';

import Navbar from '../../components/Navbar/Navbar';

import './SignUpPage.css';
import { httpService } from '../../data/services';
import Swal from 'sweetalert2';

import { IsLoading } from '../../assets/aesthetics/IsLoading';

import { MDBInput } from 'mdbreact';
import Footer from '../../components/Footer/Footer';

export const SignUpPage = () => {
  const [formData, setFormData] = useState({ account_type: 'me-school' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUp = (e) => {
    e.preventDefault();
    setLoading(true);
    const path = 'auth/signUp';
    httpService
      .post(path, formData)
      .then((res) => {
        if (res) {
          setLoading(false);
          localStorage.setItem('token', res.data.accessToken);
          localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
          Swal.fire({
            icon: 'success',
            text: 'Account created',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => window.location.assign('/user'));
        }
      })
      .catch((err) => console.log('Glory '));
  };

  return (
    <div>
      <Navbar></Navbar>
      <section className="signUp">
        <div className="d-flex justify-content-center">
          <div className="shadow-lg rounded">
            <div className="card p-3">
              <div className="h3 mb-4 mt-4 text-center text-primary">
                Create new account
              </div>
              <hr className="text-primary" />
              <form className="needs-validation" onSubmit={signUp} noValidate>
                <div className="grey-text p-5">
                  <div className="row">
                    <div className="col-md-6">
                      <MDBInput
                        label="Enter your first name"
                        icon="user"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <MDBInput
                        label="Enter your last name"
                        icon="user"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <MDBInput
                        label="Type your email"
                        icon="envelope"
                        group
                        type="email"
                        validate
                        error="wrong"
                        success="right"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <MDBInput
                        label="Enter your phone number"
                        icon="phone"
                        group
                        type="number"
                        validate
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <MDBInput
                        label="Type your password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <MDBInput
                        label="Confirm your password"
                        icon="key"
                        group
                        type="password"
                        validate
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <MDBInput
                    label="Enter your home address"
                    icon="home"
                    group
                    type="textarea"
                    validate
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />

                  <button type="submit" className="btn btn-primary btn-block">
                    {loading ? <IsLoading /> : 'create account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};
