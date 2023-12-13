import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;

export default function SearchBox(props) {
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      props.handleListData(searchTerm.toLowerCase());
   }, [searchTerm]);

   const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
   };
   const onSearch = (value) => {
      console.log(value);
   };

   return (
      <>
         <div className="search__input">
            <Search placeholder="Vui lòng nhập!" onSearch={onSearch} onChange={handleSearchChange} enterButton />
         </div>
      </>
   );
}