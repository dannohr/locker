const initialState = {
  systemTye: "",
  connected: "false"
};

const CHECK_SYSTEM_CONNECT = "CHECK_SYSTEM_CONNECT";
const UPDATE_PROPERTY_TYPE = "UPDATE_PROPERTY_TYPE";

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_SYSTEM_CONNECT:
      return Object.assign({}, state, { loanType: action.payload });

    case UPDATE_PROPERTY_TYPE:
      return Object.assign({}, state, { propertyType: action.payload });

    default:
      return state;
  }
}

export function updateLoanType(loanType) {
  return {
    type: UPDATE_LOAN_TYPE,
    payload: loanType
  };
}

export function updatePropertyType(property) {
  return {
    type: UPDATE_PROPERTY_TYPE,
    payload: property
  };
}

export default reducer;
