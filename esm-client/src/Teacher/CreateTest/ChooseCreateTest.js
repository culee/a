import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
function ChooseCreateTest() {
   return (
      <div>
         <div className="container-choose">
            <h3 className="choose-text">Chọn hình thức tạo bài kiểm tra</h3>
            <div className="block-choose">
               <div className="btn-choose">
                  <Link to="/create-test">Tự tạo bài kiểm tra mới</Link>
               </div>
               <div className="btn-choose">
                  <Link to="/create-exam-question-bank">Tạo bài kiểm tra từ ngân hàng câu hỏi</Link>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ChooseCreateTest;
