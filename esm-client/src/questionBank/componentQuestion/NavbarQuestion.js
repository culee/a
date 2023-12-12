import React from 'react';
import { Link } from 'react-router-dom';
import '../addQuestion/addquestion.css';

const NavbarQuestion = () => {
   return (
      <div className="ml-5 mt-5">
         <nav className="nav-list-question text-center">
            <ul>
               <li>
                  <Link to="/add-question">Thêm câu hỏi vào QuestionBank</Link>
               </li>
               <li>
                  <Link to="/list-question">Danh sách các câu hỏi</Link>
               </li>
               <li>
                  <Link to="/list-exam-bank">Danh sách thi thử</Link>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default NavbarQuestion;
