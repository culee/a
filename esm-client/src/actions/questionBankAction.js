import { logoutUser } from './authActions';

export const SUBMIT_QUESTION_REQUEST = 'SUBMIT_QUESTION_REQUEST';
export const SET_QUESTION_CREATED_FALSE = 'SET_TEST_CREATED_FALSE';
export const SUBMIT_QUESTION_SUCCESS = 'SUBMIT_QUESTION_SUCCESS';
export const SUBMIT_QUESTION_FAILURE = 'SUBMIT_QUESTION_FAILURE';

export const FETCH_DATA_QUESTION_REQUEST = 'FETCH_DATA_QUESTION_REQUEST';
export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';

export const FETCH_ATTEMPT_QUESTION_SUCCESS = 'FETCH_ATTEMPT_QUESTION_SUCCESS';
export const ASSIGNED_TEST_FAILURE = 'ASSIGNED_TEST_FAILURE';

const requestQuestionData = () => {
   return {
      type: FETCH_DATA_QUESTION_REQUEST,
   };
};

const requestQuestion = () => {
   return {
      type: SUBMIT_QUESTION_REQUEST,
   };
};

const setQuestionCreatedFalse = () => {
   return {
      type: SET_QUESTION_CREATED_FALSE,
   };
};

const receiveSubmitQuetion = (user, profileID) => {
   return {
      type: SUBMIT_QUESTION_SUCCESS,
   };
};
const submitQuestionError = () => {
   return {
      type: SUBMIT_QUESTION_FAILURE,
   };
};

const receiveQuestion = (question) => {
   return {
      type: FETCH_ATTEMPT_QUESTION_SUCCESS,
      question,
   };
};

const AssignedTestError = () => {
   return {
      type: ASSIGNED_TEST_FAILURE,
   };
};

export const submitQuestion = (values) => (dispatch) => {
   
   console.log(values);

   dispatch(requestQuestion());

   const requestOptions = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: localStorage.getItem('token'),
      },

      body: JSON.stringify(values),
   };
   //console.log("Success:", values);
   fetch('/question/create-question', requestOptions)
      .then((response) => response.json())
      .then((data) => {
         if (data?.error?.name === 'TokenExpiredError') {
            dispatch(logoutUser());
            console.log(data.user);
         } else {
            dispatch(receiveSubmitQuetion(data.user));
         }
      })
      .catch((error) => {
         //Do something with the error if you want!
         console.log(error);
         dispatch(submitQuestionError());
      });
};

export const questionCreatedFalse = () => async (dispatch) => {
   dispatch(setQuestionCreatedFalse());
};
