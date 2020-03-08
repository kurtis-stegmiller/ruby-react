import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import Modal from "./Modal";
import Subscriptions from "./Subscriptions";
import { resetIsKeywordAvailable, resetIsShortedLink } from "../actions/dashboard"

const EnterUrl = ({ 
    currentUser, handleSubmit, isDashboard,
    modelOpen, handleKeywordLookup, handleShortLink,
    isKeywordAvailable, isKeywordUnavailable, isShortedLink, getKeywords,
    resetIsKeywordAvailable, resetIsShortedLink
  }) => {
  const [url, setUrl] = useState("");
  const [confirmUrl, setConfirmUrl] = useState(false);
  // const [alert, setAlert] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [description, setDescription] = useState("");
  const [isOpenMadal, setIsOpenMadal] = useState(false);
  useEffect(() => {
    if(isKeywordAvailable && isDashboard) {
      setIsOpenMadal(true)
      handleShortLink({
        url: url,
        keyword: keyword,
        description: description
      })
      resetIsKeywordAvailable()
    }
  }, [isKeywordAvailable])

  useEffect(() => {
    if(isShortedLink) {
       isDashboard && getKeywords()
       resetIsShortedLink()
     }
  }, [isShortedLink])

  const checkUrl = url => {
    // eslint-disable-next-line
    const result = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
      url
    );
    result && url.length ? setConfirmUrl(true) : setConfirmUrl(false);
  };

  const checkKeywordDescription = () => {
    if (confirmUrl && keyword) {
      // setAlert(true);
      handleKeywordLookup({
        url,
        keyword,
        description
      })
    } else {
      setAlert(false);
    }
  };

  const storeValues = () => {
    localStorage.setItem("url", url)
    localStorage.setItem("keyword", keyword)
    localStorage.setItem("description", description)
    return true
  }

  return (
    <Fragment>
      <div className="enterUrl">
        <div className="enterUrl_wrapInputs">
          <input
            placeholder="Enter Original URL..."
            className="input-default "
            value={url}
            onChange={e => {
              setUrl(e.target.value);
              checkUrl(e.target.value);
            }}
          />
          {confirmUrl && (
            <div className="enterUrl_wrapActionInputs">
              <input
                placeholder="Enter Keyword..."
                className="input-default "
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
              />
              <input
                placeholder="Enter Description..."
                className="input-default "
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          )}
        </div>
        <button
          className="btn default"
          disabled={!confirmUrl}
          onClick={confirmUrl ? checkKeywordDescription : checkUrl}
        >
          Shorten URL
        </button>
      </div>
      {isKeywordAvailable && !isDashboard && storeValues() && (
        <div className="enterUrl_alert">
          Congratulations, this keyword is available. Please{" "}
          {/* eslint-disable-next-line */}
          <a onClick={()=>modelOpen('Login')}>Login</a> /{" "}
          {/* eslint-disable-next-line */}
          <a onClick={()=>modelOpen('Register')}>Register</a>
        </div>
      )}
      {isKeywordUnavailable && (
        <div className="enterUrl_alert">
          This vanity word is already taken
        </div>
      )}

      {/* Modals */}
      <Modal
        open={isOpenMadal}
        close={() => setIsOpenMadal(false)}
        customClass={"SubscriptionsModal"}
      >
          <Subscriptions />
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  // currentUser: state.auth.currentUser,
  isKeywordAvailable: state.dashboard.isKeywordAvailable,
  isKeywordUnavailable: state.dashboard.isKeywordUnavailable,
  // isShortedLink: state.dashboard.isShortedLink
});

const mapDispatchToProps = {
  resetIsKeywordAvailable,
  resetIsShortedLink
}


EnterUrl.propTypes = {
  currentUser: PropTypes.object,
  handleSubmit: PropTypes.func,
  modelOpen: PropTypes.func,
  isDashboard: PropTypes.bool,
  handleKeywordLookup: PropTypes.func,
  handleShortLink: PropTypes.func,
  isKeywordAvailable: PropTypes.bool,
  isKeywordUnavailable: PropTypes.bool,
  isShortedLink: PropTypes.bool,
  resetIsKeywordAvailable: PropTypes.func,
  resetIsShortedLink: PropTypes.func,
  getKeywords: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterUrl);
