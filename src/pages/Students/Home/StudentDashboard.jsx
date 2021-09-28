import React from 'react';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { StudentSideMenu } from '../../../components/SideMenu/StudentSideMenu/StudentSideMenu';

export default function StudentDashboard() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col-md-3">
          <StudentSideMenu />
        </div>
        <div className="col-md-9"></div>
      </div>
      <Footer></Footer>
    </div>
  );
}
