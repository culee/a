import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddQuestion from './addQuestion/AddQuestion';
import ListQuestionBank from './listQuestion/ListQuestionBank';
import NavbarQuestion from './componentQuestion/NavbarQuestion';

const QuestionBank = () => {
   return (
      <div>
         <Router>
            <div className="flex ">
               <div>
                  <NavbarQuestion />
               </div>
               <div className="w-3/4">
                  <Switch>
                     <Route path="/add-question" component={AddQuestion} />
                     <Route path="/list-question" component={ListQuestionBank} />
                  </Switch>
               </div>
            </div>
         </Router>
      </div>
   );
};

export default QuestionBank;
