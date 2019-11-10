import axios from "axios";
import { GET_ERRORS, SET_USER_TWILIO } from './types';
import setAuthToken from "../setAuthToken";

export const registerTwilio = (twilio) => dispatch => {
    // axios.post(process.env.REACT_APP_BACKEND + '/api/twilio/register', twilio)
    //     .then(res => {
    //         dispatch({
    //             type: SET_USER_TWILIO,
    //             payload: res
    //         });
    //     })
    //     .catch(err => {
    //         dispatch({
    //             type: GET_ERRORS,
    //             payload: err.response ? err.response.data : err
    //         });
    //     });
    dispatch({
        type: SET_USER_TWILIO,
        payload: "Free Trial. Not implemented."
    })
}

export const unregisterTwilio = (twilio) => dispatch => {
    axios.post(process.env.REACT_APP_BACKEND + '/api/twilio/unregister', twilio)
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