import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Form, Button, Select } from 'antd';
import './listquestionbank.css';

import { FaEye } from 'react-icons/fa';
import { AiTwotoneDelete } from 'react-icons/ai';

import ShowQuestion from './ShowQuestion';

const ListExamQuestionBank = ({ fetchDataQuestion }) => {
   const { Option } = Select;
   const [modal, setModal] = useState(false);
   const dispatch = useDispatch();

   const [questionData, setQuestionData] = useState([]);
   const [testName, setTestName] = useState('Môn Học');
   const [className, setClassName] = useState('Khối');
   const [section, setSection] = useState('Lớp');

   const toggleModal = () => {
      setModal(!modal);
   };

   const fetchData = async () => {
      try {
         const response = await axios.get('/question/search', {
            params: {
               testName: testName,
               className: className,
               section: section,
            },
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });

         const data = response.data;
         setQuestionData(data.obj);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   const handleSearch = (values) => {
      const { testName, className, section } = values;
      setTestName(testName);
      setClassName(className);
      setSection(section);

      fetchDataQuestion({ testName, className, section });
   };

   const clearInput = () => {
      setTestName('Môn Học');
      setClassName('');
      setSection('');
   };

   useEffect(() => {
      fetchData();
   }, [fetchDataQuestion, testName, className, section, clearInput]);

   return (
      <div>
         <div className="container-list-questionbank">
            <div className="header-list-questionbank">
               <Form onFinish={handleSearch}>
                  <div className="">
                     <div className="w-3/5 flex ml-4">
                        <Form.Item name="testName">
                           <Select defaultValue={testName}>
                              <Option value="Toán">Toán</Option>
                              <Option value="Lý">Lý</Option>
                              <Option value="Hóa">Hóa</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item name="className">
                           <Select defaultValue={className}>
                              <Option value="X">X</Option>
                              <Option value="XI">XI</Option>
                              <Option value="XII">XII</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item name="section">
                           <Select defaultValue={section}>
                              <Option value="A">A</Option>
                              <Option value="B">B</Option>
                              <Option value="C">C</Option>
                              <Option value="D">D</Option>
                           </Select>
                        </Form.Item>
                        <Form.Item>
                           <Button htmlType="submit">Tìm Kiếm</Button>
                           <Button onClick={clearInput}>Clear</Button>
                        </Form.Item>
                     </div>
                  </div>
               </Form>
            </div>
            <div className="w-full">
               <div className="table-list-questionbank ">
                  <table className="border-separate border-spacing-y-1 shadow-[0_0_4px_6px_rgba(19,60,101,0.15)] rounded">
                     <thead className="">{/* ... existing code */}</thead>
                     <tbody>
                        {questionData?.map((question, index) => (
                           <tr key={index} className="text-center ">
                              {/* ... existing code */}
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
            {modal && <ShowQuestion />}
         </div>
      </div>
   );
};

export default ListExamQuestionBank;
