import React from 'react';
import { useAddListExam } from '../../../useContext/Context';
import { MdDelete } from 'react-icons/md';
const RenderaddExam = () => {
   const { addListExam, setAddListExam } = useAddListExam();

   //    const { addListExam } = useAddListExam();

   const deleteItem = (_id) => {
      const updatedList = addListExam.filter((item) => item._id !== _id);

      setAddListExam(updatedList);
   };

   console.log(addListExam);

   return (
      <div>
         <div className="mx-3 mt-3 text-center">
            <div className="border-b-2 border-[#aaaa] bg-[#98bfe1] rounded-sm">
               <div className="flex">
                  <div className="qt_item">
                     <p className="header-item">STT</p>
                  </div>
                  <div className="qt_item level-exam">
                     <p className="qt_header-item">Độ khó</p>
                  </div>
                  <div className="qt_item qt_item-question">
                     <p className="qt_header-item ">Câu hỏi</p>
                  </div>
                  <div className="qt_item qt_action-item">
                     <p className="qt_header-item">Action</p>
                  </div>
               </div>
            </div>
            {addListExam.map((item, index) => (
               <div key={item._id} className="flex qt_row py-1">
                  <div className="qt_item">
                     <p>{index + 1}</p>
                  </div>
                  <div className="level-exam qt_item px-10">
                     <p className={`${item.level} `}>{item.level}</p>
                  </div>
                  <div className="qt_item qt_item-question line-clamp-1 break-all">
                     <p className="align-start">{item.description}</p>
                  </div>
                  <div className="qt_item flex gap-4 justify-center qt_action-item">
                     <MdDelete
                        color="#FF0000"
                        className="cursor-pointer text-xs"
                        onClick={() => deleteItem(item._id)}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default RenderaddExam;
