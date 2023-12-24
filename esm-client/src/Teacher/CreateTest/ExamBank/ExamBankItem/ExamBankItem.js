import React, { memo } from 'react';
import { Typography, Collapse, Input, Button } from 'antd';
import './style.css';
/**
 *
 * @param props {
 *      data: SearchExamData;
 *      onClick: (id: string) => void;

 * }
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

const ExamBankItem = ({ data, onClick }) => {
   return (
      <div
         onClick={() => {
            onClick(data._id);
         }}
         className="exi_container"
      >
         <div className="flex justify-between items-center gap-1 mb-2">
            <Typography level={5}>
               {data.testName} - {data.category} - {data.className}
            </Typography>
            <Button type="primary" shape="round">
               Chọn
            </Button>
         </div>
         <Collapse>
            <Collapse.Panel header="Nội dung câu hỏi">
               <Collapse>
                  {data.questions.length > 0 ? (
                     <>
                        {data.questions.map((item, index) => (
                           <Collapse.Panel header={item.description} key={index + 1}>
                              <Typography className="mb-1">Độ khó: {item.level}</Typography>
                              {item.options.length > 0 ? (
                                 <div className="flex flex-col gap-1">
                                    {item.options.map(({ option }, i) => (
                                       <Input key={`option-${i}`} value={option} disabled />
                                    ))}
                                 </div>
                              ) : (
                                 <Typography>Không có đáp án nào</Typography>
                              )}
                           </Collapse.Panel>
                        ))}
                     </>
                  ) : (
                     <Typography>Không có câu hỏi</Typography>
                  )}
               </Collapse>
            </Collapse.Panel>
         </Collapse>
      </div>
   );
};

export default memo(ExamBankItem);
