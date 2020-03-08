import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import Modal from "../../components/Modal";
import EnterUrl from "../../components/EnterUrl";
import Table from "../../components/Table"; 

// Actions
import { handleSubmitUrl, handleKeywordLookup, handleShortLink, getKeywords, resetIsKeywordAvailable } from '../../actions/dashboard';
import { logout } from '../../actions/auth';

const Dashboard = ({ logout, history, handleSubmitUrl, currentUser, handleShortLink, handleKeywordLookup, isKeywordAvailable, isKeywordUnavailable, isShortedLink, getKeywords}) => {
  // Madal
  const [isOpenMadal, setIsOpenMadal] = useState(false);
  const [isOpenSubscriptionMadal, setIsOpenSubscriptionMadal] = useState(false);

  const makeShortLink = () => {
    if(localStorage.getItem("url") && localStorage.getItem("keyword") && localStorage.getItem("description")) {
      setIsOpenSubscriptionMadal(true)
      handleShortLink({
        url: localStorage.getItem("url"),
        keyword: localStorage.getItem("keyword"),
        description: localStorage.getItem("description")
      })
      localStorage.removeItem("url")
      localStorage.removeItem("keyword")
      localStorage.removeItem("description")
    }
  }

  useEffect(() => {
    makeShortLink()
  }, [])

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
              className="btn auth"
              onClick={() => {
                  logout({history: history});
                  window.localStorage.removeItem("SubscriptionsModal");
                }
              }
            >
              Logout
            </button>
          </div>
        </div>
      {/* Header end */}

      {/* Enter url  */}
      <EnterUrl isDashboard={true}
        handleSubmit={handleSubmitUrl}
        handleKeywordLookup={handleKeywordLookup}
        handleShortLink={handleShortLink}
        // isKeywordAvailable={isKeywordAvailable}
        // isKeywordUnavailable={isKeywordUnavailable}
        isShortedLink={isShortedLink}
        currentUser={currentUser}
        getKeywords={getKeywords}
       />
      {/* Enter url end */}

      {/* Table  */}
      <Table history={history} isOpenSubscriptionMadal={isOpenSubscriptionMadal}/>
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
  currentUser: state.auth.currentUser,
  // isKeywordAvailable: state.dashboard.isKeywordAvailable,
  // isKeywordUnavailable: state.dashboard.isKeywordUnavailable,
  isShortedLink: state.dashboard.isShortedLink
});

Dashboard.propTypes = {
  logout:PropTypes.func,
  currentUser:PropTypes.object,
  handleKeywordLookup: PropTypes.func,
  handleShortLink: PropTypes.func,
  // isKeywordAvailable: PropTypes.bool,
  // isKeywordUnavailable: PropTypes.bool,
  isShortedLink: PropTypes.bool,
  getKeywords: PropTypes.func
};

const mapDispatchToProps = {
  handleSubmitUrl,
  logout,
  handleKeywordLookup,
  handleShortLink,
  getKeywords
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
