import React, { memo } from 'react';

/**
 *
 * @param props {
 *    data: DataType;
 *    onClick: (id: string) =>  void;
 *    isSelected: boolean;
 * }
 * DataType {
 *    className: string;
 *    section: string;
 *    submitBy: SubmitByType[]
 *    testName: string;
 *    _id: string;
 * }
 * SubmitByType {
 *    correct: number;
 *    firstName: string;
 *    lastName: string;
 *    profileID: string;
 *    submitMinutes: number;
 *    testName: string;
 *    totalMarks: number;
 *    unanswered: number;
 *    wrong: number
 * }
 */

const AssignedTestItem = ({ data: { _id, testName, section, className }, onClick, isSelected }) => {
   return (
      <div
         className={`test__wrapper ${isSelected ? 'selected__test' : ''}`}
         onClick={(e) => {
            onClick(_id);
         }}
      >
         <p className="select__test">
            {testName} - {className} - {section}
         </p>
      </div>
   );
};

export default memo(AssignedTestItem);
