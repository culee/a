import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import './QuestionTable.css';
import { FaEye } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import QuestionDetailModal from './QuestionDetailModal/QuestionDetailModal';
import DialogConfirm from '../../../components/DialogConfirm/DialogConfirm';
import axios from 'axios';
import { notification } from 'antd';

/**
 * @param list
 * {
    answers: number,
    className: string,
    description: string,
    level: string;
    options: {option: string}[] 
    section: string,
    teacherId: string,
    testName: string,
    _id: string,
} []
*/

const HEADERS = ['STT', 'Môn', 'Lớp', 'Câu hỏi', 'Action'];

const QuestionTable = ({ list }) => {
   const [selectedQuestion, setSelectedQuestion] = useState(null); // question or null
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [questionIdDelete, setQuestionIdDelete] = useState(null); // question is type string or null
   const [isDeleting, setIsDeleting] = useState(false);
   const [dataList, setDataList] = useState([]);

   const handleDeleteQuestion = useCallback(async () => {
      try {
         setIsDeleting(true);
         const response = await axios.delete(`/question/delete-question/${questionIdDelete}`, {
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
      if (list) {
         setDataList(list);
      }
   }, [list]);

   if (!list.length) {
      return <p>No data</p>;
   }
   return (
      <>
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
         <div className="qt_table-container">
            <div className="border-b-2 border-[#aaaa] bg-[#98bfe1] rounded-sm">
               <div className="flex">
                  <div className="qt_item">
                     <p className="header-item">STT</p>
                  </div>
                  <div className="qt_item min-w-12">
                     <p className="qt_header-item">Môn</p>
                  </div>
                  <div className="qt_item min-w-12">
                     <p className="qt_header-item">Khối</p>
                  </div>
                  <div className="qt_item min-w-20	">
                     <p className="qt_header-item">Danh mục</p>
                  </div>
                  <div className="qt_item min-w-20	">
                     <p className="qt_header-item">Độ khó</p>
                  </div>
                  <div className="qt_item qt_item-question">
                     <p className="qt_header-item ">Câu hỏi</p>
                  </div>
                  <div className="qt_item qt_action-item">
                     <p className="qt_header-item">Action</p>
                  </div>
               </div>
            </div>
            {dataList.map((item, index) => (
               <div key={item._id} className="flex qt_row">
                  <div className="qt_item">
                     <p>{index + 1}</p>
                  </div>
                  <div className="qt_item min-w-12">
                     <p className={`${item.testName} `}>{item.testName}</p>
                  </div>
                  <div className="qt_item min-w-12">
                     <p>{item.className}</p>
                  </div>
                  <div className="qt_item min-w-20">
                     <p>{item.terms}</p>
                  </div>
                  <div className="qt_item min-w-20">
                     <p className={`${item.level}`}>{item.level}</p>
                  </div>
                  <div className="qt_item qt_item-question line-clamp-1 break-all">
                     <p className="align-start">{item.description}</p>
                  </div>
                  <div className="qt_item flex gap-4 justify-center qt_action-item">
                     <FaEye
                        color="#669cc9"
                        className="cursor-pointer"
                        onClick={() => {
                           setSelectedQuestion((value) => (!value ? item : null));
                        }}
                     />
                     <FaTrash
                        color="#bf4646"
                        className="cursor-pointer"
                        onClick={() => setQuestionIdDelete(item._id)}
                     />
                  </div>
               </div>
            ))}
         </div>
      </>
   );
};

export default memo(QuestionTable);
