import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Form, Button, Select, Input } from 'antd';
import RenderQuestionExam from './Component/RenderQuestionExam';
import { useAddListExam } from '../../useContext/Context';
import RenderaddExam from './Component/RenderaddExam';

import './AddExamBank.css';

const AddExamBank = () => {
   const { Option } = Select;
   const [questionData, setQuestionData] = useState([]);
   const [testName, setTestName] = useState();
   const [className, setClassName] = useState();

   const handleSearch = async () => {
      fetchData();
   };

   const fetchData = useCallback(
      async (searchWithParams = true) => {
         try {
            console.log(testName);
            console.log(className);
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
            setQuestionData(data.obj);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      },
      [testName, className],
   );

   const { addListExam } = useAddListExam();

   const handleSubmitExam = (value) => {
      console.log(addListExam);

      const { testName, className, category } = value;

      var questions = addListExam.map((exam) => ({
         level: exam.level,
         description: exam.description,
         options: exam.options,
      }));
      const answers = addListExam.map((question) => question.answer);

      const sendExam = { questions, answers, testName, className, category };

      const handleSendExam = async () => {
         try {
            const response = await axios.post('/exams/create-test-temp', sendExam, {
               headers: {
                  Authorization: localStorage.getItem('token'), // Include your authorization token if needed
               },
            });

            console.log('Exam sent successfully:', response.data);
            // Handle success, e.g., update UI or show a success message
         } catch (error) {
            console.error('Error sending exam:', error);
            // Handle error, e.g., show an error message
         }
      };

      handleSendExam();
   };

   const clearData = async () => {
      setTestName();
      setClassName();

      fetchData();
   };

   useEffect(() => {
      fetchData(false);
   }, []);

   console.log(questionData);

   return (
      <div className="flex w-screen h-screen">
         <div className="w-3/5 h-screen border-r-indigo-500 shadow-[inset_-2px_0px_0px_#bfb4b4aa]">
            <h2 className="text-center text-sm font-medium">Danh sách các câu hỏi</h2>
            <div className="min-h-14">
               <Form>
                  <div className="">
                     <div className="w-4/5 flex ml-4">
                        <Form.Item name="testName">
                           <Select defaultValue="Môn Học" onChange={(value) => setTestName(value)}>
                              <Option value="Toán">Toán</Option>
                              <Option value="Lý">Lý</Option>
                              <Option value="Hóa">Hóa</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item name="className">
                           <Select defaultValue="Khối" onChange={(value) => setClassName(value)}>
                              <Option value="X">X</Option>
                              <Option value="XI">XI</Option>
                              <Option value="XII">XII</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item>
                           <Button onClick={handleSearch}>Tìm Kiếm</Button>
                        </Form.Item>
                        <Form.Item>
                           <Button onClick={clearData}>Xóa bỏ các mục đã chọn</Button>
                        </Form.Item>
                     </div>
                  </div>
               </Form>
            </div>
            <RenderQuestionExam questionData={questionData} />
         </div>
         <div className="w-2/5 h-screen">
            <h2 className="text-center text-sm font-medium">Tạo đề thi</h2>
            <>
               <Form onFinish={handleSubmitExam}>
                  <div className="min-h-14">
                     <div className="w-3/5 flex ml-4">
                        <Form.Item name="testName" rules={[{ required: true, message: 'Hãy chọn môn!' }]}>
                           <Select defaultValue="Môn Học">
                              <Option value="Toán">Toán</Option>
                              <Option value="Lý">Lý</Option>
                              <Option value="Hóa">Hóa</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item name="className" rules={[{ required: true, message: 'Hãy chọn khối!' }]}>
                           <Select defaultValue="Khối">
                              <Option value="X">X</Option>
                              <Option value="XI">XI</Option>
                              <Option value="XII">XII</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item>
                           <Button htmlType="submit">Tạo đề thi</Button>
                        </Form.Item>
                     </div>
                     <div className="w-2/5 ml-4">
                        <Form.Item
                           name="category"
                           rules={[
                              {
                                 required: true,
                                 message: 'Vui lòng nhập hạng mục',
                              },
                           ]}
                        >
                           <Input placeholder="Hạng mục kiểm tra" className="input" type="text" />
                        </Form.Item>
                     </div>
                  </div>
                  <div>
                     <RenderaddExam />
                  </div>
               </Form>
            </>
         </div>
      </div>
   );
};

export default AddExamBank;
