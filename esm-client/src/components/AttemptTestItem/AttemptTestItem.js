import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 *
 * @param props : {
 *  isSelected: boolean;
 *  data: DataType,
 *  onClick: (id: string) => void;
 *  onHiddenOnList: (id: string) => void
 *  }
 * DataType:  {
 * answers: number[]
 * attempted: boolean;
 * category: string;
 * className: string;
 * minutes: number
 * outOfMarks: number
 * questions: {
 *  description: string;
 *  options: {
 *      option: string;
 *  }[]
 * };
 * rules: any[];
 * section: string;
 * startTime: string;
 * testName: string;
 * startAt: string;
 * endAt?: string;
 * _id: string;
 * }
 */

const AttemptTestItem = ({ isSelected, data, onClick, onHiddenOnList }) => {
   const [readyToStart, setReadyToStart] = useState(false);
   const timer = useRef(0);
   const timerEnd = useRef(0);
   const timeFormat = useCallback((time) => {
      if (!time) {
         return '';
      }
      const date = new Date(time);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formattedDate = `${hours} giờ ${minutes} phút, ngày ${day} tháng ${month} năm ${year}`;

      return formattedDate;
   }, []);

   useEffect(() => {
      if (!data.startTime) {
         return;
      }
      if (timer.current) {
         window.clearInterval(timer.current);
      }
      const checkTime = () => {
         const duration = new Date(data.startTime).getTime() - new Date().getTime();
         setReadyToStart(duration <= 0);
         if (duration <= 0) {
            window.clearInterval(timer.current);
         }
      };

      checkTime();
      timer.current = window.setInterval(() => {
         checkTime();
      }, 10000); // check time every 10s
   }, [data.startTime]);

   // check for endAt, if have endAt time,  this item will be hidden on list
   useEffect(() => {
      if (!data.endAt || !onHiddenOnList) {
         return;
      }
      if (timerEnd.current) {
         window.clearInterval(timerEnd.current);
      }
      const checkTime = () => {
         const duration = new Date(data.endAt).getTime() - new Date().getTime();
         if (duration <= 0) {
            onHiddenOnList(data._id);
            window.clearInterval(timerEnd.current);
         }
      };
      checkTime();
      timerEnd.current = window.setInterval(() => {
         checkTime();
      }, 10000); // check time every 10s
   }, [data.endAt]);

   useEffect(() => {
      return () => {
         if (timer.current) {
            window.clearInterval(timer.current);
         }
         if (timerEnd.current) {
            window.clearInterval(timerEnd.current);
         }
      };
   }, []);

   return (
      <div
         className={`test__wrapper ${isSelected ? 'selected__test' : ''}`}
         onClick={() => {
            onClick(data._id);
         }}
      >
         <p className="select__test">{data.testName}</p>
         <div className="test__time">
            <p className={`time ${readyToStart ? 'start' : 'end'}`}>Bắt đầu: {timeFormat(data.startTime)}</p>
            {data.endAt && <p className="end">Kết thúc: {timeFormat(data.endAt)}</p>}
         </div>
      </div>
   );
};

export default memo(AttemptTestItem);
