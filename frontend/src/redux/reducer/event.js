import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  event: null,
  events: [],
  success: false,
  error: null,
  message: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    eventCreateRequest: (state) => {
      state.isLoading = true;
    },
    eventCreateSuccess: (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    },
    eventCreateFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    getAllEventsShopRequest: (state) => {
      state.isLoading = true;
    },
    getAllEventsShopSuccess: (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    },
    getAllEventsShopFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteEventRequest: (state) => {
      state.isLoading = true;
    },
    deleteEventSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    deleteEventFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  eventCreateRequest,
  eventCreateSuccess,
  eventCreateFail,
  getAllEventsShopRequest,
  getAllEventsShopSuccess,
  getAllEventsShopFail,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFail,
  clearErrors,
} = eventSlice.actions;

export default eventSlice.reducer;
