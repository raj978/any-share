"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import app from "./../../../../firebaseConfig";
import TotalFileCard from "./_components/TotalFileCard";
import FileList from "./_components/FileList";
import Link from "next/link";
import { toast } from "react-toastify";

import EditModal from "./_components/EditModal";

function Files() {
  const { user } = useUser();
  const db = getFirestore(app);
  const storage = getStorage(app);

  const [fileList, setFileList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [fileToEdit, setFileToEdit] = useState(null);

  // Fetch user files
  const getAllUserFiles = async () => {
    try {
      if (!user) return;
      const q = query(
        collection(db, "uploadedFile"),
        where("userEmail", "==", user.primaryEmailAddress.emailAddress)
      );
      const querySnapshot = await getDocs(q);
      const files = [];
      querySnapshot.forEach((docSnap) => {
        files.push({ id: docSnap.id, ...docSnap.data() });
      });
      setFileList(files);
    } catch (error) {
      console.error("Failed to fetch files:", error);
      toast.error("Failed to fetch files. Please try again.");
    }
  };

  // Initial fetch when user is ready
  useEffect(() => {
    getAllUserFiles();
  }, [user]);

  // Handle file deletion (Storage + Firestore)
  const handleDelete = async (file) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${file.fileName}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    try {
      // Ensure file object is defined
      if (!file) {
        throw new Error("File object is undefined");
      }

      // Delete the file from Storage
      const fileRef = ref(storage, `file-upload/${file.fileName}`);
      await deleteObject(fileRef);

      // Delete the metadata from Firestore
      await deleteDoc(doc(db, "uploadedFile", file.id));

      toast.success(`"${file.fileName}" has been deleted successfully.`);
      await getAllUserFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("There was an error deleting the file. Please try again.");
    }
  };

  // Handle file name edit (rename in Storage + update Firestore)
  const handleEdit = async (fileId, newFileName) => {
    try {
      // Find the old file data
      const oldFileData = fileList.find((f) => f.id === fileId);
      if (!oldFileData) {
        toast.error("Could not find file to edit.");
        return;
      }

      // Prepare Storage references
      const oldFileRef = ref(storage, `file-upload/${oldFileData.fileName}`);
      const newFileRef = ref(storage, `file-upload/${newFileName}`);

      // Check if a file with the new name already exists to prevent overwriting
      const oldFileUrl = await getDownloadURL(oldFileRef);
      const blob = await fetch(oldFileUrl).then((res) => res.blob());

      // Upload the bytes under the new file name
      await uploadBytes(newFileRef, blob);
      console.log("File uploaded with new name.");

      // Delete the old file from Storage
      await deleteObject(oldFileRef);
      console.log("Old file deleted from Storage.");

      // Update Firestore doc with the new file name (and optionally new URL)
      const fileDocRef = doc(db, "uploadedFile", fileId);
      const newUrl = await getDownloadURL(newFileRef);
      await updateDoc(fileDocRef, {
        fileName: newFileName,
        fileUrl: newUrl, // Ensure you have this field in your Firestore documents
      });
      console.log("Firestore document updated.");

      // Notify the user of success
      toast.success(`File name updated to "${newFileName}".`);

      // Refetch the file list to update the UI
      await getAllUserFiles();
    } catch (error) {
      console.error("Error editing file name:", error);
      toast.error(
        "There was an error editing the file name. Please try again."
      );
    }
  };

  // Open the edit modal
  const openEditModal = (file) => {
    setFileToEdit(file);
    setIsEditModalOpen(true);
  };

  // Close the edit modal
  const closeEditModal = () => {
    setFileToEdit(null);
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-5">
      <h2 className="text-[20px]">My Files</h2>

      {fileList.length === 0 ? (
        <>
          <h2 className="mb-6">You don’t have any files</h2>
          <Link
            href={process.env.NEXT_PUBLIC_DOMAIN}
            className="p-2 text-white bg-primary rounded-md mt-7">
            Upload Now
          </Link>
        </>
      ) : (
        <>
          <TotalFileCard totalFile={fileList.length} />
          <FileList
            fileList={fileList}
            onDelete={handleDelete}
            onEdit={openEditModal}
          />
        </>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && fileToEdit && (
        <EditModal
          file={fileToEdit}
          onClose={closeEditModal}
          onSave={handleEdit}
        />
      )}
    </div>
  );
}

export default Files;
