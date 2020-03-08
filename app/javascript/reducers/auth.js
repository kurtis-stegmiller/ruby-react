const initialState = {
  status: null,
  currentUser: null,
  isOpenMadal: false,
  isLoggedOut: false,
  isLoggedIn: false,
  loginErrorMessage: "",
  registerErrorMessage: ""
}
  
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem("currentUser", JSON.stringify(action.data))
      return {...state, currentUser: action.data, isOpenMadal: false, isLoggedIn: true}
    case 'LOGIN_FAILED':
      return {...state, loginErrorMessage: action.data.response.data.error}
    case 'REGISTER_SUCCESS':
      localStorage.setItem("currentUser", JSON.stringify(action.data))
      return {...state, currentUser: action.data, isOpenMadal: false, isLoggedIn: true}
    case 'REGISTER_FAILED':
      return {...state, registerErrorMessage: action.data.response.data.errors}
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem("currentUser")
      return {...state, currentUser: null, isLoggedOut: true, isLoggedIn: false}
    case 'LOGOUT_FAILED':
      return state
    case 'CLOSE_MODAL':
      return {...state, isOpenMadal: action.data}
    case 'RESET_LOGIN_ERROR_MESSAGE':
      return {...state, loginErrorMessage: ""}
    case 'RESET_LOGIN_ERROR_MESSAGE':
      return {...state, registerErrorMessage: ""}
    default:
      return state;
  }
}