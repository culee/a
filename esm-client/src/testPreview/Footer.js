import React from 'react';
import { Row, Modal, Col, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const Footer = ({ handleFooterButtons, handleSubmitTest }) => {
   const { confirm } = Modal;

   const handleNext = (e) => {
      handleFooterButtons(e.currentTarget.classList[0]);
   };

   const submitTest = () => {
      handleSubmitTest();
   };

   const submitExam = () => {
      confirm({
         title: 'Bạn có chắc chắn kết thúc bài làm?',
         icon: <ExclamationCircleOutlined />,
         content: 'Click OK để thoát!',
         onOk() {
            submitTest();
         },
         onCancel() {
            console.log('Cancel');
         },
      });
   };

   return (
      <>
         <div className="footer__wrapper">
            <div className="left__footer">
               <div className="previous__question box" onClick={(e) => handleNext(e)}>
                  Previous
               </div>
               <div className="flag__question box" onClick={(e) => handleNext(e)}>
                  Flag
               </div>
               <div className="next__question box" onClick={(e) => handleNext(e)}>
                  Next
               </div>
            </div>
            <div className="right__footer">
               <div className="end__test box" onClick={submitExam}>
                  End exam
               </div>
            </div>
         </div>
      </>
   );
};

export default Footer;
