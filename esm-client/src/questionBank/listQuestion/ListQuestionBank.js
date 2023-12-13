import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { Form, Button, Select } from 'antd';
import './listquestionbank.css';

import QuestionTable from './QuestionTable/QuestionTable';

const ListExamQuestionBank = ({ fetchDataQuestion }) => {
    const { Option } = Select;
    const [questionData, setQuestionData] = useState([]);
    const [testName, setTestName] = useState('Môn Học');
    const [className, setClassName] = useState('Khối');
    const [section, setSection] = useState('Lớp');

    const fetchData = useCallback(
        async (searchWithParams = true) => {
            try {
                const response = await axios.get('/question/search', {
                    params: searchWithParams
                        ? {
                              testName,
                              className,
                              section,
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
        [testName, className, section]
    );

    const handleSearch = (values) => {
        console.log('search');
        const { testName, className, section } = values;
        setTestName(testName);
        setClassName(className);
        setSection(section);
        fetchData();
    };

    const clearInput = () => {
        setTestName('Môn Học');
        setClassName('');
        setSection('');
    };

    useEffect(() => {
        fetchData(false);
    }, []);

    return (
        <div>
            <div className='container-list-questionbank'>
                <div className='header-list-questionbank'>
                    <Form onFinish={handleSearch}>
                        <div className=''>
                            <div className='w-3/5 flex ml-4'>
                                <Form.Item name='testName'>
                                    <Select defaultValue={testName}>
                                        <Option value='Toán'>Toán</Option>
                                        <Option value='Lý'>Lý</Option>
                                        <Option value='Hóa'>Hóa</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item name='className'>
                                    <Select defaultValue={className}>
                                        <Option value='X'>X</Option>
                                        <Option value='XI'>XI</Option>
                                        <Option value='XII'>XII</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item name='section'>
                                    <Select defaultValue={section}>
                                        <Option value='A'>A</Option>
                                        <Option value='B'>B</Option>
                                        <Option value='C'>C</Option>
                                        <Option value='D'>D</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType='submit'>Tìm Kiếm</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={clearInput}>Clear</Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className='w-full'>
                    <div className='table-list-questionbank '>
                        <QuestionTable list={questionData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListExamQuestionBank;
