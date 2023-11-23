import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteSubfoldersAndFiles } from "./deleteSubfoldersAndFiles";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";


const DeleteFolderButton = ({ folder }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    deleteSubfoldersAndFiles(folder.id);
    try {
        await deleteDoc(doc(db, "folders", folder.id));
    } catch (error) {
        console.log(error);
    }
    setDeleteModal(false);
    setLoading(false);
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
            {loading ? (
              <div className="bg-sky-950 px-2 py-2 rounded-md text-white">
                Please wait! Deleting...
              </div>
            ) : (
              <div className="flex gap-2">
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteFolderButton;
