import React from 'react';
import { Row, Col, Divider, Progress } from 'antd';
import { connect } from 'react-redux';
import './ShowResult.css';
import Chart from 'react-google-charts';

function ShowResult(props) {
   const { testName, date } = props.selectedTest;
   console.log(props.selectedTest);
   const testInfo = props.selectedTest[0];
   let marks, rightAnswers, submitMinutes, totalMarks, wrongAnswers, totalAttempt;
   // let name

   if (testInfo) {
      marks = testInfo.correct;
      // name = testInfo.name;
      rightAnswers = testInfo.correct;
      submitMinutes = testInfo.submitMinutes;
      totalMarks = testInfo.totalMarks;
      wrongAnswers = testInfo.wrong;
      totalAttempt = rightAnswers - -wrongAnswers;
   }
   const submitDate = new Date(date);

   return (
      <>
         <div className="container dashboard">
            <Row gutter={[48, 10]} justify="center">
               <Col className="gutter-row" xs={24} sm={24} md={14} xl={14}>
                  <div className="result__wrapper">
                     <div className="result__wrapper__header">
                        {/* <div className="result__heading">
                  <div className="result__test__name">Name: </div>
                  <div className="result__test__name__field">{name}</div>
                </div> */}
                        <div className="result__heading">
                           <div className="result__test__name">Bài kiểm tra môn: </div>
                           <div className="result__test__name__field">{testName}</div>
                        </div>
                        <div className="result__heading">
                           <div className="result__test__name">Thời gian làm: </div>
                           <div className="result__test__name__field">{submitMinutes ? submitMinutes : 'XX'} Phút</div>
                        </div>
                        <div className="result__heading">
                           <div className="result__test__name">Ngày hoàn thành: </div>
                           <div className="result__test__name__field">{submitDate.toLocaleDateString('vi-VN')}</div>
                        </div>
                     </div>
                     <Divider />
                     <div className="result__wrapper__body">
                        <div className="percentage">
                           <div className="percentage__heading">Điểm của bạn</div>
                           <Progress percent={Math.floor((marks / totalMarks) * 100)} status="active" />
                        </div>
                        <div className="marks__info">
                           <div className="marks__chart">
                              <Chart
                                 width={'100%'}
                                 height={'100%'}
                                 chartType="PieChart"
                                 loader={<div>Loading Chart</div>}
                                 data={[
                                    ['Task', 'Hours per Day'],
                                    ['Đúng', marks / 10],
                                    ['Sai', totalMarks / 10 - marks / 10],
                                 ]}
                                 options={{
                                    title: 'Biểu đồ điểm',

                                    pieHole: 0.45,
                                 }}
                                 rootProps={{ 'data-testid': '3' }}
                              />
                           </div>
                           <div className="marks">
                              <h2 className="inlarge">
                                 Điểm : {testInfo.point || 0} / {testInfo.outOfMarks || 0}{' '}
                              </h2>
                              <div className="marksBox">
                                 <div className="obtained__marks">
                                    {marks} / {totalMarks}
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="attempted">
                           <div className="total__attempted">
                              <div className="percentage">
                                 <div className="percentage__heading">Số câu hỏi: {totalAttempt} </div>
                                 <Progress percent={Math.floor((totalAttempt / totalMarks) * 100)} status="active" />
                              </div>
                           </div>
                           <div className="correct__attempted">
                              <div className="percentage">
                                 <div className="percentage__heading">Câu trả lời đúng: {rightAnswers}</div>
                                 <Progress percent={Math.floor((rightAnswers / totalMarks) * 100)} status="active" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </Col>
            </Row>
         </div>
      </>
   );
}

const mapStateToProps = (state) => {
   return {
      selectedTest: state.selectedTest.selectedTestResultData,
   };
};

export default connect(mapStateToProps, null)(ShowResult);
