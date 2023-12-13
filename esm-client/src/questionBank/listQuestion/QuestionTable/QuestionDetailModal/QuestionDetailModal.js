import React, { memo, useCallback, useMemo, useState } from 'react';
import { Row, Form, Button, Select, notification, Input } from 'antd';
import './QuestionDetailModal.css';
import {
    CLASS_NAME_TEST,
    GRADE_NAME_LIST,
    QUESTION_LEVEL,
} from '../../../../constants/common.constants';
import axios from 'axios';
/**
 * @param data 
 * null or {
    answers: number,
    className: string,
    description: string,
    level: string;
    options: {option: string}[] 
    section: string,
    teacherId: string,
    testName: string,
    _id: string,
}
* @param onClose - function to close modal
* @param onUpdateSuccess - function to update data in list after call api success
 */

const QuestionDetailModal = ({ data, onClose, onUpdateSuccess }) => {
    const isOpen = useMemo(() => Boolean(data), [data]);
    const [isFetching, setIsFetching] = useState(false);
    const initValues = useMemo(() => {
        if (!data) {
            return null;
        }
        const obj = {
            testName: data.testName,
            className: data.className,
            section: data.section,
            description: data.description,
            level: data.level.trim(),
            answer: data.answer,
            id: data._id,
        };
        data.options.forEach(({ option }, index) => {
            obj[`option${index + 1}`] = option;
        });
        return obj;
    }, [data]);

    const handleUpdateData = useCallback(
        async (values) => {
            const id = data._id;

            try {
                setIsFetching(true);
                const {
                    testName,
                    className,
                    section,
                    description,
                    level,
                    answer,
                } = values;

                const options = Array(4)
                    .fill(0)
                    .map((_, index) => ({
                        option: values[`option${index + 1}`],
                    }));

                await axios({
                    method: 'put',
                    url: `/question/update-question/${id}`,
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },

                    data: {
                        testName,
                        className,
                        section,
                        description,
                        level,
                        answer,
                        options,
                    },
                });
                if (onUpdateSuccess) {
                    onUpdateSuccess({
                        testName,
                        className,
                        section,
                        description,
                        level,
                        answer,
                        options,
                        _id: id,
                    });
                }

                setIsFetching(false);
                notification['success']({
                    message: 'Cập nhật câu hỏi thành công.',
                    description: 'SUCCESS',
                    duration: 3,
                });
            } catch (error) {
                setIsFetching(false);
                notification['error']({
                    message: 'Cập nhật câu hỏi thất bại',
                    description: 'ERROR',
                    duration: 3,
                });
            }
        },
        [data]
    );

    if (!isOpen) {
        return null;
    }

    return (
        <div className='backdrop' onClick={onClose}>
            <div className='container' onClick={(e) => e.stopPropagation()}>
                <Row justify='center' align='middle'>
                    <p className='sub-title__signup'>
                        Thông tin câu hỏi QuestionBank
                    </p>
                    <Form
                        name='basic'
                        className='create__test__form'
                        onFinish={handleUpdateData}
                        initialValues={initValues}
                    >
                        <div className='element__wrapper'>
                            <Form.Item
                                name='testName'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn môn!',
                                    },
                                ]}
                            >
                                <Select defaultValue={data.testName}>
                                    <Select.Option value='Toán'>
                                        Toán
                                    </Select.Option>
                                    <Select.Option value='Lý'>Lý</Select.Option>
                                    <Select.Option value='Hóa'>
                                        Hóa
                                    </Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name='className'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn khối!',
                                    },
                                ]}
                            >
                                <Select>
                                    {GRADE_NAME_LIST.map((val) => (
                                        <Select.Option key={val} value={val}>
                                            {val}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name='section'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy chọn lớp!',
                                    },
                                ]}
                            >
                                <Select>
                                    {CLASS_NAME_TEST.map((val) => (
                                        <Select.Option key={val} value={val}>
                                            {val}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>

                        <p className='primary-wihtoutFont mt-2 font-medium'>
                            Câu hỏi
                        </p>
                        <div className='element__wrapper'>
                            <Form.Item name='description'>
                                <Input.TextArea
                                    placeholder='Vui lòng nhập!'
                                    className='input '
                                    name='description'
                                    defaultValue={data.description}
                                    style={{ margin: '0 5px' }}
                                />
                            </Form.Item>
                        </div>

                        <p className='primary-wihtoutFont mt-2 font-medium'>
                            Độ khó
                        </p>
                        <div className='w-1/3'>
                            <Form.Item name='level'>
                                <Select
                                    defaultValue={
                                        QUESTION_LEVEL[data.level.trim()]
                                    }
                                    name='level'
                                >
                                    {Object.entries(QUESTION_LEVEL).map(
                                        ([key, value]) => (
                                            <Select.Option
                                                key={key}
                                                value={key.trim()}
                                            >
                                                {value}
                                            </Select.Option>
                                        )
                                    )}
                                </Select>
                            </Form.Item>
                        </div>

                        <p className='primary-wihtoutFont mt-2 font-medium'>
                            Câu trả lời
                        </p>
                        <div>
                            {data.options.map(({ option }, index) => (
                                <Form.Item
                                    name={`option${index + 1}`}
                                    key={`option-${index}`}
                                >
                                    <Input
                                        placeholder={`Đáp án ${index + 1}`}
                                        className='input option'
                                        value={option}
                                        style={{ margin: '10 5px' }}
                                    />
                                </Form.Item>
                            ))}
                        </div>

                        <p className='primary-wihtoutFont mt-2 font-medium'>
                            Đáp án
                        </p>
                        <Form.Item name='answer'>
                            <Input
                                placeholder='Chọn đáp án đúng(VD: 1 hoặc 1, 2, 3)'
                                type='number'
                                className='input option'
                                style={{ margin: '10 5px' }}
                                min={1}
                                max={4}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type='primary'
                                className='sign__up'
                                htmlType='submit'
                                disabled={isFetching}
                            >
                                submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Row>
            </div>
        </div>
    );
};

export default memo(QuestionDetailModal);
