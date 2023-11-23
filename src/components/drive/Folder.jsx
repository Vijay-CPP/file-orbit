import React from "react";
import { Link } from "react-router-dom";
import { AiFillFolder } from "react-icons/ai";
import DeleteFolderButton from "./DeleteFolderButton";

const Folder = ({ folder }) => {
  let name = folder.name.slice(0, 20);
  return (
    <div className="flex items-center gap-2 border-slate-400 border-[2px] px-2 py-3 m-2 rounded-md">
      <Link to={`/folder/${folder.id}`} state={{ folder: folder }}>
        <div className="flex gap-1 ">
          <AiFillFolder className="text-2xl text-gray-500" />
          {name}
        </div>
      </Link>
      <DeleteFolderButton folder={folder}/>
    </div>
  );
};

export default Folder;
