import React, { useState } from 'react';
import { Row, Modal, Col, Button } from 'antd';
import { connect } from 'react-redux';
import './TestInstruction.css';
import { FaArrowCircleRight } from 'react-icons/fa';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

function TestInstruction(props) {
   const history = useHistory();
   const { confirm } = Modal;
   const { tests } = props;
   const { outOfMarks, questions, minutes, category, className, testName, rules, _id: testID } = props.selectedTest;

   let testRules,
      attempted = false;

   if (rules) {
      testRules = rules;
   }

   tests.map((test, index) => {
      if (test.testName === testName) {
         attempted = true;
      }
   });

   const handleButtonClick = () => {
      confirm({
         title: 'Bạn có chắc chắn làm ngay bây giờ?',
         icon: <ExclamationCircleOutlined />,
         content: 'Click OK để bắt đầu!',
         onOk() {
            console.log('OK');
            history.push('/start-test');
         },
         onCancel() {
            console.log('Cancel');
         },
      });
   };

   return (
      <>
         <div className="container dashboard">
            <Row gutter={[48, 10]} justify="center">
               <Col className="gutter-row" xs={24} sm={24} md={22} xl={22}>
                  <div className="instructions__wrapper">
                     <Row justify="center">
                        <Col className="gutter-row" xs={24} sm={24} md={12} xl={12}>
                           <div className="instructions__wrapper__left">
                              <p className="instructions__heading">Test Instructions</p>
                              <div className="test__info">
                                 <div className="test__subheadings">
                                    <div className="test__fields">Môn:</div>
                                    <div className="test__fields__Value">{testName}</div>
                                 </div>

                                 <div className="test__subheadings">
                                    <div className="test__fields">Số câu hỏi:</div>
                                    <div className="test__fields__Value">{questions?.length}</div>
                                 </div>

                                 <div className="test__subheadings">
                                    <div className="test__fields">Thời gian làm bài:</div>
                                    <div className="test__fields__Value">{minutes} Phút</div>
                                 </div>

                                 <div className="test__subheadings">
                                    <div className="test__fields">Hạng mục:</div>
                                    <div className="test__fields__Value">{category}</div>
                                 </div>

                                 <div className="test__subheadings">
                                    <div className="test__fields">Tổng điểm:</div>
                                    <div className="test__fields__Value">{outOfMarks}</div>
                                 </div>
                              </div>
                              <div className="test__instructions">
                                 <p className="test__instructions__subheading">Hướng dẫn</p>
                                 <div className="instructions">
                                    {testRules?.map((rule, index) => (
                                       <p className="rule" key={index}>
                                          <FaArrowCircleRight /> <span className="rule__description">{rule.value}</span>
                                       </p>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={12} xl={12}>
                           <div className="instructions__wrapper__right">
                              <div className="ems__log__wrapper">
                                 <img src="/ems-logo.png" className="ems__logo" alt="ems-logo" />
                              </div>
                              <p className="navigation__instructions__heading">Các nút</p>
                              <div className="navigation__instructions">
                                 <div className="navigation__buttons__Feature">
                                    <Button style={{ backgroundColor: '#449d44' }} className="btn-instructions">
                                       Next
                                    </Button>
                                    <p className="button__description">Next: Chuyển sang câu hỏi tiếp theo</p>
                                 </div>
                                 <div className="navigation__buttons__Feature">
                                    <Button style={{ backgroundColor: '#449d44' }} className="btn-instructions">
                                       Previous
                                    </Button>
                                    <p className="button__description">Previous: Quay lại câu hỏi trước đó</p>
                                 </div>
                                 <div className="navigation__buttons__Feature">
                                    <Button style={{ backgroundColor: '#ec971f' }} className="btn-instructions">
                                       Flag
                                    </Button>
                                    <p className="button__description">Flag: Đánh dấu câu hỏi</p>
                                 </div>
                                 <div className="navigation__buttons__Feature">
                                    <Button style={{ backgroundColor: '#ff4d4f' }} className="btn-instructions">
                                       End Test
                                    </Button>
                                    <p className="button__description">End Test:Kết thúc bài thi</p>
                                 </div>
                              </div>
                              <div className="select__button">
                                 <Button type="primary" onClick={handleButtonClick} disabled={attempted}>
                                    Continue
                                 </Button>
                              </div>
                           </div>
                        </Col>
                     </Row>
                  </div>
               </Col>
            </Row>
         </div>
      </>
   );
}

const mapStateToProps = (state) => {
   return {
      selectedTest: state.selectedTest.selectedTestData,
      tests: state.tests.attemptedTest,
   };
};

export default connect(mapStateToProps, null)(TestInstruction);
