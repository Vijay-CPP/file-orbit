import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { ref, deleteObject } from "firebase/storage";
import { storage, db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteFileButton = ({ file }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  async function handleDelete() {
    const filePath = file.filePath;
    const fileRef = ref(storage, filePath);
    try {
      await deleteObject(fileRef);
    } catch (error) {
      console.log(error);
    }
    
    try {
      await deleteDoc(doc(db, "files", file.id));
    } catch (error) {
      console.log(error);
    }

    setDeleteModal(false);
  }

  return (
    <div>
      <MdDeleteOutline
        className="text-2xl text-slate-500"
        onClick={() => {
          setDeleteModal(true);
        }}
      />
      {deleteModal && (
        <div className="fixed left-0 top-0 flex w-screen h-screen items-center justify-center backdrop-blur-md">
          <div className="bg-sky-200 h-[10%] flex gap-3 justify-center items-center rounded-md font-medium px-5 animate__fadeInUp animate__animated animate__faster">
            Are you sure want to delete?
            <button
              onClick={handleDelete}
              className="bg-sky-600 px-3 py-1 text-white rounded-md"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setDeleteModal(false);
              }}
              className="bg-sky-900 px-3 py-1 text-white rounded-md"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteFileButton;
