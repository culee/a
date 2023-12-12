import React from 'react';
import { Input } from 'antd';
import { TiDelete } from 'react-icons/ti';

export default function RenderDataQuestion(props) {
   const { ruleData, questionData, question, rules } = props;

   const handleClick = (index) => {
      props.clickedRule(index);
   };

   return (
      <div className="renderData__wrapper px-[20px]">
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
                    <div className="flex">
                       <p className="sub__render__heading">Question {index + 1}</p>:
                       <p className={`ml-4 ${item.level} `}>{item.level}</p>
                    </div>
                    <div className="render__item">
                       <Input.TextArea
                          readonly="readOnly"
                          value={item.questionDescripiton}
                          className="input"
                          style={{ margin: '0 5px' }}
                       />
                       <TiDelete className="danger" onClick={() => handleClick(index)} style={{ fontSize: '30px' }} />
                    </div>
                    <div className="question__options">
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

                       <p className="m-[15px_0_0_0]">Đáp án:</p>
                       <Input
                          type="number"
                          className="input option"
                          value={item.answer}
                          readonly="readOnly"
                          style={{ margin: '1 5px' }}
                       />
                    </div>
                 </div>
              ))}
      </div>
   );
}
