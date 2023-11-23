import React from "react";
import Navbar from "./Navbar";
import AddFolderButton from "./AddFolderButton";
import { useUserAuth } from "../../context/UserAuthContext";
import { useFolder } from "../../hooks/useFolder";
import Folder from "./Folder";
import File from "./File";
import { Navigate, useLocation, useParams } from "react-router-dom";
import FolderBreadcrums from "./FolderBreadcrums";
import AddFileButton from "./AddFileButton";
import { ClimbingBoxLoader } from "react-spinners";

const Dashboard = () => {
  const { folderId } = useParams();

  const location = useLocation();
  let locationFolder = null;
  if (location.state !== null) {
    locationFolder = location.state.folder;
  }

  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    locationFolder
  );

  return (
    <div>
      <Navbar />
      <div className="w-[95vw] mt-4 mx-auto">
        <FolderBreadcrums currentFolder={folder} />
        <div className="flex">
          <AddFolderButton currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
        </div>

        <div>
          {childFolders.length > 0 && (
            <div className="flex flex-wrap">
              {childFolders.map((eachFolder, idx) => {
                return (
                  <div key={idx}>
                    <Folder folder={eachFolder} />
                  </div>
                );
              })}
            </div>
          )}

          {childFolders.length > 0 && childFiles.length > 0 && (
            <hr className="my-4" />
          )}

          {childFiles.length > 0 && (
            <div className="flex flex-wrap">
              {childFiles.map((file, idx) => {
                return (
                  <div key={idx}>
                    <File file={file} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
