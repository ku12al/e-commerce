import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  event: null,
  events: [],
  allEvents: [],
  success: false,
  error: null,
  message: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('eventCreateRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('eventCreateSuccess', (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase('eventCreateFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase('getAllEventsShopRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllEventsShopSuccess', (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase('getAllEventsShopFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('deleteEventRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('deleteEventSuccess', (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase('deleteEventFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('getAllEventsRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllEventsSuccess', (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase('getAllEventsFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});

