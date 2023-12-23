import { Form, Input, Button } from 'antd';
import React, { useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../actions/authActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Login(props) {
   const history = useHistory();

   const { isLoading } = props;

   useEffect(() => {
      if (props.isAuthenticated) {
         history.push('/');
      }
   }, [props]);

   const submitForm = (values) => {
      props.sendLoginRequest(values);
   };

   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };
   return (
      <>
         <Row justify="center" align="middle" className="hero">
            <Col xs={22} sm={22} md={6} lg={6} className="signin__container">
               <p className="sub-title">🎓 EXAM</p>

               <Form
                  name="basic"
                  initialValues={{
                     remember: true,
                  }}
                  onFinish={submitForm}
                  onFinishFailed={onFinishFailed}
               >
                  <Form.Item
                     name="email"
                     rules={[
                        {
                           required: true,
                           message: 'Vui lòng nhập email của bạn!',
                        },
                     ]}
                  >
                     <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                     name="password"
                     rules={[
                        {
                           required: true,
                           message: 'Vui lòng nhập password của bạn!',
                        },
                     ]}
                  >
                     <Input.Password placeholder="Password" />
                  </Form.Item>
                  <div
                     className="link"
                     style={{
                        textAlign: 'center',
                        fontWeight: 500,
                        marginBottom: '15px',
                     }}
                  >
                     <Link to="/signup">Bạn chưa có tài khoản? Đăng kí</Link>
                  </div>
                  <Form.Item>
                     <Button
                        type="primary"
                        className="sign__in"
                        style={{ minWidth: '44px' }}
                        loading={isLoading}
                        htmlType="submit"
                     >
                        {!isLoading ? 'Đăng Nhập' : 'Logging In'}
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
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      sendLoginRequest: (values) => dispatch(loginUser(values)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
