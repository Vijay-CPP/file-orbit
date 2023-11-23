import React, { useState } from "react";
import { VscNewFile } from "react-icons/vsc";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { storage, db } from "../../config/firebase";
import { useUserAuth } from "../../context/UserAuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { serverTimestamp } from "firebase/firestore";
import { FiUpload } from "react-icons/fi";

const AddFileButton = ({ currentFolder }) => {
  const { user } = useUserAuth();
  const [percentage, setPercentage] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  function handleUpload(e) {
    const file = e.target.files[0];
    const fname = (Date.now()) + file.name;
    if (currentFolder == null || file == null) return;

    // Creating parent path
    const parentPathArray = currentFolder.path.map((ele) => {
      return ele.name;
    });
    let parentPath = parentPathArray.join("/");

    // Creating current folder path
    let currentFolderPath = "";
    if (currentFolder === ROOT_FOLDER) {
      currentFolderPath += "";
    } else if (parentPath.length === 0) {
      currentFolderPath += `${currentFolder.name}`;
    } else currentFolderPath += `${parentPath}/${currentFolder.name}`;

    // Creating the final file path
    let filePath = `/files/${user.uid}`;

    if (currentFolderPath.length > 0)
      filePath += `/${currentFolderPath}/${fname}`;
    else filePath += `/${fname}`;

    const uploadRef = ref(storage, filePath);

    setShowProgress(true);

    const uploadTask = uploadBytesResumable(uploadRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setPercentage(Math.round(progress, 2));

        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        setShowProgress(false);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const fileData = {
            url: downloadURL,
            name: file.name,
            createdAt: serverTimestamp(),
            folderId: currentFolder.id,
            userId: user.uid,
            filePath: filePath,
          };

          try {
            await addDoc(collection(db, "files"), fileData);
            setShowProgress(false);
          } catch (error) {
            console.log(error);
            setShowProgress(false);
          }
        });
      }
    );
  }

  return (
    <div>
      <div className="m-2 rounded-md bg-sky-100 transition-all w-max border-2 border-sky-200 hover:bg-sky-400">
        <label>
          <VscNewFile className="text-sky-900 transition-all p-2 hover:text-white text-5xl" />
          <input
            type="file"
            className="opacity-0 w-full absolute left-[-9999999px]"
            onChange={handleUpload}
          />
        </label>
      </div>

      {showProgress && (
        <div className="fixed bottom-0 right-0 flex gap-3 bg-sky-100 rounded-md m-6 px-6 py-4 drop-shadow-lg border-[1px] border-gray-400">
          <FiUpload className="text-2xl" />
          <div className="font-medium">
            Uploading... {percentage} % Completed
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFileButton;
