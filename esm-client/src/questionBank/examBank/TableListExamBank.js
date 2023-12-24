import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { FaEye } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import './AddExamBank.css';
import DialogConfirm from '../../components/DialogConfirm/DialogConfirm';
import QuestionDetailModal from '../listQuestion/QuestionTable/QuestionDetailModal/QuestionDetailModal';
import { notification } from 'antd';

const TableListExamBank = ({ dataListExambank }) => {
   const [isDeleting, setIsDeleting] = useState(false);

   const [selectedQuestion, setSelectedQuestion] = useState(null);

   const [questionIdDelete, setQuestionIdDelete] = useState(null);

   const [dataList, setDataList] = useState([]);

   const handleDeleteQuestion = useCallback(async () => {
      try {
         setIsDeleting(true);
         const response = await axios.delete(`/exams/delete-exam/${questionIdDelete}`, {
            headers: {
               Authorization: localStorage.getItem('token'),
            },
         });

         const data = response.data;
         setDataList((value) => value.filter((item) => item._id !== questionIdDelete));
         setIsDeleting(false);
         setQuestionIdDelete(null);
         notification['success']({
            message: 'Xóa câu hỏi thành công.',
            description: 'SUCCESS',
            duration: 3,
         });
      } catch (error) {
         setIsDeleting(false);
         notification['error']({
            message: 'Xóa câu hỏi thất bại',
            description: 'ERROR',
            duration: 3,
         });
      }
   }, [questionIdDelete]);

   const handleUpdateData = useCallback((data) => {
      setDataList((value) => value.map((item) => (item._id === data._id ? { ...item, ...data } : item)));
      setSelectedQuestion(null);
   }, []);

   useEffect(() => {
      if (dataListExambank) {
         setDataList(dataListExambank);
      }
   }, [dataListExambank]);

   const countQuestionsByLevel = (questions, level) => {
      return questions.filter((question) => question.level.trim().toLowerCase() === level.trim().toLowerCase()).length;
   };

   const countEasyQuestions = (questions) => countQuestionsByLevel(questions, 'Easy');
   // const countDifficultQuestions = (questions) => countQuestionsByLevel(questions, 'Difficult');
   // const countMediumQuestions = (questions) => countQuestionsByLevel(questions, 'Medium');

   return (
      <div>
         <DialogConfirm
            isOpen={Boolean(questionIdDelete)}
            onClose={() => setQuestionIdDelete(null)}
            onOk={handleDeleteQuestion}
            title="Mục xóa câu hỏi"
            content="Bạn có chắc chắn là muốn xóa câu hỏi này?"
            disabled={isDeleting}
         />
         <QuestionDetailModal
            data={selectedQuestion}
            onClose={() => setSelectedQuestion(null)}
            onUpdateSuccess={handleUpdateData}
         />
         <div className="flex items-center justify-center">
            <table className="">
               <thead>
                  <tr className="border-b-2 border-[#aaaa] bg-[#98bfe1] rounded-sm">
                     <td className="flex">
                        <div className="qt_item  min-w-10">
                           <p className="header-item">STT</p>
                        </div>
                        <div className="qt_item min-w-16">
                           <p className="qt_header-item">Môn</p>
                        </div>
                        <div className="qt_item min-w-16">
                           <p className="qt_header-item">Khối</p>
                        </div>
                        <div className="qt_item min-w-24">
                           <p className="qt_header-item">Tiêu đề kiểm tra</p>
                        </div>
                        <div className="qt_item min-w-12">
                           <p className="qt_header-item">Số câu hỏi</p>
                        </div>

                        <div className="qt_item min-w-16">
                           <p className="qt_header-item">Số câu hỏi dễ</p>
                        </div>
                        <div className="qt_item min-w-20">
                           <p className="qt_header-item">Số câu hỏi trung bình</p>
                        </div>
                        <div className="qt_item min-w-16">
                           <p className="qt_header-item">Số câu hỏi khó</p>
                        </div>

                        <div className="qt_item qt_action-item">
                           <p className="qt_header-item">Action</p>
                        </div>
                     </td>
                  </tr>
               </thead>
               <tbody>
                  {dataList?.length === 0 ? (
                     <div className="text-center"> Không có bài thi nào </div>
                  ) : (
                     <>
                        {dataList?.map((item, index) => (
                           <tr key={item._id} className="flex qt_row">
                              <td className="qt_item  min-w-10">
                                 <p>{index + 1}</p>
                              </td>
                              <td className="qt_item min-w-16">
                                 <p className={`${item.testName} `}>{item.testName}</p>
                              </td>
                              <td className="qt_item min-w-16">
                                 <p>{item.className}</p>
                              </td>
                              <td className="qt_item min-w-24">
                                 <p>{item.category}</p>
                              </td>
                              <td className="qt_item min-w-12">
                                 <p className="">{item.answers.length}</p>
                              </td>
                              <td className="qt_item min-w-16">
                                 {/* <p className="">{(questions) => countQuestionsByLevel(questions, 'Easy')}</p> */}
                                 <p>{countEasyQuestions}</p>
                              </td>
                              <td className="qt_item min-w-20">
                                 {/* <p className="">{countQuestionsByLevel(dataList.item, 'Medium')}</p> */}
                              </td>
                              <td className="qt_item min-w-16">
                                 {/* <p className="">{countQuestionsByLevel(dataList.item, 'Difficult ')}</p> */}
                              </td>
                              {/* <td className="qt_item min-w-16"> */}
                              {/* <p className="">{console.log(item.questions, 'Difficult ')}</p> */}
                              {/* <p> {questionCounts.easy}</p> */}
                              {/* </td> */}
                              <td className="qt_item flex gap-4 justify-center qt_action-item">
                                 <FaEye color="#669cc9" className="cursor-pointer" />
                                 <FaTrash
                                    color="#bf4646"
                                    className="cursor-pointer"
                                    onClick={() => setQuestionIdDelete(item._id)}
                                 />
                              </td>
                           </tr>
                        ))}
                     </>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default TableListExamBank;
