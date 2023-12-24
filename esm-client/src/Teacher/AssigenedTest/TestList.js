import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from 'antd';
import SearchBox from './SearchBox';
import { useHistory } from 'react-router-dom';
import { Skeleton } from 'antd';
import AssignedTestItem from '../../components/AssignedTestItem/AssignedTestItem';

export default function TestList(props) {
   const history = useHistory();
   const [tests, setTests] = useState([]);
   const [searchTests, setSearchTests] = useState([]);
   const [searching, setSearching] = useState('');
   const [selectedId, setSelectedId] = useState(null); // type null or string

   // null or test data
   const selectedData = useMemo(() => {
      if (!selectedId) {
         return null;
      }
      return tests.find((item) => item._id === selectedId);
   }, [selectedId, tests]);

   useEffect(() => {
      setTests(props.tests.reverse());
   }, [props]);

   const handleListData = (searchTerm) => {
      if (searchTerm === '') setSearching(searchTerm);
      else {
         setSearching(true);
         setSearchTests(tests.filter((test) => test.testName.toLowerCase().includes(searchTerm)));
      }
   };

   const handleButtonClick = () => {
      props.handleSelectedTest(selectedData);
      history.push(`/test-status/${selectedData.testName?.replace(/\s+/g, '-').toLowerCase()}`);
   };

   const handleSelectTest = useCallback((id) => {
      setSelectedId((value) => (value === id ? null : id));
   }, []);

   return (
      <>
         <div className="select__test__wrapper">
            <p className="test__wrapper__heading">Bài đã giao</p>
            <div className="select__test__search__box">
               <p className="search__box__heading">Tìm kiếm</p>
               {<SearchBox handleListData={handleListData} />}
               <div className="test__wrapper__body">
                  <p className="test__wrapper__heading select__heading">Chọn bài</p>
                  <div className="select__test__body">
                     {tests.length > 0 ? (
                        searching !== '' ? (
                           searchTests.map((test, index) => (
                              <AssignedTestItem
                                 key={`test-search-${index}`}
                                 data={test}
                                 isSelected={test._id === selectedId}
                                 onClick={handleSelectTest}
                              />
                           ))
                        ) : (
                           tests.map((test, index) => (
                              <AssignedTestItem
                                 key={`test-${index}`}
                                 data={test}
                                 isSelected={test._id === selectedId}
                                 onClick={handleSelectTest}
                              />
                           ))
                        )
                     ) : (
                        <div className="select__skeleton">
                           <div className="select__single-skeleton">
                              <Skeleton.Avatar
                                 className="select__avatar-skelton"
                                 active={true}
                                 size="default"
                                 shape="square"
                              />
                              <Skeleton.Input className="select__input-skelton" active={true} size="default" />
                           </div>
                           <div className="select__single-skeleton">
                              <Skeleton.Avatar
                                 className="select__avatar-skelton"
                                 active={true}
                                 size="default"
                                 shape="square"
                              />
                              <Skeleton.Input className="select__input-skelton" active={true} size="default" />
                           </div>
                           <div className="select__single-skeleton">
                              <Skeleton.Avatar
                                 className="select__avatar-skelton"
                                 active={true}
                                 size="default"
                                 shape="square"
                              />
                              <Skeleton.Input className="select__input-skelton" active={true} size="default" />
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <div className="select__button">
               <Button type="primary" disabled={!selectedId} onClick={handleButtonClick}>
                  Continue
               </Button>
            </div>
         </div>
      </>
   );
}
