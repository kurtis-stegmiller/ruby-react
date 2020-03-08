const initialState = {
	isKeywordAvailable: false,
	isKeywordUnavailable: false,
  isShortedLink: false,
  shortLinkStatus: null,
  keywordLookupStatus: null,
  subscriptions: []
}
  
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'KEYWORD_LOOKUP_SUCCESS':
      return {...state,
        keywordLookupStatus: action.type,
      	isKeywordAvailable: action.data.keyword == "available",
      	isKeywordUnavailable: action.data.keyword == "unavailable"
      }
    case 'KEYWORD_LOOKUP_FAILED':
      return {...state, keywordLookupStatus: action.type};
    case 'SHORT_LINK_SUCCESS':
      return {...state, shortLinkStatus: action.type, isShortedLink: true, isKeywordAvailable: false};
    case 'SHORT_LINK_FAILED':
      return {...state, shortLinkStatus: action.type, isKeywordAvailable: false};
    case 'RESET_IS_KEYWORD_AVAILABLE':
      return {...state, isKeywordAvailable: false}
    case 'RESET_IS_SHORTED_LINK':
      return {...state, isShortedLink: false}
    case 'GET_SUBSCRIPTIONS_SUCCESS':
      return {...state, subscriptions: action.data}
    case 'GET_SUBSCRIPTIONS_FAILED':
      return {...state}
    default:
      return state;
  }
}