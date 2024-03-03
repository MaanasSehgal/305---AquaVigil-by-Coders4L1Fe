import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  complaint: null,
  employees: [],
  onEmployeeListView: false,
};

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setComplaint(state, actions) {
      state.complaint = actions.payload.complaint;
    },
    setEmployees(state, actions) {
        state.employees = actions.payload.employees;
    },
    setOnEmployeeListView(state, actions) {
        state.onEmployeeListView = actions.payload.onEmployeeListView
    } 
  },
});

export default slice.reducer;

export function SetComplaint(complaint) {
  return async (dispatch, getState) => {
    try {
        dispatch(
          slice.actions.setComplaint({
            complaint: complaint
          })
        );
      
    } catch (error) {
      console.log(error);
    }
  };
}

export function SetEmployees(employees) {
    return async (dispatch, getState) => {
      try {
          dispatch(
            slice.actions.setEmployees({
              employees: [...employees]
            })
          );
        
      } catch (error) {
        console.log(error);
      }
    };
  }

  export function SetOnEmployeeListView(value) {
    return async (dispatch, getState) => {
      try {
          dispatch(
            slice.actions.setOnEmployeeListView({
                onEmployeeListView: value
            })
          );
        
      } catch (error) {
        console.log(error);
      }
    };
  }