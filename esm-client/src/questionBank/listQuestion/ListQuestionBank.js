import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { Form, Button, Select, Input } from 'antd';
import './listquestionbank.css';

import QuestionTable from './QuestionTable/QuestionTable';

const ListExamQuestionBank = ({ fetchDataQuestion }) => {
   const { Option } = Select;
   const [questionData, setQuestionData] = useState([]);
   const [testName, setTestName] = useState();
   const [className, setClassName] = useState();
   const [terms, setTerms] = useState();

   const handleSearch = async () => {
      fetchData();
   };

   const fetchData = useCallback(
      async (searchWithParams = true) => {
         try {
            console.log(testName);
            console.log(terms);
            const response = await axios.get('/question/search', {
               params: searchWithParams
                  ? {
                       testName,
                       className,
                       terms,
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
      [testName, className, terms],
   );

   const clearData = async () => {
      setTestName();
      setClassName();
      fetchData();
   };

   useEffect(() => {
      fetchData(false);
   }, []);

   return (
      <div>
         <h1 className="text-center mt-3 font-bold text-base">Danh sách các câu hỏi có trong hệ thống</h1>
         <div className="container-list-questionbank">
            <div className="header-list-questionbank">
               <Form onFinish={handleSearch}>
                  <div className="">
                     <div className="w-3/5 flex ml-4">
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
                        <Form.Item name="terms">
                           <Input placeholder="Danh mục" onChange={(value) => setTerms(value.target.value)} />
                        </Form.Item>

                        <Form.Item>
                           <Button htmlType="submit">Tìm Kiếm</Button>
                        </Form.Item>
                        <Form.Item>
                           <Button onClick={clearData}>Xóa bỏ các mục đã chọn</Button>
                        </Form.Item>
                     </div>
                  </div>
               </Form>
            </div>
            <div className="w-full">
               <div className="table-list-questionbank ">
                  <QuestionTable list={questionData} />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ListExamQuestionBank;
