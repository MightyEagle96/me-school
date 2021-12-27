import React, { useState, useEffect } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse,
} from 'mdb-react-ui-kit';

import { backendUrl, dataService, loggedInUser } from '../../data/services';
import Swal from 'sweetalert2';
import './Navbar.scss';
export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(dataService.loggedInUser());
  }, []);

  const logout = () => {
    dataService.logout().catch(() =>
      Swal.fire({
        iconColor: 'red',
        icon: 'error',
        titleText: 'Logout error',
        text: 'There is a network related issue, please try again later',
      })
    );
  };
  return (
    <MDBNavbar expand="lg" light bgColor="white">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">
          <div className="h5 text-primary d-flex align-items-center">
            ME-SCHOOL{' '}
            <span>
              <i className="fab fa-phoenix-framework "></i>
            </span>
          </div>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              {user && user.role === 'user' ? (
                <MDBNavbarLink active aria-current="page" href="/user">
                  Home
                </MDBNavbarLink>
              ) : (
                <MDBNavbarLink active aria-current="page" href="/">
                  Home
                </MDBNavbarLink>
              )}
            </MDBNavbarItem>
            <MDBNavbarItem>
              {/* <MDBNavbarLink href="#">Link</MDBNavbarLink> */}
            </MDBNavbarItem>

            <MDBNavbarItem></MDBNavbarItem>

            <MDBNavbarItem>
              {/* <MDBNavbarLink
                disabled
                href="#"
                tabIndex={-1}
                aria-disabled="true"
              >
                Disabled
              </MDBNavbarLink> */}
            </MDBNavbarItem>
          </MDBNavbarNav>

          {user ? (
            <div className="d-flex w-auto ms-auto">
              <MDBNavbarNav>
                <MDBNavbarItem>
                  <MDBNavbarLink className="waves-effect waves-light" to="#!">
                    <img
                      src={
                        `${backendUrl}/images/${loggedInUser.imageUrl}` || ''
                      }
                      className="navbarImg"
                    />
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link">
                    {user.lastName}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    {user.role !== 'user' ? (
                      <MDBDropdownItem>
                        <MDBDropdownLink href="/profile">
                          {' '}
                          My Profile
                        </MDBDropdownLink>
                      </MDBDropdownItem>
                    ) : (
                      ''
                    )}
                    <MDBDropdownItem>
                      <MDBDropdownLink>Another action</MDBDropdownLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem>
                      <MDBDropdownLink>Something else here</MDBDropdownLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
                <MDBNavbarLink style={{ cursor: 'pointer' }} onClick={logout}>
                  Logout
                </MDBNavbarLink>
              </MDBNavbarNav>
            </div>
          ) : (
            <div className="d-flex w-auto ms-auto">
              <MDBNavbarNav>
                {/* <MDBNavbarLink href="/login">Login</MDBNavbarLink>
                <MDBNavbarLink href="/signUp">Register</MDBNavbarLink> */}
              </MDBNavbarNav>
            </div>
          )}
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
