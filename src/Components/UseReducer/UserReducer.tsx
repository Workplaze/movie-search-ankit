export const SET_USER_ROLE_FILTER = "SET_USER_ROLE_FILTER";

export const userReducer = (
  state: any,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case SET_USER_ROLE_FILTER:
      localStorage.setItem("userRoleFilter", action.payload);
      return { ...state, userRoleFilter: action.payload };
    default:
      return state;
  }
};
