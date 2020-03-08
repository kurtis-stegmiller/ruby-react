import React, { useState, useEffect }  from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";

import { resetRegisterErrorMessage } from "../../actions/auth"

const RegisterForm = ({ hendleSubmit, registerErrorMessage, resetRegisterErrorMessage  }) => {

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  useEffect(() => {
    registerErrorMessage.hasOwnProperty("email") && setEmailErrorMessage("The email address already exists")
    registerErrorMessage.hasOwnProperty("password") && setPasswordErrorMessage("The password is invalid")
    resetRegisterErrorMessage()
  }, [registerErrorMessage])

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Validation}
      onSubmit={values =>
        hendleSubmit({
          email: values.email,
          password: values.password
        })
      }
    >
      {() => (
        <Form>
          <div className="wrapInput">
            <img src="/images/envelope.svg" alt="envelope" />
            <Field
              type="text"
              name="email"
              placeholder="Your email"
              className="input_auth"
            />
            <ErrorMessage
              name="email"
              render={msg => <div className="error_input">{msg}</div>}
            ></ErrorMessage>
            {emailErrorMessage !== "" &&  (
              <div className="error_input">{emailErrorMessage}</div>
              )}
          </div>

          <div className="space68" />
          <div className="wrapInput">
            <img src="/images/key.svg" alt="key" />
            <Field
              type="password"
              name="password"
              placeholder="Your Password"
              className="input_auth"
            />

            <ErrorMessage
              name="password"
              render={msg => <div className="error_input">{msg}</div>}
            ></ErrorMessage>
            {passwordErrorMessage !== "" &&  (
              <div className="error_input">{passwordErrorMessage}</div>
              )}
          </div>
          <div className="space50" />

          <button type="submit" className="btn default">
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

const Validation = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Enter your email"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at max 8 characters")
    .required("Enter your password")
});


const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = {
  resetRegisterErrorMessage
}

RegisterForm.propTypes = {
  resetRegisterErrorMessage: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
