import axios from "axios";
import { server } from "../../server";

// Action Types
const EVENT_CREATE_REQUEST = "eventCreateRequest";
const EVENT_CREATE_SUCCESS = "eventCreateSuccess";
const EVENT_CREATE_FAIL = "eventCreateFail";
const GET_ALL_EVENTS_SHOP_REQUEST = "getAllEventsShopRequest";
const GET_ALL_EVENTS_SHOP_SUCCESS = "getAllEventsShopSuccess";
const GET_ALL_EVENTS_SHOP_FAIL = "getAllEventsShopFail";
const DELETE_EVENT_REQUEST = "deleteEventRequest";
const DELETE_EVENT_SUCCESS = "deleteEventSuccess";
const DELETE_EVENT_FAIL = "deleteEventFail";
const GET_ALL_EVENTS_REQUEST = "getAllEventsRequest";
const GET_ALL_EVENTS_SUCCESS = "getAllEventsSuccess";
const GET_ALL_EVENTS_FAIL = "getAllEventsFail";

// Create an event
export const createEvent = (data) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_CREATE_REQUEST });

    const { dat } = await axios.post(
      `${server}/event/create-event`,
      data,
    );

    dispatch({
      type: EVENT_CREATE_SUCCESS,
      payload: dat.event,
    });
  } catch (error) {
    dispatch({
      type: EVENT_CREATE_FAIL,
      payload: error.response?.data?.message || "Failed to create event",
    });
  }
};

// Get all events for a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EVENTS_SHOP_REQUEST });

    const { data } = await axios.get(
      `${server}/event/get-all-events/${id}`
    );
    dispatch({
      type: GET_ALL_EVENTS_SHOP_SUCCESS,
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EVENTS_SHOP_FAIL,
      payload: error.response?.data?.message || "Failed to fetch events",
    });
  }
};

// Delete an event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: error.response?.data?.message || "Failed to delete event",
    });
  }
};

// Get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });

    const { data } = await axios.get(`${server}/event/get-all-events`);

    dispatch({
      type: GET_ALL_EVENTS_SUCCESS,
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_EVENTS_FAIL,
      payload: error.response?.data?.message || "Failed to fetch events",
    });
  }
};
