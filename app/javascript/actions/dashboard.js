import API from '../helpers/API'
import { successCode, createSuccessCode } from '../helpers/constants'

const ACTIONS = {
  // keyword lookup
  KEYWORD_LOOKUP_PROGRESS: "KEYWORD_LOOKUP_PROGRESS",
  KEYWORD_LOOKUP_SUCCESS: "KEYWORD_LOOKUP_SUCCESS",
  KEYWORD_LOOKUP_FAILED: "KEYWORD_LOOKUP_FAILED",

  // short link
  SHORT_LINK_PROGRESS: "SHORT_LINK_PROGRESS",
  SHORT_LINK_SUCCESS: "SHORT_LINK_SUCCESS",
  SHORT_LINK_FAILED: "SHORT_LINK_FAILED",

  // get user's keywords
  "GET_KEYWORDS_PROGRESS": "GET_KEYWORDS_PROGRESS",
  "GET_KEYWORDS_SUCCESS": "GET_KEYWORDS_SUCCESS",
  "GET_KEYWORDS_FAILED": "GET_KEYWORDS_FAILED",

  // remove user's keyword
  "REMOVE_KEYWORD_PROGRESS": "REMOVE_KEYWORD_PROGRESS",
  "REMOVE_KEYWORD_SUCCESS": "REMOVE_KEYWORD_SUCCESS",
  "REMOVE_KEYWORD_FAILED": "REMOVE_KEYWORD_FAILED",

  // get all scriptions
  "GET_SUBSCRIPTIONS_PROGRESS": "GET_SUBSCRIPTIONS_PROGRESS",
  "GET_SUBSCRIPTIONS_SUCCESS": "GET_SUBSCRIPTIONS_SUCCESS",
  "GET_SUBSCRIPTIONS_FAILED": "GET_SUBSCRIPTIONS_FAILED",

}

const updateStatus = (status, statusInfo) => {
  return {
    type: status,
    data: statusInfo
  }
}

export const handleSubmitUrl = ({ url, keyword, description }) => (dispatch, getState) => {
 
  // TODO: fetch item
  const item = { 
    url,
    keyword,
    description,
    expiration: "01/01/2020 12:45",
    clicks: "357",
    active: true,
    select: false
  };

  const table = getState().table.table;
  const mewTable = [...table, ...[item]]
  dispatch({ type: "SET_TABLE", payload: mewTable });
};

export const handleselect = type => () => {
  if (type === "fb") {
    //   ....
  }

  if (type === "tw") {
    //   ....
  }

  if (type === "ln") {
    //   ....
  }
};

export const handleChecked = ({ id, checked }) => (dispatch, getState) => {
  const table = getState().table.table;
  const mewTable = table.map(elem => {
    if (elem.id === id) {
      return {
        ...elem,
        checked
      };
    }
    return elem;
  });
  // TODO: Fetch 
  // ... 
  dispatch({ type: "SET_TABLE", payload: mewTable });
};

export const removeClickKeyword = ({ id }) => {
  return async (dispatch, getState) => {
    const table = getState().table.table;
    const record = table.find(elem => elem.id === id)
    const mewTable = table.map(elem => {
      if (elem.id === id) {
        return {
          ...elem,
          clicks: 0
        };
      }
      return elem;
    });
    record.clicks = 0
    const result = await API.updateKeyword({id: id, data: {keyword: record}})
    dispatch({ type: "SET_TABLE", payload: mewTable });
  }
};

export const changeExpiredTableItem = ({ id }) => (dispatch, getState) => {
  const table = getState().table.table;
  const mewTable = table.map(elem => {
    if (elem.id === id) {
      return {
        ...elem,
        active: true
      };
    }
    return elem;
  });
  // TODO: Fetch 
  // ... 
  dispatch({ type: "SET_TABLE", payload: mewTable });
};

export const handleKeywordLookup = ({url, keyword, description}) => {
  return async (dispatch) => {
    dispatch(updateStatus(ACTIONS.KEYWORD_LOOKUP_PROGRESS))
    try {
      const result = await API.keywordLookup({
        url: url,
        keyword: keyword,
        description: description
      });
      if (result.status === successCode) {
        dispatch(updateStatus(ACTIONS.KEYWORD_LOOKUP_SUCCESS, result.data))
      }
      else {
        dispatch(updateStatus(ACTIONS.KEYWORD_LOOKUP_FAILED, result.data))
      }
    } catch (err) {
      dispatch(updateStatus(ACTIONS.KEYWORD_LOOKUP_FAILED, err));
      return err;
    }
  }
}

export const handleShortLink = ({url, keyword, description}) => {
  return async (dispatch) => {
    dispatch(updateStatus(ACTIONS.SHORT_LINK_PROGRESS))
    try {
      const result = await API.shortLink({
        keyword: {
          url: url,
          keyword: keyword,
          description: description
        }
      });
      if (result.status === createSuccessCode) {
        dispatch(updateStatus(ACTIONS.SHORT_LINK_SUCCESS, result.data))
      }
      else {
        dispatch(updateStatus(ACTIONS.SHORT_LINK_FAILED, result.data))
      }
    } catch (err) {
      dispatch(updateStatus(ACTIONS.SHORT_LINK_FAILED, err));
      return err;
    }
  }
}

export const getKeywords = () => {
  return async (dispatch) => {
    dispatch(updateStatus(ACTIONS.GET_KEYWORDS_PROGRESS))
    try {
      const result = await API.getKeywords();
      if (result.status === successCode) {
        dispatch(updateStatus(ACTIONS.GET_KEYWORDS_SUCCESS, result.data))
      }
      else {
        dispatch(updateStatus(ACTIONS.GET_KEYWORDS_FAILED, result.data))
      }
    } catch (err) {
      dispatch(updateStatus(ACTIONS.GET_KEYWORDS_FAILED, err));
      return err;
    }
  }
}

export const removeTableItem = ({id}) => {
  return async (dispatch, getState) => {
    const result = await API.removeKeyword(id);
    const table = getState().table.table;
    const newTable = table.filter(elem => elem.id !== id)
    dispatch({ type: "SET_TABLE", payload: newTable });
  }
}

export const handleEditDescription = ({ id, value }) => {
  return async (dispatch, getState) => {
    const table = getState().table.table;
    const record = table.find(elem => elem.id === id)
    record.description = value
    const result = await API.updateKeyword({id: id, data: {keyword: record}})
    const newTable = table.map(elem => {
      if (elem.id === id) {
        return {
          ...elem,
          description: value
        };
      }
      return elem;
    });
    // TODO: Fetch 
    // ... 
    dispatch({ type: "SET_TABLE", payload: newTable });
  }
};

export const handleEditUrl = ({ id, value }) => {
  return async (dispatch, getState) => {
    const table = getState().table.table;
    const record = table.find(elem => elem.id === id)
    record.url = value
    const result = await API.updateKeyword({id: id, data: {keyword: record}})
    const newTable = table.map(elem => {
      if (elem.id === id) {
        return {
          ...elem,
          url: value
        };
      }
      return elem;
    });
    // TODO: Fetch 
    // ... 
    dispatch({ type: "SET_TABLE", payload: newTable });
  }
};

export const removeTableItems = () => {
  return async (dispatch, getState) => {
    const table = getState().table.table;
    const newTable = table.filter(elem => !elem.checked);
    const selectedTable = table.filter(elem => elem.checked);
    const result = await API.removeSelectedKeywords({ids: selectedTable.map(elem => elem.id)})
    dispatch({ type: "SET_TABLE", payload: newTable });
  }
};

export const getSubscriptions = () => {
  return async (dispatch) => {
    dispatch(updateStatus(ACTIONS.GET_SUBSCRIPTIONS_PROGRESS))
    try {
      const result = await API.getSubscriptions();
      if (result.status === successCode) {
        dispatch(updateStatus(ACTIONS.GET_SUBSCRIPTIONS_SUCCESS, result.data))
      }
      else {
        dispatch(updateStatus(ACTIONS.GET_SUBSCRIPTIONS_FAILED, result.data))
      }
    } catch (err) {
      dispatch(updateStatus(ACTIONS.GET_SUBSCRIPTIONS_FAILED, err));
      return err;
    }
  }
}

export const resetIsKeywordAvailable = () => dispatch => {
  dispatch({type: "RESET_IS_KEYWORD_AVAILABLE", data: ""})
}

export const resetIsShortedLink = () => dispatch => {
  dispatch({type: "RESET_IS_SHORTED_LINK", data: ""})
}


