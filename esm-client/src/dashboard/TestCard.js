import React, { useEffect } from 'react';
import './TestCard.css';
import { Link } from 'react-router-dom';
import { HiOutlineClipboardList, HiClipboardCopy } from 'react-icons/hi';
import { fetchTests } from '../actions/testActions';
import { connect } from 'react-redux';
import { Skeleton } from 'antd';
import { selectedTest } from '../actions/selectActions';

function TestCard(props) {
    let { tests, isLoading, studentClassName, trimLength } = props;

    if (tests)
        tests =
            tests.length > trimLength
                ? tests.slice(-trimLength).reverse()
                : tests;

    useEffect(() => {
        props.fetchTests(studentClassName);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='left__header red__header'>
                <p className='left__header__text'>
                    {<HiOutlineClipboardList />}Bài kiểm tra
                </p>
            </div>
            <div className='left__body'>
                {!isLoading && tests ? (
                    <ul className='left__body__list__ul'>
                        {tests.map((test, index) => (
                            <Link to='/test-instructions' key={index}>
                                <li
                                    className='left__body__test'
                                    onClick={() => {
                                        props.selectedTest(test);
                                    }}
                                >
                                    <div className='test__index'>
                                        <p className='index__box red__index'>
                                            {index + 1}
                                        </p>
                                    </div>
                                    <div className='test__name '>
                                        {' '}
                                        {test.testName}
                                    </div>
                                    <div className='test__icon'>
                                        <div className='test__icon'>
                                            <div className='test__icon-svg'>
                                                <HiClipboardCopy />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <div className='skeleton'>
                        {Array(trimLength)
                            .fill()
                            .map((item, i) => (
                                <div className='single-skeleton' key={i}>
                                    <Skeleton.Avatar
                                        className='avatar-skelton'
                                        active={true}
                                        size='default'
                                        shape='square'
                                    />
                                    <Skeleton.Input
                                        className='input-skelton'
                                        active={true}
                                        size='default'
                                    />
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.tests.isLoadingTest,
        tests: state.tests.test,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTests: (classID) => dispatch(fetchTests(classID)),
        selectedTest: (testData) => dispatch(selectedTest(testData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestCard);
