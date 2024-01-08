import React, { useMemo, useState } from 'react';
import { Input, Popover, Select } from 'antd';
import { AiFillPlusCircle } from 'react-icons/ai';
import { QUESTION_LEVEL } from '../../constants/common.constants';

export default function Rules(props) {
   const [questionDescripiton, setQuestionDescripiton] = useState('');
   const [opiton1, setOption1] = useState('');
   const [opiton2, setOption2] = useState('');
   const [opiton3, setOption3] = useState('');
   const [opiton4, setOption4] = useState('');
   const [answer, setAnswer] = useState('');
   const [editAnswer, setEditAnswer] = useState('');
   const [level, setLevel] = useState('Easy');

   const disabledAddButton = useMemo(() => {
      return !questionDescripiton || !opiton1 || !opiton2 || !opiton3 || !opiton4 || !answer;
   }, [questionDescripiton, opiton1, opiton2, opiton3, opiton4, answer]);

   const submitInput = (
      <div>
         <p className="verified-popover ">Add Question</p>
      </div>
   );

   const handleOnChangeQuestion = (e) => {
      setQuestionDescripiton(e.target.value);
   };
   const handleOption1 = (e) => {
      setOption1(e.target.value);
   };
   const handleOption2 = (e) => {
      setOption2(e.target.value);
   };
   const handleOption3 = (e) => {
      setOption3(e.target.value);
   };
   const handleOption4 = (e) => {
      setOption4(e.target.value);
   };
   const handleAnswer = (e) => {
      setAnswer(e.target.value);
   };
   const handleAddQuestion = () => {
      setEditAnswer('');
      if (disabledAddButton) {
         alert('Vui lòng điền đầy đủ thông tin cho câu hỏi.');
         return;
      }

      if (answer > 5 || answer < 0) {
         setEditAnswer('Đáp án đúng trị có giá trị từ 1 đến 4');
         return;
      }

      const questionData = {
         questionDescripiton,
         opiton1,
         opiton2,
         opiton3,
         opiton4,
         answer,
         level,
      };

      props.addQuestion(questionData);
      setQuestionDescripiton('');
      setOption1('');
      setOption2('');
      setOption3('');
      setOption4('');
      setAnswer('');
      setLevel('Easy');
   };

   return (
      <>
         <div className="rules__wrapper">
            <div className="options__wrapper ">
               <Input.TextArea
                  placeholder="Vui lòng nhập!"
                  className="input "
                  value={questionDescripiton}
                  onChange={handleOnChangeQuestion}
                  style={{ margin: '0 5px' }}
               />
               <div className="add__new" onClick={handleAddQuestion}>
                  {
                     <Popover content={submitInput}>
                        <AiFillPlusCircle className={`success ${disabledAddButton && 'disabled'}`} />
                     </Popover>
                  }
               </div>
            </div>
            <div className="mb-4">
               <p className="mb-0 mt-2 text-[#1e90ff] font-medium">Độ khó</p>
               <Select
                  defaultValue={'Easy'}
                  value={level}
                  onChange={(val) => {
                     setLevel(val);
                  }}
                  options={Object.entries(QUESTION_LEVEL).map(([key, value]) => ({
                     label: value,
                     value: key,
                  }))}
                  style={{ width: 120 }}
               />
            </div>
            <div className="question__options">
               <p className="mb-[-3px] mt-2 text-[#1e90ff] font-medium	"> Đáp án</p>

               <Input placeholder="Đáp án 1" className="input option" value={opiton1} onChange={handleOption1} />
               <Input placeholder="Đáp án 2" className="input option" value={opiton2} onChange={handleOption2} />
               <Input placeholder="Đáp án 3" className="input option" value={opiton3} onChange={handleOption3} />
               <Input placeholder="Đáp án 4" className="input option" value={opiton4} onChange={handleOption4} />
               <p className="m-[15px_0_0_0] text-[#3eb43e] font-medium	">Đáp án đúng</p>
               <Input
                  placeholder="Chọn đáp án đúng(1 hoặc 2, 3, 4)"
                  type="number"
                  className="input option"
                  value={answer}
                  onChange={handleAnswer}
                  min={1}
                  max={4}
               />
               <p className="text-red-700">{editAnswer}</p>
            </div>
         </div>
      </>
   );
}
