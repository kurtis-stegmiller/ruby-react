import React, { useState, useEffect } from "react";

// Components
import LoginForm from "./Forms/LoginForm";
import RegisterForm from "./Forms/RegisterForm";

const AuthTab = ({ modalType, history, auth, reg, registerErrorMessage, loginErrorMessage}) => {
  const [tab, setTab] = useState(true);

  useEffect(() => {
    modalType === "Login" ? setTab(true) : setTab(false);
  }, [modalType]);

  const hendleSubmitLoginForm = ({ email, password }) => {
    auth({ email, password, history})   
  };

  const hendleSubmitRegisterForm = ({ email, password }) => {
    reg({ email, password, history})
  };

  return (
    <div className="authTab">
      <div className="authTab_header">
        <button
          className={`btn tab ${tab && "active"}`}
          onClick={() => setTab(true)}
        >
          Login
        </button>
        <button
          className={`btn tab ${!tab && "active"}`}
          onClick={() => setTab(false)}
        >
          Register
        </button>
      </div>
      <div className="authTab_content">
        {tab ? (
          <LoginForm hendleSubmit={hendleSubmitLoginForm} loginErrorMessage={loginErrorMessage} />
        ) : (
          <RegisterForm hendleSubmit={hendleSubmitRegisterForm} registerErrorMessage={registerErrorMessage} />
        )}
      </div>
    </div>
  );
};

export default AuthTab;
