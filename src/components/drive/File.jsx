import React from "react";
import { FaFile } from "react-icons/fa";
import DeleteFileButton from "./DeleteFileButton";
import { FiDownload } from "react-icons/fi";

const File = ({ file }) => {
  return (
    <div className="border-slate-400 border-[2px] rounded-md text-md px-2 py-3 m-2 gap-2 flex items-center">
      <a href={file.url} target="_blank">
        <div className="flex items-center gap-3">
          <FaFile className="text-2xl text-gray-500" />
          {file.name}
          <FiDownload className="text-2xl text-sky-500" />
        </div>
      </a>
      <DeleteFileButton file={file} />
    </div>
  );
};

export default File;
