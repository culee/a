import React, { memo, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';
import QuestionItem from './QuestionItem/QuestionItem';
import { Button } from 'antd';
/**
 *
 * @param props {
 *  isOpen: boolean;
 *  searchParams?: {testName?: string; className?: string;};'
 *  onClose: () => void;
//  *  form: Form.useForm; //antd
 * }
 */

/**
 *
 * SearchQuestionData {
 *      answer: number;
 *      className: string;
 *      description: string;
 *      level: string;
 *      options: {option: string}[];
 *      teacherId: string;
 *      terms: string;
 *      testName: string;
 *      _id: string;
 * }
 */

const QuestionBank = ({ isOpen, searchParams, onClose, onSelected }) => {
   const [questions, setQuestions] = useState([]); // SearchQuestionData[]
   const [selectedQuestionsId, setSelectedQuestionsId] = useState({}); //  Record<string, boolean>
   ///Call API list question bank
   const fetchDataListQuestionBank = useCallback(async () => {
      try {
         const response = await axios.get('/question/search', {
            params: searchParams,
            headers: {
               Authorization: localStorage.getItem('token'),
            },
         });

         const data = response.data;
         setQuestions(data.obj);
      } catch (error) {
         console.log(error);
      }
   }, [searchParams]);

   const handleAddQuestions = useCallback(() => {
      const questionsFilter = questions.filter((item) => selectedQuestionsId[item._id]);
      const quest = questionsFilter.map((item) => ({
         description: item.description,
         level: item.level,
         options: item.options,
      }));
      const answers = questionsFilter.map((item) => item.answer);

      onSelected({
         answers,
         questions: quest,
      });
      onClose();
   }, [questions, selectedQuestionsId]);

   useEffect(() => {
      if (isOpen) {
         fetchDataListQuestionBank();
      }
   }, [isOpen]);

   return (
      <>
         {isOpen && (
            <div className="ques_backdrop" onClick={onClose}>
               <div className="ques_dialog-container" onClick={(e) => e.stopPropagation()}>
                  <div className="ques_dialog-title">Chọn câu hỏi trong ngân hàng câu hỏi</div>
                  <div className="ques_dialog-content">
                     {questions.map((item, index) => (
                        <>
                           <QuestionItem
                              key={item._id}
                              index={index}
                              data={item}
                              onSelected={(id, checked) => {
                                 setSelectedQuestionsId((value) => ({ ...value, [id]: checked }));
                              }}
                           />
                        </>
                     ))}
                  </div>
                  <div className="ques_dialog-actions">
                     <Button
                        type="primary"
                        disabled={Object.values(selectedQuestionsId).filter((val) => val).length === 0}
                        onClick={handleAddQuestions}
                     >
                        Thêm
                     </Button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default memo(QuestionBank);
