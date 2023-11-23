import { ref, deleteObject } from "firebase/storage";
import { storage, db } from "../../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function deleteSubfoldersAndFiles(folderId) {
    try {
        // Delete files in the current folder
        await deleteFilesInFolder(folderId);
        
        // Recursively delete subfolders
        await deleteSubfolders(folderId);
    } catch (error) {
        console.log(error);
    }
}

async function deleteFilesInFolder(folderId) {
    const q = query(collection(db, "files"), where("folderId", "==", folderId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (DOC) => {
        const file = { ...DOC.data(), id: DOC.id };
        await deleteFile(file);
    })
}

async function deleteSubfolders(folderId) {
    const q = query(collection(db, "folders"), where("parentId", "==", folderId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (DOC) => {
        const subfolder = { ...DOC.data(), id: DOC.id };
        // Recursively delete subfolders and files in subfolders
        await deleteSubfoldersAndFiles(subfolder.id);

        // Delete the subfolder itself
        try {
            await deleteDoc(doc(db, "folders", subfolder.id));
        } catch (error) {
            console.log(error);
        }
    })
}

async function deleteFile(file) {
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
}