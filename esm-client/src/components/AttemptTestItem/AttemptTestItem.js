import React, { memo, useEffect, useMemo, useRef, useState } from 'react';

/**
 *
 * @param props : {isSelected: boolean; data: DataType, onClick: (id: string) => void }
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
 * _id: string;
 * }
 */

const AttemptTestItem = ({ isSelected, data, onClick }) => {
    const [readyToStart, setReadyToStart] = useState(false);
    const timer = useRef(0);
    const timeFormat = useMemo(() => {
        if (!data.startTime) {
            return '';
        }
        const date = new Date(data.startTime);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const formattedDate = `${hours} giờ ${minutes} phút, ngày ${day} tháng ${month} năm ${year}`;

        return formattedDate;
    }, [data]);

    useEffect(() => {
        if (!data.startTime) {
            return;
        }
        if (timer.current) {
            window.clearInterval(timer.current);
        }
        const checkTime = () => {
            const duration =
                new Date(data.startTime).getTime() - new Date().getTime();
            setReadyToStart(duration <= 0);
            console.log('run ');
        };

        checkTime();
        timer.current = window.setInterval(() => {
            checkTime();
        }, 10000); // check time every 10s
    }, [data.startTime]);

    useEffect(() => {
        return () => {
            if (timer.current) {
                window.clearInterval(timer.current);
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
            <p className='select__test'>{data.testName}</p>
            <div className='test__time'>
                <p className={`time ${readyToStart ? 'start' : 'end'}`}>
                    Bắt đầu: {timeFormat}
                </p>
            </div>
        </div>
    );
};

export default memo(AttemptTestItem);
