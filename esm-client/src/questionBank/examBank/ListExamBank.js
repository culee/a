import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Select, Input } from 'antd';

import './AddExamBank.css';
import TableListExamBank from './TableListExamBank';

const ListExamBank = () => {
   const { Option } = Select;

   const [dataListExambank, setDataListExambank] = useState();

   const [testName, setTestName] = useState();
   const [className, setClassName] = useState();
   const [category, setCategory] = useState();

   const handleSearch = async () => {
      fetchDataListExamBank();
   };

   const clearData = async () => {
      setTestName();
      setClassName();
      setCategory();
      fetchDataListExamBank();
   };

   const fetchDataListExamBank = useCallback(
      async (searchWithParams = true) => {
         try {
            const response = await axios.get('/exams/test-temp/search', {
               params: searchWithParams
                  ? {
                       testName,
                       className,
                       category,
                    }
                  : {},
               headers: {
                  Authorization: localStorage.getItem('token'),
               },
            });

            const data = response.data;
            setDataListExambank(data.obj);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      },
      [testName, className, category],
   );

   console.log(category);

   useEffect(() => {
      fetchDataListExamBank(false);
   }, []);

   return (
      <div className="container">
         <div>
            <h1 className="text-center mt-3 font-bold text-base">Danh sách các đề thi mẫu có trong hệ thống</h1>
            <>
               <Form>
                  <div className="">
                     <div className="w-3/5 flex ml-4">
                        <Form.Item name="testName">
                           <Select defaultValue="Môn Học" onChange={(value) => setTestName(value)}>
                              <Option value="Toán">Toán</Option>
                              <Option value="Lý">Lý</Option>
                              <Option value="Hóa">Hóa</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item name="className">
                           <Select defaultValue="Khối" onChange={(value) => setClassName(value)}>
                              <Option value="X">X</Option>
                              <Option value="XI">XI</Option>
                              <Option value="XII">XII</Option>
                           </Select>
                        </Form.Item>

                        <Form.Item name="category">
                           <Input
                              placeholder="Tiêu đề kiểm tra"
                              onChange={(value) => setCategory(value.target.value)}
                           />
                        </Form.Item>
                        <Form.Item>
                           <Button onClick={handleSearch}>Tìm kiếm</Button>
                        </Form.Item>
                        <Form.Item>
                           <Button onClick={clearData}>Xóa bỏ các mục đã chọn</Button>
                        </Form.Item>
                     </div>
                  </div>
               </Form>
            </>
            <TableListExamBank dataListExambank={dataListExambank} />
         </div>
      </div>
   );
};

export default ListExamBank;
