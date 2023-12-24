import axios from 'axios';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import './styles.css';
import ExamBankItem from './ExamBankItem/ExamBankItem';
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
 * SearchExamData {
 *      answers: number[];
 *      assignedTo: any[];
 *      category: string; -> hạng mục kiểm tra
 *      className: string;
 *      questions: {description: string; level: string; options: {option: string;}[]}[];
 *      rules: any[];
 *      testName: string;
 *      _id: string;
 * }
 */

const ExamBank = ({ isOpen, searchParams, onClose, onSelected }) => {
   const [list, setList] = useState([]); // SearchExamData[]
   const [selectedId, setSelectedId] = useState(null); // type null or string

   const selectedData = useMemo(() => {
      if (!selectedId || !list || list.length === 0) {
         return null;
      }
      return list.find((item) => item._id === selectedId);
   }, [selectedId, list]);

   ///Call API list Exam
   const fetchDataListExamBank = useCallback(async () => {
      try {
         const response = await axios.get('/exams/test-temp/search', {
            params: searchParams,
            headers: {
               Authorization: localStorage.getItem('token'),
            },
         });

         const data = response.data;
         setList(data.obj);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   }, [searchParams]);

   const handleSelectExamFromList = useCallback((id) => {
      setSelectedId(id);
   }, []);

   useEffect(() => {
      if (isOpen) {
         fetchDataListExamBank();
      }
   }, [isOpen, fetchDataListExamBank]);

   useEffect(() => {
      if (!selectedData) {
         return;
      }
      onSelected(selectedData);
      onClose();
   }, [selectedData, onSelected, onClose]);

   return (
      <>
         {isOpen && (
            <div className="ex_backdrop" onClick={onClose}>
               <div className="ex_dialog-container" onClick={(e) => e.stopPropagation()}>
                  <div className="ex_dialog-title">Chọn đề thi có sẵn</div>
                  <div className="ex_dialog-content">
                     {list.map((item) => (
                        <ExamBankItem key={item._id} data={item} onClick={handleSelectExamFromList} />
                     ))}
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default memo(ExamBank);
