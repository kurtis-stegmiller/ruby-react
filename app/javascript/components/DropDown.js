import useComponentVisible from "../hooks/useComponentVisible";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const DropDown = ({ handleselect, url }) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false);

  return (
    <div ref={ref}>
      <span className="dpowDown">
        <img
          onClick={() => setIsComponentVisible(true)}
          className={isComponentVisible ? "icon_info active" : "icon_info"}
          src="/images/right-arrow.svg"
          alt="info"
        />
        {isComponentVisible && (
          <div className="dpowDown_content">
            <CopyToClipboard text={url}>
              <div
                className="dpowDown_item"
                onClick={() => {
                  setIsComponentVisible(false);
                }}
              >
                <img
                  src="/images/link.svg"
                  alt="link"
                  className="dpowDown_item_icon"
                />
                Copy Link
              </div>
            </CopyToClipboard>
            <div
              className="dpowDown_item"
              onClick={() => {
                handleselect("fb");
                setIsComponentVisible(false);
              }}
            >
              <img
                src="/images/facebook.svg"
                alt="link"
                className="dpowDown_item_icon"
              />
              Facebook
            </div>
            <div
              className="dpowDown_item"
              onClick={() => {
                handleselect("tw");
                setIsComponentVisible(false);
              }}
            >
              <img
                src="/images/twitter.svg"
                alt="link"
                className="dpowDown_item_icon"
              />
              Twitter
            </div>
            <div
              className="dpowDown_item"
              onClick={() => {
                handleselect("ln");
                setIsComponentVisible(false);
              }}
            >
              <img
                src="/images/linkedin.svg"
                alt="link"
                className="dpowDown_item_icon"
              />
              Linkedin
            </div>
          </div>
        )}
      </span>
    </div>
  );
};

export default DropDown;
