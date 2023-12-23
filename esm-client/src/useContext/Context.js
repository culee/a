// Tạo một context
import React, { createContext, useContext, useState } from 'react';

const AddListExamContext = createContext();

export const AddListExamProvider = ({ children }) => {
   const [addListExam, setAddListExam] = useState([]);

   const [showListAddExamBank, setShowListAddExamBank] = useState([]);

   const [showListAddQuestionBank, setShowListAddQuestionBank] = useState([]);

   return (
      <AddListExamContext.Provider
         value={{
            addListExam,
            setAddListExam,

            setShowListAddExamBank,
            showListAddExamBank,

            showListAddQuestionBank,
            setShowListAddQuestionBank,
         }}
      >
         {children}
      </AddListExamContext.Provider>
   );
};

export const useAddListExam = () => {
   return useContext(AddListExamContext);
};
