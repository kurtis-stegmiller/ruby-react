const initialState = {
  // TODO: table: []
  table: [
    {
      id: 1,
      url: "https://www.google.com/",
      keyword: "item",
      description: "test 1",
      expiration: "01/01/2020 12:45",
      clicks: "357",
      status: "pending",
      checked: false
    },{
      id: 2,
      url: "https://www.google.com/",
      keyword: "products",
      description: "test 2",
      expiration: "01/01/2020 12:45",
      clicks: "357",
      status: "pending",
      checked: false
    }
    ,{
      id: 3,
      url: "https://www.google.com/",
      keyword: "products",
      description: "description",
      expiration: "01/01/2020 12:45",
      clicks: "357",
      status: "expire",
      checked: false
    }
  ]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
      case "SET_TABLE":
        return { ...state, table: action.payload};
      case 'GET_KEYWORDS_SUCCESS':
        return {...state, table: action.data.data};
      case 'GET_KEYWORDS_FAILED':
        return { ...state };
    default:
      return { ...state };
  }
}
