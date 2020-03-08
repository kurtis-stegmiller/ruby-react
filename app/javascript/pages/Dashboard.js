import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

// Components
import Modal from "../components/Modal";
import EnterUrl from "../components/EnterUrl";
import Table from "../components/Table"; 

// Actions
import { handleSubmitUrl } from '../actions/dashboard';

const Dashboard = ({ history, handleSubmitUrl}) => {
  // Madal
  const [isOpenMadal, setIsOpenMadal] = useState(false);

  return (
    <Fragment>
      {/* Header */}
        <div className="header">
          <div className="header_logo" onClick={() => history.push("/")}>
            <div className="header_logo_images">
              <img src="/images/logo.svg" alt="" />
            </div>
            <div className="header_logo_text">Link shortener</div>
          </div>
          <div className="header_btnWrap">
            <button
              className="btn link"
              onClick={() => {
                localStorage.removeItem("token");
                history.push("/");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      {/* Header end */}

      {/* Enter url  */}
      <EnterUrl isDashboard={true} handleSubmit={handleSubmitUrl}/>
      {/* Enter url end */}

      {/* Table  */}
      <Table />
      {/* Table end */}

      {/* Simplify your links */}
      <div className="simplifyYourLinks">
        <img
          className="simplifyYourLinks-images"
          src="/images/logo.svg"
          alt="logo"
        />
        <div className="simplifyYourLinks-text">simplify your links</div>
      </div>
      {/* Simplify your links end */}

      {/* Modals */}
      <Modal open={isOpenMadal} close={() => setIsOpenMadal(false)}></Modal>
      {/* Modals end */}
    </Fragment>
  );
};


const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  handleSubmitUrl,
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
