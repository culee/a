import React, { Component } from 'react';
import { Row, Col, Form, Button, Select, notification } from 'antd';
import './addquestion.css';
import { connect } from 'react-redux';

import CreateQuestionBank from '../componentQuestion/CreateQuestionBank';
import RenderDataQuestion from '../componentQuestion/RenderDataQuestion';
import { submitQuestion, questionCreatedFalse } from '../../actions/questionBankAction';

class AddQuestion extends Component {
   constructor(props) {
      super(props);
      this.state = {
         rules: [],
         questions: [],
         isLoading: false,
         testCreated: false,
      };
   }

   static getDerivedStateFromProps(props, state) {
      return {
         isLoading: props.isLoading,
         testCreated: props.testCreated,
      };
   }

   submitForm = (values) => {
      let questions = [];
      let answers = [];

      console.log(values);

      const { testName, className, section } = values;

      questions = this.state.questions.map((question, index) => {
         return {
            description: question.questionDescripiton,
            options: [
               {
                  option: question.opiton1,
               },
               {
                  option: question.opiton2,
               },
               {
                  option: question.opiton3,
               },
               {
                  option: question.opiton4,
               },
            ],
         };
      });
      this.state.questions.map((question, index) => {
         answers.push(parseInt(question.answer));
      });
      const teacherId = this.props.teacherID;

      const sendData = {
         teacherId,
         testName,
         answers,
         className,
         questions,
         section,
         testCreated: false,
      };

      console.log(sendData);

      this.props.submitQuestion(sendData);
   };

   onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   handleSelect = (select, optionData) => {};

   handleDeleteQuestion = (Removeindex) => {
      this.setState({
         questions: this.state.questions.filter((item, index) => index !== Removeindex),
      });
   };

   openNotification = () => {
      const args = {
         message: 'Đã thêm câu hỏi vào QuestionBank',
         description: 'Thông tin chi tiết ở mục danh sách QuestionBank',
         duration: 3,
      };
      notification.open(args);
   };

   addQuestion = ({ questionDescripiton, opiton1, opiton2, opiton3, opiton4, answer, level }) => {
      this.setState({
         questions: [
            { questionDescripiton, opiton1, opiton2, opiton3, opiton4, answer, level },
            ...this.state.questions,
         ],
      });
   };

   componentDidUpdate() {
      if (this.props.testCreated) {
         this.props.questionCreatedFalse();
         this.openNotification();
      }
   }

   render() {
      const { Option } = Select;

      return (
         <div className="addquestion">
            <Row justify="center" align="middle">
               <div className="form-addquestion">
                  <p className="sub-title__signup"> Tạo câu hỏi QuestionBank</p>
                  <Form
                     name="basic"
                     className="create__test__form"
                     initialValues={{
                        remember: true,
                     }}
                     onFinish={this.submitForm}
                     onFinishFailed={this.onFinishFailed}
                  >
                     <div className="element__wrapper">
                        <Form.Item name="testName" rules={[{ required: true, message: 'Hãy chọn môn!' }]}>
                           <Select defaultValue="Môn thi">
                              <Option value="Toán">Toán</Option>
                              <Option value="Lý">Lý</Option>
                              <Option value="Hóa">Hóa</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item name="className" rules={[{ required: true, message: 'Hãy chọn khối!' }]}>
                           <Select defaultValue="Khối">
                              <Option value="X">X</Option>
                              <Option value="XI">XI</Option>
                              <Option value="XII">XII</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item name="section" rules={[{ required: true, message: 'Hãy chọn lớp!' }]}>
                           <Select defaultValue="Lớp">
                              <Option value="A">A</Option>
                              <Option value="B">B</Option>
                              <Option value="C">C</Option>
                              <Option value="D">D</Option>
                           </Select>
                        </Form.Item>
                     </div>

                     <RenderDataQuestion ruleData={this.state.rules} rules={true} clickedRule={this.handleDeleteRule} />

                     <RenderDataQuestion
                        questionData={this.state.questions}
                        questions={true}
                        clickedRule={this.handleDeleteQuestion}
                     />

                     <p className="primary-wihtoutFont mt-2" style={{ fontWeight: '500' }}>
                        Nhập câu hỏi
                     </p>
                     <Form.Item>
                        <CreateQuestionBank addQuestion={this.addQuestion} />
                     </Form.Item>
                     <Form.Item>
                        <Button
                           type="primary"
                           loading={this.state.isLoading}
                           className="sign__up"
                           htmlType="submit"
                           disabled={this.state.questions.length < 1 ? true : false}
                        >
                           {this.state.isLoading ? 'Loading...' : 'Thêm câu hỏi vào ngân hàng'}
                        </Button>
                     </Form.Item>
                  </Form>
               </div>
            </Row>
         </div>
      );
   }
}

// export default AddQuestion;
const mapStateToProps = (state) => {
   return {
      teacherID: state.auth.profileID,
      isLoading: state.teacher.isLoadingTest,
      testCreated: state.teacher.testCreated,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      submitQuestion: (values) => dispatch(submitQuestion(values)),
      questionCreatedFalse: () => dispatch(questionCreatedFalse()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
