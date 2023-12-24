import './index.css';
import React, { useCallback, useState } from 'react';
import { Row, Col, Form, Input, Select, notification, TimePicker, DatePicker } from 'antd';
import './index.css';
import ExamBank from './ExamBank/ExamBank';
import SelectedQuestion from './SelectedQuestion/SelectedQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { submitTest } from '../../actions/TeacherActions';
import QuestionBank from './QuestionBank/QuestionBank';

function QuestionBankCreateTest() {
   const [form] = Form.useForm();
   const dispatch = useDispatch();
   const teacherId = useSelector((state) => state.auth.profileID);
   const { Option } = Select;
   const [isLoading, setIsLoading] = useState(false);
   const [isOpenExamBank, setIsOpenExamBank] = useState(false);
   const [isOpenQuestionBank, setIsOpenQuestionBank] = useState(false);
   const [selectedQuestionData, setSelectedQuestionData] = useState(null);
   console.log(selectedQuestionData);
   const [testName, setTestName] = useState();
   const [className, setClassName] = useState();

   const submitForm = useCallback(
      async (values) => {
         const { testName, category, className, section, minutes, outOfMarks } = values;
         const startTime = `${values.startDate.format('YYYY-MM-DD')}T${values.startTime.format('HH:mm:ss')}`;

         const sendData = {
            teacherId,
            testName,
            category,
            className,
            section,
            rules: [],
            testCreated: false,
            minutes,
            outOfMarks,
            questions: [],
            answers: [],
            startTime,
         };

         if (selectedQuestionData) {
            sendData.questions = selectedQuestionData.questions;
            sendData.answers = selectedQuestionData.answers;
         }

         if (values.endDate) {
            sendData.endAt = `${values.endDate.format('YYYY-MM-DD')}T${values.endTime.format('HH:mm:ss')}`;
         }

         setIsLoading(true);
         dispatch(submitTest(sendData));
         notification['success']({
            message: 'Tạo bài kiểm tra thành công.',
            description: 'SUCCESS',
            duration: 3,
         });
         setIsLoading(false);
         form.resetFields([
            'testName',
            'className',
            'section',
            'category',
            'outOfMarks',
            'minutes',
            'startTime',
            'startDate',
            'endTime',
            'endDate',
         ]);
         setClassName('');
         setTestName('');
         setSelectedQuestionData(null);
      },
      [selectedQuestionData, teacherId, dispatch, submitTest],
   );

   return (
      <>
         <Row justify="center" align="middle">
            <Col xs={22} sm={22} md={10} lg={10} className="signup__container">
               <p className="sub-title__signup"> 🎓 Bài kiểm tra</p>
               <Form
                  form={form}
                  name="basic"
                  className="create__test__form"
                  initialValues={{
                     remember: true,
                  }}
                  onFinish={submitForm}
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
                  <div className="flex">
                     <div className=" mt-2 bg-[#2b62a0] text-white w-2/5 text-center rounded">
                        <button type="button" className="p-1" onClick={() => setIsOpenExamBank((value) => !value)}>
                           Chọn đề thi có sẵn
                        </button>
                     </div>
                     <div className="ml-4 mt-2 bg-[#2b62a0] text-white w-3/5 text-center rounded">
                        <button type="button" className="p-1" onClick={() => setIsOpenQuestionBank((value) => !value)}>
                           Chọn câu hỏi trong ngân hàng
                        </button>
                     </div>
                  </div>

                  {!!selectedQuestionData && !!selectedQuestionData.questions && (
                     <>
                        <div className="flex justify-center">
                           <button
                              className={`mt-2 text-white text-center rounded p-2 w-full ${
                                 isLoading ? 'pointer-events-none bg-[#ccc]' : 'bg-[#2b62a0]'
                              }`}
                              type="submit"
                           >
                              Hoàn tất
                           </button>
                        </div>
                        {selectedQuestionData.questions.map((item, index) => (
                           <SelectedQuestion
                              data={{
                                 index,
                                 description: item.description,
                                 options: item.options,
                                 answer: selectedQuestionData.answers[index],
                              }}
                           />
                        ))}
                     </>
                  )}

                  <div className="flex justify-center">
                     <button
                        className={`mt-2 text-white text-center rounded p-2 w-full ${
                           isLoading ? 'pointer-events-none bg-[#ccc]' : 'bg-[#2b62a0]'
                        }`}
                        type="submit"
                     >
                        Hoàn tất
                     </button>
                  </div>
               </Form>
               <ExamBank
                  isOpen={isOpenExamBank}
                  searchParams={{ testName, className }}
                  onClose={() => setIsOpenExamBank(false)}
                  onSelected={setSelectedQuestionData}
               />
               <QuestionBank
                  isOpen={isOpenQuestionBank}
                  searchParams={{ testName, className }}
                  onClose={() => setIsOpenQuestionBank(false)}
                  onSelected={(data) => setSelectedQuestionData(data)}
               />
            </Col>
         </Row>
      </>
   );
}

export default QuestionBankCreateTest;
