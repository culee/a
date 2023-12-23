import React from 'react';
import { Link } from 'react-router-dom';
import '../addQuestion/addquestion.css';

const NavbarQuestion = () => {
   return (
      <div className="ml-5 pt-3">
         <nav className="nav-list-question text-center">
            <ul className="flex gap-2 w-full m-auto">
               <li>
                  <Link to="/add-question">Thêm câu hỏi vào QuestionBank</Link>
               </li>
               <li>
                  <Link to="/list-question">Danh sách các câu hỏi</Link>
               </li>
               <li>
                  <Link to="/add-exam-bank">Tạo các đề thi mẫu</Link>
               </li>
               <li>
                  <Link to="/list-exam-bank">Danh sách các đề thi mẫu</Link>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default NavbarQuestion;
