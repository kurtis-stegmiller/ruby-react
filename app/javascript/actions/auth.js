import API from '../helpers/API'
import { successCode } from '../helpers/constants'
import { handleShortLink } from './dashboard'

const ACTIONS = {
  // login
  LOGIN_PROGRESS: "LOGIN_PROGRESS",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",

  // register
  REGISTER_PROGRESS: "REGISTER_PROGRESS",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILED: "REGISTER_FAILED",

  // register
  LOGOUT_PROGRESS: "LOGOUT_PROGRESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILED: "LOGOUT_FAILED",
}

const updateStatus = (status, statusInfo) => {
  return {
    type: status,
    data: statusInfo
  }
}

export const auth = ({ email, password, history}) => {

  return async (dispatch) => {
    dispatch(updateStatus(ACTIONS.LOGIN_PROGRESS))
    try {
      const result = await API.login({
        user: {
          email: email,
          password: password
        }
      });
      if (result.status === successCode) {
        dispatch(updateStatus(ACTIONS.LOGIN_SUCCESS, result.data))
        dispatch({type: "RESET_IS_KEYWORD_AVAILABLE", data: ""})
        history.push('/dashdoard')
      }
      else {
        dispatch(updateStatus(ACTIONS.LOGIN_FAILED, result.data))
      }
    } catch (err) {
      dispatch(updateStatus(ACTIONS.LOGIN_FAILED, err));
      return err;
    }
  }
};

export const reg = ({ email, password, history}) => {
  // TODO: fetch reg 
  // dispatch(auth({email, password, history}))
  return async (dispatch) => {
    dispatch(updateStatus(ACTIONS.REGISTER_PROGRESS))
    try {
      const result = await API.register({
        user: {
          email: email,
          password: password
        }
      });
      if (result.status === successCode) {
        dispatch(updateStatus(ACTIONS.REGISTER_SUCCESS, result.data))
        history.push('/dashdoard')
      }
      else {
        dispatch(updateStatus(ACTIONS.REGISTER_FAILED, result.data))
      }
    } catch (err) {
      dispatch(updateStatus(ACTIONS.REGISTER_FAILED, err));
      return err;
    }
  }
};

export const logout = ({history}) => {

  // TODO: fetch reg 
  // dispatch(auth({email, password, history}))
  return async (dispatch) => {
    dispatch(updateStatus(ACTIONS.LOGOUT_PROGRESS))
    try {
      const result = await API.logout();
      if (result.status === successCode) {
        dispatch(updateStatus(ACTIONS.LOGOUT_SUCCESS, result.data))
        localStorage.clear()
        history.push('/')
      }
      else {
        dispatch(updateStatus(ACTIONS.LOGOUT_FAILED, result.data))
      }
    } catch (err) {
      dispatch(updateStatus(ACTIONS.LOGOUT_FAILED, err));
      return err;
    }
  }
};

export const setIsOpenMadal = (value) => dispatch => {
  dispatch({type: "CLOSE_MODAL", data: value})
}

export const resetLoginErrorMessage = () => dispatch => {
  dispatch({type: "RESET_LOGIN_ERROR_MESSAGE", data: ""})
}

export const resetRegisterErrorMessage = () => dispatch => {
  dispatch({type: "RESET_REGISTER_ERROR_MESSAGE", data: ""})
}
