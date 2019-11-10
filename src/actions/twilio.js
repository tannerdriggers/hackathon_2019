import axios from "axios";
import { GET_ERRORS, SET_USER_TWILIO } from './types';

export const registerTwilio = (twilio) => dispatch => {
    axios.post(process.env.REACT_APP_BACKEND + '/api/twilio/register', { id: twilio.id, phoneNumber: twilio.phoneNumber })
        .then(res => {
            dispatch({
                type: SET_USER_TWILIO,
                payload: res
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response ? err.response.data : err
            });
        });
}

export const unregisterTwilio = (twilio) => dispatch => {
    axios.post(process.env.REACT_APP_BACKEND + '/api/twilio/unregister', { id: twilio.id, phoneNumber: twilio.phoneNumber })
        .then(res => {
            dispatch({
                type: SET_USER_TWILIO,
                payload: res
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response ? err.response.data : err
            });
        });
}