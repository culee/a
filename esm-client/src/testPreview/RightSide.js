import React, { Component } from 'react';
import { Radio, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { submitTest } from '../actions/testActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';
import { QUESTION_POINT } from '../constants/common.constants';

class RightSide extends Component {
   constructor(props) {
      super(props);
      this.state = {
         levels: [],
         activateQue: 0,
         questionsData: [],
         changeIndex: 0,
         questionIndex: 0,
         selectedAnswers: Array.apply(undefined, Array(5)),
         value: null,
         testID: null,
         selectedTest: null,
      };
   }

   static getDerivedStateFromProps(props, state) {
      return {
         questionsData: props.questionsData,
         questionIndex: props.questionIndex,
         testID: props.testID,
         levels: props.levels,
         selectedTest: props.selectedTest,
      };
   }

   handleClearResponse = (index) => {
      let newSelectedAnswers = this.state.selectedAnswers;
      let blankClearAttempt = newSelectedAnswers[index] === undefined ? true : false;

      newSelectedAnswers[index] = undefined;
      this.setState({
         selectedAnswers: newSelectedAnswers,
      });
      this.props.handleClearResponse(index, blankClearAttempt);
   };
   onChange = (e, index) => {
      let newSelectedAnswers = this.state.selectedAnswers;
      if (newSelectedAnswers[index] === undefined) {
         this.props.questionAnswered(index, e.target.value, false);
      } else {
         this.props.questionAnswered(index, e.target.value, true);
      }
      newSelectedAnswers[index] = e.target.value;
      this.setState({
         value: e.target.value,
         selectedAnswers: newSelectedAnswers,
      });
   };
   componentDidMount() {
      this.props.onRef(this);
   }

   changeActivatedQueInChild = (changeActivatedQue) => {
      if (changeActivatedQue === 'next__question') {
         if (this.state.activateQue < this.state.questionsData.length - 1) {
            this.setState({
               activateQue: this.state.activateQue + 1,
            });
            this.props.changeParentActivatedQue(this.state.activateQue + 1);
         }
      } else if (changeActivatedQue === 'previous__question') {
         if (this.state.activateQue > 0) {
            this.setState({
               activateQue: this.state.activateQue - 1,
            });
            this.props.changeParentActivatedQue(this.state.activateQue - 1);
         }
      } else if (changeActivatedQue === 'flag__question') {
      } else if (changeActivatedQue === 'end__test') {
      } else {
         this.setState({
            activateQue: changeActivatedQue,
         });
      }
   };
   componentWillUnmount() {
      this.props.onRef(undefined);
   }
   submitTest = () => {
      const { userAnswers, answers, testName, testID, profileID, firstName, lastName } = this.props;
      let correct = 0,
         wrong = 0,
         unanswered = 0,
         correctPoint = 0,
         totalMarks = answers.length,
         dataToSubmit;

      userAnswers.forEach((element, index) => {
         if (element === undefined) {
            unanswered = unanswered + 1;
         } else if (element !== answers[index]) {
            wrong = wrong + 1;
         } else {
            const currentPoint = QUESTION_POINT[this.state.levels[index]];
            correctPoint += currentPoint;
            correct = correct + 1;
         }
      });

      const totalLevelPoint = this.state.levels.reduce((init, level) => QUESTION_POINT[level] + init, 0);
      const outOfMarks = this.state.selectedTest.outOfMarks;
      const point = Math.floor((correctPoint / totalLevelPoint) * outOfMarks);

      dataToSubmit = {
         testID,
         correct,
         unanswered,
         totalMarks,
         profileID,
         testName,
         firstName,
         lastName,
         wrong,
         point,
         outOfMarks,
      };
      this.props.submitTest(dataToSubmit);
      this.props.signOut();
      return;
   };
   render() {
      const radioStyle = {
         display: 'block',
         height: '30px',
         lineHeight: '30px',
      };

      return (
         <>
            <div className="descripiton__wrapper">
               <div className="question__no">
                  Thứ {this.state.activateQue + 1} trong {this.state.questionsData.length} câu hỏi
               </div>
               <div>Số điểm: {QUESTION_POINT[this.state.levels[this.state.activateQue]]}</div>
               {this.state.questionsData &&
                  this.state.questionsData.map((question, index) => {
                     if (this.state.activateQue === index) {
                        return (
                           <div className="description__box" key={index}>
                              <div className="descripiton"> {question.description}</div>
                              <div className="options">
                                 <Radio.Group
                                    onChange={(e) => this.onChange(e, index)}
                                    value={this.state.selectedAnswers[index]}
                                 >
                                    <Radio style={radioStyle} value={1}>
                                       {question.options[0].option}
                                    </Radio>
                                    <Radio style={radioStyle} value={2}>
                                       {question.options[1].option}
                                    </Radio>
                                    <Radio style={radioStyle} value={3}>
                                       {question.options[2].option}
                                    </Radio>
                                    <Radio style={radioStyle} value={4}>
                                       {question.options[3].option}
                                    </Radio>
                                 </Radio.Group>
                                 <div className="clear__response" onClick={() => this.handleClearResponse(index)}>
                                    {<CloseOutlined />} Clear Response
                                 </div>
                              </div>
                           </div>
                        );
                     }
                  })}
            </div>
         </>
      );
   }
}
const mapStateToProps = (state) => {
   return {
      selectedTest: state.selectedTest.selectedTestData,
      profileID: state.auth.user ? state.auth.profileID : null,
      firstName: state.auth.user.firstName,
      lastName: state.auth.user.lastName,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      submitTest: (data) => dispatch(submitTest(data)),
      signOut: () => dispatch(logoutUser()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightSide);
