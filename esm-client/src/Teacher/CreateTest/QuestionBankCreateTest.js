import './index.css';
import React, { useCallback, useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select, notification, TimePicker, DatePicker } from 'antd';
import './index.css';
import axios from 'axios';

import { useAddListExam } from '../../useContext/Context';

function QuestionBankCreateTest() {
   const { Option } = Select;

   const { showListAddQuestionBank, setShowListAddQuestionBank } = useAddListExam();

   const { showListAddExamBank, setShowListAddExamBank } = useAddListExam();

   const [testName, setTestName] = useState();
   const [className, setClassName] = useState();

   console.log(testName, 'testName');
   console.log(className, 'className');

   const handleSubmit = () => {};

   ///Call API list Exam
   const fetchDataListExamBank = useCallback(
      async (searchWithParams = true) => {
         try {
            const response = await axios.get('/exams/test-temp/search', {
               params: searchWithParams
                  ? {
                       testName,
                       className,
                    }
                  : {},
               headers: {
                  Authorization: localStorage.getItem('token'),
               },
            });

            const data = response.data;
            setShowListAddExamBank(data.obj);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      },
      [testName, className],
   );

   const HandleShowlistExamBank = async () => {
      setTestName();
      setClassName();
      fetchDataListExamBank();
   };

   console.log(showListAddExamBank);

   ///Call API list question bank
   const fetchDataListQuestionBank = useCallback(
      async (searchWithParams = true) => {
         try {
            const response = await axios.get('/question/search', {
               params: searchWithParams
                  ? {
                       testName,
                       className,
                    }
                  : {},
               headers: {
                  Authorization: localStorage.getItem('token'),
               },
            });

            const data = response.data;
            setShowListAddQuestionBank(data.obj);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      },
      [testName, className],
   );

   const HandleShowlistQuestionbank = async () => {
      setTestName();
      setClassName();
      fetchDataListQuestionBank();
   };

   console.log(showListAddQuestionBank);

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
                  onSubmit={handleSubmit}
               >
                  <div className="element__wrapper">
                     <Form.Item name="testName" rules={[{ required: true, message: 'Hãy chọn môn!' }]}>
                        <Select defaultValue="Môn thi" onChange={(value) => setTestName(value)}>
                           <Option value="Toán">Toán</Option>
                           <Option value="Lý">Lý</Option>
                           <Option value="Hóa">Hóa</Option>
                        </Select>
                     </Form.Item>

                     <Form.Item name="className" rules={[{ required: true, message: 'Hãy chọn khối!' }]}>
                        <Select defaultValue="Khối" onChange={(value) => setClassName(value)}>
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
                     <Form.Item name="startTime">
                        <TimePicker placeholder="Chọn thời gian" className="time-picker" />
                     </Form.Item>
                     <Form.Item name="startDate">
                        <DatePicker placeholder="Chọn ngày" className="time-picker" />
                     </Form.Item>
                  </div>

                  <div className="flex">
                     <div className=" mt-2 bg-[#2b62a0] text-white w-2/5 text-center rounded">
                        <button className="p-1" onClick={HandleShowlistExamBank}>
                           Chọn đề thi có sẵn
                        </button>
                     </div>
                     <div className="ml-4 mt-2 bg-[#2b62a0] text-white w-3/5 text-center rounded">
                        <button className="p-1" onClick={HandleShowlistQuestionbank}>
                           Chọn câu hỏi trong ngân hàng
                        </button>
                     </div>
                  </div>

                  {/* <Form.Item>
                     <Button
                        type="primary"
                        loading={this.state.isLoading}
                        className="sign__up"
                        htmlType="submit"
                        disabled={this.state.questions.length < 1 ? true : false}
                     >
                        {this.state.isLoading ? 'Loading...' : 'Hoàn Tất'}
                     </Button>
                  </Form.Item> */}
               </Form>
            </Col>
         </Row>
      </>
   );
}

export default QuestionBankCreateTest;
