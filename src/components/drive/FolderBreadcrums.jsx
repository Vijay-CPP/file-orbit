import React from "react";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { Link } from "react-router-dom";

const FolderBreadcrums = ({ currentFolder }) => {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) {
    path = [...path, ...currentFolder.path];
  }
  return (
    <div className="m-2">
      {path.map((folder, idx) => {
        return (
          <Link
          className="text-blue-500 font-medium text-lg"
            key={idx}
            to={folder.id ? `/folder/${folder.id}` : "/dashboard"}
            state={{ folder: { ...folder, path: path.slice(1, idx) } }}
          >
            {folder.name} {"> "} 
          </Link>
        );
      })}

      {currentFolder && <span className="text-slate-700 text-lg font-medium">{currentFolder.name}</span>}
    </div>
  );
};

export default FolderBreadcrums;
