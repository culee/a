import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Form, Input, Button, Select, notification } from 'antd';
import './Signup.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpUser, accountCreated } from '../actions/authActions';
import { Link } from 'react-router-dom';

function Signup(props) {
   const [showSelect, setShowSelect] = useState(false);
   const history = useHistory();
   const { Option } = Select;
   const { isLoading } = props;

   const submitForm = (values) => {
      props.sendSignUpRequest(values);
      console.log(values);
   };

   const openNotification = () => {
      const args = {
         message: 'Đã tạo tài khoản',
         description: 'Bây giờ bạn có thể đăng nhập với tài khoản vừa tạo',
         duration: 3,
      };
      notification.open(args);
   };

   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   useEffect(() => {
      if (props.accountCreated) {
         openNotification();
         props.sendUserAccountCreated();
      }
   }, [props]);

   const handleSelect = (select, optionData) => {
      console.log(optionData);
      if (optionData.value === 'teacher') {
         setShowSelect(true);
      } else {
         setShowSelect(false);
      }
   };
   return (
      <>
         <Row justify="center" align="middle" className="hero">
            <Col xs={22} sm={22} md={8} lg={8} className="signup__container">
               <p className="sub-title__signup">🎓 EXAM</p>
               <Form
                  name="basic"
                  initialValues={{
                     remember: true,
                  }}
                  onFinish={submitForm}
                  onFinishFailed={onFinishFailed}
               >
                  <div className="element__wrapper">
                     <Form.Item
                        name="firstName"
                        rules={[
                           {
                              required: true,
                              message: 'Nhập họ',
                           },
                        ]}
                     >
                        <Input placeholder="Họ" />
                     </Form.Item>
                     <Form.Item
                        name="lastName"
                        rules={[
                           {
                              required: true,
                              message: 'Nhập tên!',
                           },
                        ]}
                     >
                        <Input placeholder="Tên" />
                     </Form.Item>
                  </div>
                  <Form.Item
                     name="email"
                     rules={[
                        {
                           required: true,
                           message: 'Vui lòng nhập email của bạn!',
                        },
                     ]}
                  >
                     <Input placeholder="abc@gmail.com" />
                  </Form.Item>
                  <Form.Item
                     name="password"
                     rules={[
                        {
                           required: true,
                           message: 'Vui lòng nhập mật khẩu!',
                        },
                     ]}
                  >
                     <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item
                     name="phone"
                     rules={[
                        {
                           required: true,
                           message: 'Please input your Phone Number!',
                        },
                     ]}
                  >
                     <Input type="tel" placeholder="0123456789" />
                  </Form.Item>

                  <div className="element__wrapper">
                     <Form.Item
                        name="role"
                        rules={[
                           {
                              message: 'Vui lòng chọn role!',
                           },
                        ]}
                     >
                        <Select defaultValue="Role" onSelect={handleSelect}>
                           <Option value="student">Student</Option>
                           <Option value="teacher">Teacher</Option>
                        </Select>
                     </Form.Item>

                     <Form.Item
                        name="section"
                        rules={[
                           {
                              message: 'Please input your section!',
                           },
                        ]}
                     >
                        <Select defaultValue="Lớp" disabled={showSelect}>
                           <Option value="A">A</Option>
                           <Option value="B">B</Option>
                           <Option value="C">C</Option>
                           <Option value="D">D</Option>
                        </Select>
                     </Form.Item>

                     <Form.Item
                        name="className"
                        rules={[
                           {
                              message: 'Please input your email!',
                           },
                        ]}
                     >
                        <Select defaultValue="Khối" disabled={showSelect}>
                           <Option value="X">X</Option>
                           <Option value="XI">XI</Option>
                           <Option value="XII">XII</Option>
                        </Select>
                     </Form.Item>
                  </div>
                  <div
                     className="link"
                     style={{
                        textAlign: 'center',
                        fontWeight: 500,
                        marginBottom: '15px',
                     }}
                  >
                     <Link to="/sigin">Bạn đã tạo tài khoản? Đăng nhập</Link>
                  </div>
                  <Form.Item>
                     <Button type="primary" className="sign__up" htmlType="submit" loading={isLoading}>
                        {!isLoading ? 'Đăng Kí' : 'Loading...'}
                     </Button>
                  </Form.Item>
               </Form>
            </Col>
         </Row>
      </>
   );
}

const mapStateToProps = (state) => {
   return {
      isAuthenticated: state.auth.isAuthenticated,
      isLoading: state.auth.isLoading,
      accountCreated: state.auth.accountCreated,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      sendSignUpRequest: (values) => dispatch(signUpUser(values)),
      sendUserAccountCreated: () => dispatch(accountCreated()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
