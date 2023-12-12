import React, { useEffect } from 'react';
import { HiOutlineClipboardList, HiClipboardCopy } from 'react-icons/hi';
import { fetchTeacherTests } from '../../actions/testActions';
import { connect } from 'react-redux';

import { Skeleton } from 'antd';
import './index.css';

import { useHistory } from 'react-router-dom';

function AssignedTests(props) {
   let { tests, isLoading, profileID, trimLength } = props;

   if (tests) tests = tests.length > trimLength ? tests.slice(-trimLength).reverse() : tests;

   const history = useHistory();
   let selectRef,
      selectedData = {};

   const handleSelectTest = (e, index) => {
      if (selectRef) {
         selectRef.classList.remove('selected__test');
      }
      selectRef = e.currentTarget;
      e.currentTarget.classList.add('selected__test');
      selectedData = tests[index];
      history.push(`/test-status/${e.testName}`);

      console.log(selectedData);
   };

   useEffect(() => {
      props.fetchTests(profileID);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <div className="left__teacher__header">
            <p className="left__teacher__header__text">{<HiOutlineClipboardList />}Các lớp đã giao bài</p>
         </div>
         <div className="left__body">
            {!isLoading && tests ? (
               <ul className="left__body__list__ul">
                  {tests.map((test, index) => (
                     // <Link to="/assigned-test" key={index}>
                     // <Link to={`/${'test-status'}/${test.testName}`} key={index}>
                     <div
                        key={index}
                        onClick={(e) => {
                           handleSelectTest(e, index);
                        }}
                        to="/assigned-test"
                     >
                        <li className="left__body__test">
                           <div className="test__index">
                              <p className="index__box index__box__teacher ">{index + 1}</p>
                           </div>
                           <div className="test__name">
                              {' '}
                              {test.testName} - Khối {test.className} - Lớp {test.section}
                           </div>
                           <div className="test__icon">
                              <div className="test__icon-svg">
                                 <HiClipboardCopy />
                              </div>
                           </div>
                        </li>
                     </div>
                     // </Link>
                  ))}
               </ul>
            ) : (
               <div className="skeleton">
                  {Array(trimLength)
                     .fill()
                     .map((item, i) => (
                        <div className="single-skeleton" key={i}>
                           <Skeleton.Avatar className="avatar-skelton" active={true} size="default" shape="square" />
                           <Skeleton.Input className="input-skelton" active={true} size="default" />
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
      profileID: state.auth.profileID,
   };
};
const mapDispatchToProps = (dispatch) => {
   return {
      fetchTests: (profileID) => dispatch(fetchTeacherTests(profileID)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignedTests);
