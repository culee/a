import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Row, Modal, Col, Button, notification } from 'antd';
import { connect } from 'react-redux';
import './TestInstruction.css';
import { FaArrowCircleRight } from 'react-icons/fa';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import { parseDate } from '../lib';

function TestInstruction(props) {
   const history = useHistory();
   const timer = useRef(0);
   const timerEnd = useRef(0);
   const { confirm } = Modal;
   const { tests } = props;
   const [disabledBtn, setDisabledBtn] = useState(true);
   const [restTime, setRestTime] = useState('00:00:00');

   const [showEndAt, setShowEndAt] = useState('00:00:00');

   const {
      outOfMarks,
      questions,
      minutes,
      category,
      testName,
      startTime,
      endAt,
      rules,
      _id: testID,
   } = props.selectedTest;

   let testRules;

   if (rules) {
      testRules = rules;
   }

   const attempted = useMemo(() => {
      return props.selectedTest?.attempted || false;
   }, [tests, testName]);

   const handleButtonClick = () => {
      confirm({
         title: 'Bạn có chắc chắn làm ngay bây giờ?',
         icon: <ExclamationCircleOutlined />,
         content: 'Click OK để bắt đầu!',
         onOk() {
            history.push('/start-test');
         },
         onCancel() {
            console.log('Cancel');
         },
      });
   };

   useEffect(() => {
      if (!startTime) {
         return;
      }
      if (timer.current) {
         window.clearInterval(timer.current);
      }
      timer.current = window.setInterval(() => {
         const rest = new Date(startTime).getTime() - new Date().getTime();
         if (rest <= 0) {
            setDisabledBtn(false);
            window.clearInterval(timer.current);
            return;
         }
         setDisabledBtn(true);
         const hours = Math.floor(rest / 3600000);
         const minutes = Math.floor((rest % 3600000) / 60000);
         const seconds = Math.floor((rest % 60000) / 1000);

         // Định dạng thời gian thành chuỗi
         const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
         setRestTime(formattedTime);
         console.log('run here');
      }, 1000);
   }, [startTime]);

   // check for endAt, if have endAt time,  this item will be hidden on list
   useEffect(() => {
      if (!endAt) {
         return;
      }
      if (timerEnd.current) {
         window.clearInterval(timerEnd.current);
      }
      const checkTime = () => {
         const duration = new Date(endAt).getTime() - new Date().getTime();

         if (duration <= 0) {
            window.clearInterval(timerEnd.current);
            setDisabledBtn(true);
            notification['error']({
               message: 'Hết thời gian có thể bắt đầu làm bài',
               description: 'ERROR',
               duration: 3,
            });
            window.setTimeout(() => {
               history.push('/attempt-test');
            }, 3000);
         } else {
            const hours = Math.floor(duration / 3600000);
            const minutes = Math.floor((duration % 3600000) / 60000);
            const seconds = Math.floor((duration % 60000) / 1000);

            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
               .toString()
               .padStart(2, '0')}`;

            setShowEndAt(formattedTime);
         }
      };

      checkTime();
      timerEnd.current = window.setInterval(() => {
         checkTime();
      }, 1000); // check time every 1s
   }, [endAt, history]);

   useEffect(() => {
      return () => {
         if (timer.current) {
            window.clearInterval(timer.current);
         }
         if (timerEnd.current) {
            window.clearInterval(timerEnd.current);
         }
      };
   }, []);

   return (
      <>
         <div className="container dashboard">
            <Row gutter={[48, 10]} justify="center">
               <Col className="gutter-row" xs={24} sm={24} md={22} xl={22}>
                  <div className="instructions__wrapper">
                     <Row justify="center">
                        <Col className="gutter-row" xs={24} sm={24} md={12} xl={12}>
                           <div className="instructions__wrapper__left">
                              <p className="instructions__heading">Exam Instructions</p>
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
                                 <div className="test__subheadings">
                                    <div className="test__fields">Thời gian bài thi bị ẩn:</div>
                                    <div className="test__fields__Value">{showEndAt}</div>
                                 </div>
                              </div>
                           </div>
                        </Col>
                        <Col className="gutter-row" xs={24} sm={24} md={12} xl={12}>
                           <div className="instructions__wrapper__right">
                              <div className="ems__log__wrapper">
                                 <img src="/ems-logo.png" className="ems__logo" alt="ems-logo" />
                              </div>
                              <p className="navigation__instructions__heading">Hướng dẫn các nút</p>
                              <div className="navigation__instructions">
                                 <div className="navigation__buttons__Feature">
                                    <Button
                                       style={{
                                          backgroundColor: '#449d44',
                                       }}
                                       className="btn-instructions"
                                    >
                                       Next
                                    </Button>
                                    <p className="button__description">Next: Chuyển sang câu hỏi tiếp theo</p>
                                 </div>
                                 <div className="navigation__buttons__Feature">
                                    <Button
                                       style={{
                                          backgroundColor: '#449d44',
                                       }}
                                       className="btn-instructions"
                                    >
                                       Previous
                                    </Button>
                                    <p className="button__description">Previous: Quay lại câu hỏi trước đó</p>
                                 </div>
                                 <div className="navigation__buttons__Feature">
                                    <Button
                                       style={{
                                          backgroundColor: '#ec971f',
                                       }}
                                       className="btn-instructions"
                                    >
                                       Flag
                                    </Button>
                                    <p className="button__description">Flag: Đánh dấu câu hỏi</p>
                                 </div>
                                 <div className="navigation__buttons__Feature">
                                    <Button
                                       style={{
                                          backgroundColor: '#ff4d4f',
                                       }}
                                       className="btn-instructions"
                                    >
                                       End exam
                                    </Button>
                                    <p className="button__description">End exam:Kết thúc bài thi</p>
                                 </div>
                              </div>
                              <div className="select__button">
                                 <Button type="primary" onClick={handleButtonClick} disabled={attempted || disabledBtn}>
                                    {attempted || disabledBtn ? restTime : `Continue`}
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
