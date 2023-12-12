import { Link } from 'react-router-dom';
import './index.css';
import React, { Component, useState } from 'react';
import { Row, Col, Form, Input, Button, Select, notification } from 'antd';
import './index.css';
import { connect } from 'react-redux';
import Rules from './Rules';
import Questions from './Questions';
import RenderData from './RenderData';
import { submitTest, testCreatedFalse } from '../../actions/TeacherActions';

function QuestionBankCreateTest() {
   const handleSubmit = () => {};
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
                  onSubmit={handleSubmit}
               >
                  <div className="element__wrapper">
                     <Form.Item name="testName" rules={[{ required: true, message: 'Hãy chọn môn!' }]}>
                        <Select defaultValue="Môn thi">
                           <Option value="T">Toán</Option>
                           <Option value="L">Lý</Option>
                           <Option value="H">Hóa</Option>
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

                  <div className="flex">
                     <div className=" mt-2 bg-[#2b62a0] text-white w-2/5 text-center rounded">
                        <button className="p-1">Chọn đề thi có sẵn</button>
                     </div>
                     <div className="ml-4 mt-2 bg-[#2b62a0] text-white w-3/5 text-center rounded">
                        <button className="p-1">Chọn câu hỏi trong ngân hàng</button>
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
