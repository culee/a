import React, { memo } from 'react';
import { Input, Checkbox } from 'antd';
/**
 *
 * @param props {
 *      index: number;
 *      data: DataType;
 *      onSelected: (id: string, checked: boolean) => void;
 *      isSelected: boolean
 * }
 *
 * DataType {
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

const QuestionItem = ({ data: { description, options, answer, _id }, index, onSelected }) => {
   return (
      <div className="px-[30px] py-4 rounded-2xl mb-5 my-3 shadow-[0_0_4px_6px_rgba(19,60,101,0.15)]">
         <div className="flex justify-between align-center">
            <p className="sub__render__heading">Câu hỏi {index + 1}</p>
            <Checkbox onChange={(e) => onSelected(_id, e.target.checked)} />
         </div>
         <div className="render__item">
            <Input.TextArea readonly="readOnly" value={description} className="input" style={{ margin: '0 5px' }} />
         </div>
         <div className="question__options">
            <p className="mb-[-3px] mt-2 text-[#1e90ff] font-medium	"> Đáp án</p>

            {options.map(({ option }) => (
               <Input
                  key={option}
                  className="input option"
                  value={option}
                  readonly="readOnly"
                  style={{ margin: '10 5px' }}
               />
            ))}

            <p className="mb-[-3px] mt-2 text-[#3eb43e] font-medium	"> Đáp án đúng</p>
            <Input
               type="number"
               className="input option"
               value={answer}
               readonly="readOnly"
               style={{ margin: '10 5px' }}
            />
         </div>
      </div>
   );
};

export default memo(QuestionItem);
