import React from 'react';
import { Input, Popover } from 'antd';
import { TiDelete } from 'react-icons/ti';

export default function RenderData(props) {
   const { ruleData, questionData, question, rules } = props;

   const handleClick = (index) => {
      props.clickedRule(index);
   };
   return (
      <div className="renderData__wrapper ">
         {rules
            ? ruleData &&
              ruleData.map((item, index) => (
                 <div key={index}>
                    <p className="sub__render__heading">Rule {index + 1}</p>
                    <div className="render__item">
                       <Input readonly="readOnly" value={item.value} className="input" style={{ margin: '0 5px' }} />
                       <TiDelete className="danger" onClick={() => handleClick(index)} style={{ fontSize: '30px' }} />
                    </div>
                 </div>
              ))
            : questionData &&
              questionData.map((item, index) => (
                 <div
                    key={index}
                    className="px-[30px] py-4 rounded-2xl mb-5 my-3 shadow-[0_0_4px_6px_rgba(19,60,101,0.15)]"
                 >
                    <p className="sub__render__heading">Câu hỏi {index + 1}</p>
                    <div className="render__item">
                       <Input.TextArea
                          readonly="readOnly"
                          value={item.questionDescripiton}
                          className="input"
                          style={{ margin: '0 5px' }}
                       />
                       <TiDelete className="danger" onClick={() => handleClick(index)} style={{ fontSize: '30px' }} />
                    </div>
                    <div className="mb-2">
                       <p className="mb-[-3px] mt-2 text-[#1e90ff] font-medium">Độ khó</p>
                       <Input className="input option" value={item.level} readonly="readOnly" />
                    </div>
                    <div className="question__options">
                       <p className="mb-[-3px] mt-2 text-[#1e90ff] font-medium	"> Đáp án</p>

                       <Input
                          className="input option"
                          value={item.opiton1}
                          readonly="readOnly"
                          style={{ margin: '10 5px' }}
                       />
                       <Input
                          className="input option"
                          value={item.opiton2}
                          readonly="readOnly"
                          style={{ margin: '10 5px' }}
                       />
                       <Input
                          className="input option"
                          value={item.opiton3}
                          readonly="readOnly"
                          style={{ margin: '10 5px' }}
                       />
                       <Input
                          className="input option"
                          value={item.opiton4}
                          readonly="readOnly"
                          style={{ margin: '10 5px' }}
                       />
                       <p className="mb-[-3px] mt-2 text-[#3eb43e] font-medium	"> Đáp án đúng</p>
                       <Input
                          type="number"
                          className="input option"
                          value={item.answer}
                          readonly="readOnly"
                          style={{ margin: '10 5px' }}
                       />
                    </div>
                 </div>
              ))}
      </div>
   );
}
