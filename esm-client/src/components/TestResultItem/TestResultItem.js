import React, { memo } from 'react';

/**
 * @param props {
 *    data: DataType;
 *    onClick: (id: string) =>  void;
 *    isSelected: boolean;
 * }
 * DataType {
 *    date: number; // timestamp
 *    testName: string;
 *
 * }
 */

const TestResultItem = () => {
   return <div>TestResultItem</div>;
};

export default memo(TestResultItem);
