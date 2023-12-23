import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { FaEye } from 'react-icons/fa';

import { FaTrash } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';

import QuestionDetailModal from '../../listQuestion/QuestionTable/QuestionDetailModal/QuestionDetailModal';
import { useAddListExam } from '../../../useContext/Context';

import './RenderQuestionExam.css';

const RenderQuestionExam = ({ questionData }) => {
   const [selectedQuestion, setSelectedQuestion] = useState(null);
   const [dataList, setDataList] = useState([]);

   const { addListExam, setAddListExam } = useAddListExam();

   const handleUpdateData = useCallback((data) => {
      setDataList((value) => value.map((item) => (item._id === data._id ? { ...item, ...data } : item)));
      setSelectedQuestion(null);
   }, []);

   const hanleAddQuestion = (item) => {
      if (!addListExam.some((existingItem) => existingItem._id === item._id)) {
         setAddListExam((prevList) => [...prevList, item]);
      } else {
         alert('Câu hỏi đã tồn tại, vui lòng chọn câu hỏi khác');
      }
   };

   return (
      <>
         <QuestionDetailModal
            data={selectedQuestion}
            onClose={() => setSelectedQuestion(null)}
            onUpdateSuccess={handleUpdateData}
         />
         <div className="mx-3 mt-3 text-center">
            <div className="border-b-2 border-[#aaaa] bg-[#98bfe1] rounded-sm">
               <div className="flex">
                  <div className="qt_item">
                     <p className="header-item">STT</p>
                  </div>
                  <div className="qt_item min-w-10">
                     <p className="qt_header-item">Môn</p>
                  </div>
                  <div className="qt_item min-w-10">
                     <p className="qt_header-item">Khối</p>
                  </div>
                  <div className="qt_item level-exam">
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
            {questionData.map((item, index) => (
               <div key={item._id} className="flex qt_row py-1">
                  <div className="qt_item">
                     <p>{index + 1}</p>
                  </div>
                  <div className="qt_item min-w-10">
                     <p className={`${item.testName}`}>{item.testName}</p>
                  </div>
                  <div className="qt_item min-w-10">
                     <p>{item.className}</p>
                  </div>
                  <div className="level-exam qt_item">
                     <p className={`${item.level} `}>{item.level}</p>
                  </div>
                  <div className="qt_item qt_item-question line-clamp-1 break-all">
                     <p className="align-start">{item.description}</p>
                  </div>
                  <div className="qt_item flex gap-4 justify-center qt_action-item">
                     <FaEye
                        color="#669cc9"
                        className="cursor-pointer text-xs"
                        onClick={() => {
                           setSelectedQuestion((value) => (!value ? item : null));
                        }}
                     />
                     <IoIosAddCircle
                        color="#38D5B3"
                        className="cursor-pointer text-xs"
                        onClick={() => hanleAddQuestion(item)}
                     />
                  </div>
               </div>
            ))}
         </div>
      </>
   );
};

export default RenderQuestionExam;
