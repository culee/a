import React, { Component } from 'react';
import { Row, Col, Form, Input, Button, Select, notification, TimePicker, DatePicker } from 'antd';
import './index.css';
import { connect } from 'react-redux';

import Questions from './Questions';
import RenderData from './RenderData';
import { submitTest, testCreatedFalse } from '../../actions/TeacherActions';
class CreateTest extends Component {
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
      const { testName, category, className, section, minutes, outOfMarks } = values;
      const questions = this.state.questions.map((question, index) => {
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
      const answers = this.state.questions.map(({ answer }) => parseInt(answer));
      const levels = this.state.questions.map(({ level }) => level);
      const teacherId = this.props.teacherID;
      const rules = this.state.rules;
      const startTime = `${values.startDate.format('YYYY-MM-DD')}T${values.startTime.format('HH:mm:ss')}`;
      const sendData = {
         teacherId,
         testName,
         category,
         className,
         section,
         rules,
         testCreated: false,
         minutes,
         outOfMarks,
         questions,
         answers,
         levels,
         startTime,
      };

      if (values.endDate && values.endTime) {
         sendData.endAt = `${values.endDate.format('YYYY-MM-DD')}T${values.endTime.format('HH:mm:ss')}`;
      }

      this.props.submitTest(sendData);
   };

   onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   handleDeleteRule = (Removeindex) => {
      this.setState({
         rules: this.state.rules.filter((item, index) => index !== Removeindex),
      });
   };

   handleDeleteQuestion = (Removeindex) => {
      this.setState({
         questions: this.state.questions.filter((item, index) => index !== Removeindex),
      });
   };

   addRule = (value) => {
      this.setState({
         rules: [...this.state.rules, { value }],
      });
   };

   openNotification = () => {
      const args = {
         message: 'Tạo thành công bài kiểm tra',
         description: 'Thông tin chi tiết ở mục Bài kiểm tra giao',
         duration: 3,
      };
      notification.open(args);
   };

   addQuestion = (questionData) => {
      this.setState({
         questions: [questionData, ...this.state.questions],
      });
   };

   componentDidUpdate() {
      if (this.props.testCreated) {
         this.props.testCreatedFalse();
         this.openNotification();
      }
   }

   render() {
      const { Option } = Select;

      return (
         <>
            <Row justify="center" align="middle">
               <Col xs={22} sm={22} md={10} lg={10} className="signup__container">
                  <p className="sub-title__signup"> 🎓 Bài kiểm tra</p>
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
                        <Form.Item
                           name="testName"
                           rules={[
                              {
                                 required: true,
                                 message: 'Hãy chọn môn!',
                              },
                           ]}
                        >
                           <Select defaultValue="Môn thi">
                              <Option value="Toán">Toán</Option>
                              <Option value="Lý">Lý</Option>
                              <Option value="Hóa">Hóa</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item
                           name="className"
                           rules={[
                              {
                                 required: true,
                                 message: 'Hãy chọn khối!',
                              },
                           ]}
                        >
                           <Select defaultValue="Khối">
                              <Option value="X">X</Option>
                              <Option value="XI">XI</Option>
                              <Option value="XII">XII</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item
                           name="section"
                           rules={[
                              {
                                 required: true,
                                 message: 'Hãy chọn lớp!',
                              },
                           ]}
                        >
                           <Select defaultValue="Lớp">
                              <Option value="A">A</Option>
                              <Option value="B">B</Option>
                              <Option value="C">C</Option>
                              <Option value="D">D</Option>
                           </Select>
                        </Form.Item>
                     </div>
                     <Form.Item
                        name="category"
                        rules={[
                           {
                              required: true,
                              message: 'Vui lòng nhập hạng muc!',
                           },
                        ]}
                     >
                        <Input placeholder="Hạng mục kiểm tra" className="input" />
                     </Form.Item>
                     <div className="element__wrapper">
                        <Form.Item
                           name="outOfMarks"
                           className=""
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng nhập tổng điểm!',
                              },
                           ]}
                        >
                           <Input placeholder="Tổng điểm" className="input" type="number" />
                        </Form.Item>
                        <Form.Item
                           name="minutes"
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng nhập số phút!',
                              },
                           ]}
                        >
                           <Input placeholder="Thời gian kiểm tra (Phút)" className="input" type="number" />
                        </Form.Item>
                     </div>
                     <p className="primary-wihtoutFont mt-2 font-" style={{ fontWeight: '500' }}>
                        Thời gian bắt đầu làm bài
                     </p>
                     <div className="start-time-box">
                        <Form.Item
                           name="startTime"
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng nhập thời gian',
                              },
                           ]}
                        >
                           <TimePicker placeholder="Chọn thời gian" className="time-picker" />
                        </Form.Item>
                        <Form.Item
                           name="startDate"
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng nhập ngày',
                              },
                           ]}
                        >
                           <DatePicker placeholder="Chọn ngày" className="time-picker" />
                        </Form.Item>
                     </div>
                     <p className="primary-wihtoutFont mt-2 font-" style={{ fontWeight: '500' }}>
                        Thời gian kết thức
                     </p>
                     <div className="start-time-box">
                        <Form.Item name="endTime">
                           <TimePicker placeholder="Chọn thời gian" className="time-picker" />
                        </Form.Item>
                        <Form.Item name="endDate">
                           <DatePicker placeholder="Chọn ngày" className="time-picker" />
                        </Form.Item>
                     </div>
                     <p className="primary-wihtoutFont mt-2" style={{ fontWeight: '500' }}>
                        Câu hỏi
                     </p>
                     <RenderData
                        questionData={this.state.questions}
                        questions={true}
                        clickedRule={this.handleDeleteQuestion}
                     />
                     <Form.Item>
                        <Questions addQuestion={this.addQuestion} />
                     </Form.Item>
                     <Form.Item>
                        <Button
                           type="primary"
                           loading={this.state.isLoading}
                           className="sign__up"
                           htmlType="submit"
                           disabled={this.state.questions.length < 1 ? true : false}
                        >
                           {this.state.isLoading ? 'Loading...' : 'Hoàn Tất'}
                        </Button>
                     </Form.Item>
                  </Form>
               </Col>
            </Row>
         </>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      teacherID: state.auth.profileID,
      isLoading: state.teacher.isLoadingTest,
      testCreated: state.teacher.testCreated,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      submitTest: (values) => dispatch(submitTest(values)),
      testCreatedFalse: () => dispatch(testCreatedFalse()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);
