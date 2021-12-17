import React from 'react';
import './Footer.scss';
import footerLogo from '../../assets/images/eagleLogo3.png';

export default function Footer() {
  return (
    <div>
      <footer className="mt-5 footerColor  text-white">
        <div className="row text-center">
          <div className="col-md-4">
            <img src={footerLogo} className="footerLogo" />
          </div>
          <div className="col-md-4">
            <div className="  mt-5">
              <p>The Mighty Eagle Corp</p>
              <p>T.A Benson Cresent Utako</p>
              <p>Abuja, Nigeria</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mt-5">
              <p>
                <i class="fab fa-google   mr-3 "></i>
                mightyeaglecorp@gmail.com
              </p>
              <p>
                <i class="fas fa-phone   mr-3 "></i> 08131065776
              </p>
              <p>
                <i class="fab fa-facebook-f    mr-3"></i> Eagle D Ikechukwu
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 text-center">
          {/* <div className="border border-top border-white ml-5 mr-5 mb-4"></div> */}
          <i class="fas fa-copyright    "></i>{' '}
          {`All rights reserved. ${new Date().getFullYear()}`}
        </div>
      </footer>
    </div>
  );
}
