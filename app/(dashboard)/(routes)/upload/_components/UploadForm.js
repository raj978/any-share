import React, { useState } from "react";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";
import { toast } from "react-toastify";

function UploadForm({ uploadBtnClick, progress }) {
  const [file, setFile] = useState();

  const onFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      toast.error("File size exceeded 2MB");
      return;
    }
    setFile(selectedFile);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      onFileSelect(droppedFiles[0]);
    }
  };

  return (
    <div className="text-center">
      <div
        className="flex items-center justify-center w-full text-white"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center 
            w-full h-64 border-2 border-green-300 border-dashed rounded-lg 
            cursor-pointer bg-gray-500">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-12 h-12 mb-4 text-green-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 
                   5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5
                   a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-lg md:text-2xl">
              <span className="font-semibold">Click to upload</span> or{" "}
              <strong className="text-primary">drag</strong> and{" "}
              <strong className="text-primary">drop</strong>
            </p>
            <p className="text-xs text-gray-50">
              SVG, PNG, JPG or GIF ( Max Size : 2MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(event) => onFileSelect(event.target.files[0])}
          />
        </label>
      </div>

      {file ? (
        <FilePreview file={file} removeFile={() => setFile(null)} />
      ) : null}

      {progress > 0 ? (
        <ProgressBar progress={progress} />
      ) : (
        <button
          disabled={!file}
          className="p-2 bg-primary text-white w-[30%] 
            rounded-full mt-5 disabled:bg-gray-400"
          onClick={() => uploadBtnClick(file)}>
          Upload
        </button>
      )}
    </div>
  );
}

export default UploadForm;
