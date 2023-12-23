import React, { useState } from 'react';
import './App.css';
import Login from '../logIn/Login';
import Signup from '../signUp/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../protectedRoute/ProtectedRoute';
import StudentDashboard from '../dashboard/Dashboard';
import TeacherDashboard from '../Teacher/Dashboard/Dashboard';
import AttemptTest from '../attemptTest/AttemptTest';
import Navbar from '../navbar';
import Result from '../result/ResultWrapper';
import TestInstruction from '../TestInstructions/TestInstruction';
import IndividualResult from '../result/ShowResult';
import TestPreviewWrapper from '../testPreview/TestPreviewWrapper';
import { connect } from 'react-redux';

import Profile from '../profile/Profile';
import { Roles } from '../Roles/roles';
import CreateTest from '../Teacher/CreateTest/CreateTest';
import AssignedTestsWrapper from '../Teacher/AssigenedTest/AssignedTestsWrapper';
import TestStatus from '../Teacher/TestStatus/TestStatus';
import { message } from 'antd';
import { Offline } from 'react-detect-offline';
import ChooseCreateTest from '../Teacher/CreateTest/ChooseCreateTest';
import QuestionBankCreateTest from '../Teacher/CreateTest/QuestionBankCreateTest';

import QuestionBank from '../questionBank/QuestionBank';
import AddQuestion from '../questionBank/addQuestion/AddQuestion';
import ListQuestionBank from '../questionBank/listQuestion/ListQuestionBank';

import AddExamBank from '../questionBank/examBank/AddExamBank';
import ListExamBank from '../questionBank/examBank/ListExamBank';

import ForgotPassword from '../forgotPassword/ForgotPassword';

function App(props) {
   const [count, setCount] = useState(1);

   const handleOffline = () => {
      setCount(count + 1);
      if (count % 2 === 0) {
         message.success('Connected to internet');
      } else {
         message.error('Please connect to internet');
      }
   };

   const { selectedTestName, selectedAssignedTestName } = props;
   const role = props.userInfo.role;

   return (
      <div className={count % 2 ? '' : ' pointer__select__none'}>
         <Offline onChange={(e) => handleOffline(e)}></Offline>
         <Router>
            <Navbar />
            <Switch>
               <Route exact={true} path={'/signin'} component={Login} />
               <Route exact={true} path="/signup" component={Signup} />
               <Route exact={true} path="/forgot-password" component={ForgotPassword} />

               <Route exact={true} path="/add-question" component={AddQuestion} />
               <Route exact={true} path="/list-question" component={ListQuestionBank} />

               <ProtectedRoute
                  exact={true}
                  path="/"
                  component={Roles.teacher === role ? TeacherDashboard : StudentDashboard}
               />

               <ProtectedRoute
                  exact={true}
                  path="/choose-create-test"
                  component={Roles.teacher === role ? ChooseCreateTest : Login}
               />

               <ProtectedRoute
                  exact={true}
                  path="/create-exam-question-bank"
                  component={Roles.teacher === role ? QuestionBankCreateTest : Login}
               />

               <ProtectedRoute
                  exact={true}
                  path="/list-exam-bank"
                  component={Roles.teacher === role ? ListExamBank : Login}
               />

               <ProtectedRoute
                  exact={true}
                  path="/question-bank"
                  component={Roles.teacher === role ? QuestionBank : Login}
               />

               <ProtectedRoute exact={true} path="/attempt-test" component={AttemptTest} />

               <ProtectedRoute
                  exact={true}
                  path="/create-test"
                  component={Roles.teacher === role ? CreateTest : AttemptTest}
               />

               <ProtectedRoute
                  exact={true}
                  path="/add-exam-bank"
                  component={Roles.teacher === role ? AddExamBank : AddExamBank}
               />

               <ProtectedRoute exact={true} path="/result" component={Result} />
               <ProtectedRoute exact={true} path={`/result/${selectedTestName}`} component={IndividualResult} />
               <ProtectedRoute exact={true} path="/test-instructions" component={TestInstruction} />
               <ProtectedRoute exact={true} path="/start-test" component={TestPreviewWrapper} />
               <ProtectedRoute exact={true} path="/profile" component={Profile} />
               <ProtectedRoute
                  exact={true}
                  path="/assigned-test"
                  component={Roles.teacher === role ? AssignedTestsWrapper : StudentDashboard}
               />
               <ProtectedRoute exact={true} path={`/test-status/${selectedAssignedTestName}`} component={TestStatus} />
               <ProtectedRoute component={Login} />
            </Switch>
         </Router>
      </div>
   );
}

const mapStateToProps = (state) => {
   return {
      selectedTestName: state.selectedTest.selectedTestResultData.testName?.replace(/\s+/g, '-').toLowerCase(),
      userInfo: state.auth.user,
      selectedAssignedTestName: state.selectedTest.selectedAssignedTestData.testName
         ?.replace(/\s+/g, '-')
         .toLowerCase(),
   };
};

export default connect(mapStateToProps, null)(App);
