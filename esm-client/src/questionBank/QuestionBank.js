import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddQuestion from './addQuestion/AddQuestion';
import ListQuestionBank from './listQuestion/ListQuestionBank';
import NavbarQuestion from './componentQuestion/NavbarQuestion';
import AddExamBank from './examBank/AddExamBank';
import ListExamBank from './examBank/ListExamBank';

const QuestionBank = () => {
   return (
      <div>
         <div className=" w-screen h-screen">
            <Router>
               <div>
                  <div>
                     <NavbarQuestion />
                  </div>
                  <div className="">
                     <Switch>
                        <Route path="/add-question" component={AddQuestion} />
                        <Route path="/list-question" component={ListQuestionBank} />
                        <Route path="/add-exam-bank" component={AddExamBank} />
                        <Route path="/list-exam-bank" component={ListExamBank} />
                     </Switch>
                  </div>
               </div>
            </Router>
         </div>
      </div>
   );
};

export default QuestionBank;
