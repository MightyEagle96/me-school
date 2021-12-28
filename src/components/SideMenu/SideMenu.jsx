import React, { useState, useEffect } from 'react';
import { backendUrl, loggedInUser } from '../../data/services';
import './SideMenu.scss';
import maleAvatar from '../../assets/images/avatars/maleDefault.png';
import femaleAvatar from '../../assets/images/avatars/femaleDefault.jpeg';

import SideMenuLinks from './SideMenuLinks';

export default function SideMenu() {
  const [size, setSize] = useState(window.innerWidth);
  const [mobileMenu, setMobileMenu] = useState(false);

  function checkSize() {
    setSize(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', checkSize);
  }, []);
  let avatar;
  if (loggedInUser) {
    if (loggedInUser.imageUrl) {
      avatar = `${backendUrl}/images/${loggedInUser.imageUrl}`;
    } else {
      loggedInUser.gender === 'male'
        ? (avatar = maleAvatar)
        : (avatar = femaleAvatar);
    }
  }

  return (
    <div>
      {size > 990 ? (
        <div className="shadow-lg rounded">
          <div className="p-4 sideMenu text-primary">
            <div className="mb-4 mt-4">
              <div className="text-center ">
                <img
                  className="avatar"
                  src={avatar}
                  alt={loggedInUser.fullName}
                />
              </div>
              <hr className="bg-white" />
            </div>
            <div>
              <SideMenuLinks />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {mobileMenu ? (
            <div
              className="mobileMenu"
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            >
              <div className=" pt-5 pb-5">
                <SideMenuLinks />
              </div>
            </div>
          ) : (
            <div
              style={{ color: 'black', fontSize: 20 }}
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            >
              <div className="hamIcon shadow-lg">
                <div className="text-center">
                  <i class="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
