import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as yup from "yup";

const EditModal = ({
  editItemId,
  editItemValue,
  close,
  text,
  description,
  handleSubmit,
  buttonText,
  expiredModal,
  placeholder,
  inputName
}) => {
  return (
    <Fragment>
      <div className="modalTable_header">
        {text}
        <div className="close_icon" onClick={close} />
      </div>

      {inputName ? (
        <Formik
          initialValues={{
            [inputName]: editItemValue
          }}
          validationSchema={() => Validation(inputName)}
          onSubmit={value => {
            handleSubmit({ id: editItemId, value: value[inputName] });
            close();
          }}
        >
          {() => (
            <Form className="modalTable_content">
              {description && (
                <div className="modalTable_description">{description}</div>
              )}

              {editItemValue !== undefined && (
                <div className="modalTable_input_wrap">
                  <Field
                    type="text"
                    placeholder={placeholder}
                    name={inputName}
                    className="input-default"
                  />
                  <ErrorMessage
                    name={inputName}
                    render={msg => <div className="error_input">{msg}</div>}
                  ></ErrorMessage>
                </div>
              )}

              <button className="btn default" type="submit">
                {buttonText}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <Fragment>
          <div className="modalTable_content">
            {description && (
              <div className="modalTable_description">{description}</div>
            )}

            {expiredModal ? (
              <div className="wrapExpiredBtn">
                <button
                  className="btn link"
                  onClick={e => {
                    e.preventDefault();
                    close();
                  }}
                >
                  No
                </button>
                <button
                  className="btn default"
                  onClick={() => {
                    handleSubmit({ id: editItemId });
                    close();
                  }}
                >
                  {buttonText}
                </button>
              </div>
            ) : (
              <button
                className="btn default"
                type="submit"
                onClick={() => {
                  handleSubmit({ id: editItemId });
                  close();
                }}
              >
                {buttonText}
              </button>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
const Validation = inputName => {
  if (inputName === "url") {
    return yup.object().shape({
      url: yup
        .string()
        .required()
        .matches(
          // eslint-disable-next-line
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
          "the url is incorrect"
        )
        .min(2)
    });
  }
  return yup.object().shape({
    [inputName]: yup
      .string()
      .required()
      .min(2)
  });
};

EditModal.propTypes = {
  editItem: PropTypes.object,
  close: PropTypes.func,
  placeholder: PropTypes.string,
  inputName: PropTypes.string,
  text: PropTypes.string,
  description: PropTypes.string,
  handleSubmit: PropTypes.func,
  buttonText: PropTypes.string
};

export default EditModal;
