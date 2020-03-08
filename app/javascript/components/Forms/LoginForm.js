import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { resetLoginErrorMessage } from "../../actions/auth"

const LoginForm = ({ hendleSubmit, loginErrorMessage, resetLoginErrorMessage }) => {

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");


  useEffect(() => {
    loginErrorMessage === "Invalid Email." && setEmailErrorMessage(loginErrorMessage)
    loginErrorMessage === "Invalid password" && setPasswordErrorMessage(loginErrorMessage)
    resetLoginErrorMessage()
  }, [loginErrorMessage])

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
      {({ errors, touched, setFieldValue }) => (
        <Form>
          <div className="wrapInput">
            <img src="/images/envelope.svg" alt="envelope" />
            <Field
              type="text"
              name="email"
              placeholder="Your email"
              className="input_auth"
              onChange={e => {
                setEmailErrorMessage("")
                setPasswordErrorMessage("")
                setFieldValue('email', e.target.value)
              }}
            />
            <ErrorMessage
              name="email"
              render={(msg) => <div className="error_input">{msg}</div>}
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
              onChange={e => {
                setEmailErrorMessage("")
                setPasswordErrorMessage("")
                setFieldValue('password', e.target.value)
              }}
            />

            <ErrorMessage
              name="password"
              render={(msg) => <div className="error_input">{msg}</div>}
            ></ErrorMessage>
            {passwordErrorMessage !== "" &&  (
              <div className="error_input">{passwordErrorMessage}</div>
              )}
          </div>
          <div className="space50" />

          <button type="submit" className="btn default">
            Login
          </button>
          <div className="forgotPassword">Forgot Password?</div>
        </Form>
      )}
    </Formik>
  );
};

const Validation = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Enter your email'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at max 8 characters')
    .required('Enter your password')
});

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = {
  resetLoginErrorMessage
}

LoginForm.propTypes = {
  resetLoginErrorMessage: PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
