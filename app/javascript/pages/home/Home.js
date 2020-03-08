import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import Modal from "../../components/Modal";
import AuthTab from "../../components/AuthTab";
import EnterUrl from "../../components/EnterUrl";

// Actions 
import { auth, reg, setIsOpenMadal } from '../../actions/auth'
import { handleSubmitUrl, handleKeywordLookup, handleShortLink } from '../../actions/dashboard'

const Home = ({
  auth, reg, currentUser, isOpenMadal, setIsOpenMadal, history,
  handleSubmitUrl, handleKeywordLookup, handleShortLink,
  isKeywordAvailable, isKeywordUnavailable, isShortedLink,
  registerErrorMessage, loginErrorMessage
}) => {

  // Madal auth / register
  // const [isOpenMadal, setIsOpenMadal] = useState(false);
  const [modalType, setModalType] = useState("Login"); // Login, Register
  // const currentUser = useState("Login");

  return (
    <Fragment>
      {/* Header */}
        <div className="header">
          <div className="header_logo">
            <div className="header_logo_images">
              <img src="/images/logo.svg" alt="" />
            </div>
            <div className="header_logo_text">Link shortener</div>
          </div>
          <div className="header_btnWrap">
            <button
              className="btn auth"
              onClick={() => {
                setIsOpenMadal(true);
                setModalType("Login");
              }}
            >
              Login
            </button>
            <button
              className="btn auth"
              onClick={() => {
                setIsOpenMadal(true);
                setModalType("Register");
              }}
            >
              Register
            </button>
          </div>
        </div>
      {/* Header end */}

      {/* Baner */}
      <img className="baner" src="/images/banner.gif" alt="banner" />
      {/* Baner end */}

      {/* Enter url  */}
      <EnterUrl modelOpen={type => {
          setIsOpenMadal(true);
          setModalType(type);
      }}
      handleKeywordLookup={handleKeywordLookup}
      handleSubmit={handleSubmitUrl}
      handleShortLink={handleShortLink}
      isShortedLink={isShortedLink}
      currentUser={currentUser}
      />
      {/* Enter url end */}

      {/* Info */}
      <div className="wrap-info">
        <div className="info">
          <div className="info_title">PROFIT FROM EVERY TAP AND CLICK.</div>
          <div className="info_description">
            Immediately increase your response rate for radio, print, tv and
            billboard ads. Brand, track and optimize every touchpoint as easy as
            1-2-3 with Switzerland's leading link management platform.
          </div>
        </div>
        <div className="info">
          <div className="info_description">
            "Branded, Memorable, Vanity Links Drive up to 34% Higher CTR
            Compared to Standard Short Links." <br />
            <br />* bit.ly research
          </div>
        </div>
      </div>
      {/* Info end*/}

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

      <Modal open={isOpenMadal} close={() => setIsOpenMadal(false)}>
        <AuthTab 
          modalType={modalType}
          history={history}
          auth={auth}
          reg={reg}
          loginErrorMessage={loginErrorMessage}
          registerErrorMessage={registerErrorMessage}
        >
        </AuthTab>
      </Modal>
      {/* Modals end */}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    isOpenMadal: state.auth.isOpenMadal,
    isKeywordAvailable: state.dashboard.isKeywordAvailable,
    isKeywordUnavailable: state.dashboard.isKeywordUnavailable,
    isShortedLink: state.dashboard.isShortedLink,
    registerErrorMessage: state.auth.registerErrorMessage,
    loginErrorMessage: state.auth.loginErrorMessage
  }
};

const mapDispatchToProps = {
  auth,
  reg,
  handleSubmitUrl,
  setIsOpenMadal,
  handleKeywordLookup,
  handleShortLink
};

Home.propTypes = {
  auth:PropTypes.func,
  reg:PropTypes.func,
  handleSubmitUrl:PropTypes.func,
  currentUser:PropTypes.object,
  isOpenMadal:PropTypes.bool,
  setIsOpenMadal:PropTypes.func,
  handleKeywordLookup: PropTypes.func,
  handleShortLink: PropTypes.func,
  isKeywordAvailable: PropTypes.bool,
  isKeywordUnavailable: PropTypes.bool,
  isShortedLink: PropTypes.bool
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
