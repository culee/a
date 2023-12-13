import React, { memo } from 'react';
import './DialogConfirm.css';
import { Button } from 'antd';

/**
 *
 * @param isOpen - boolean
 * @param onClose - function
 * @param onOk - function
 * @param title - string
 * @param content - string
 * @param disabled - boolean
 */

const DialogConfirm = ({
    isOpen,
    onClose,
    onOk,
    title = 'TITLE',
    content = 'CONTENT',
    disabled = false,
}) => {
    return (
        <>
            {isOpen && (
                <div className='dc_backdrop' onClick={onClose}>
                    <div
                        className='dc_dialog-container'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='dc_dialog-title'>
                            <p>{title}</p>
                        </div>
                        <div className='dc_dialog-content'>
                            <p>{content}</p>
                        </div>
                        <div className='dc_dialog-actions'>
                            <Button onClick={onClose} disabled={disabled}>
                                Cancel
                            </Button>
                            <Button
                                onClick={onOk}
                                type='primary'
                                disabled={disabled}
                            >
                                OK
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DialogConfirm;
