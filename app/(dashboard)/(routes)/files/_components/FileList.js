"use client";

import React from "react";
import Link from "next/link";
import { Trash, Edit3 } from "lucide-react"; // Added Edit3 icon for edit
import PropTypes from "prop-types";

/**
 * @param {Array} fileList - The list of files to render
 * @param {Function} onDelete - Function to handle file deletion
 * @param {Function} onEdit - Function to handle file editing
 */
function FileList({ fileList, onDelete, onEdit }) {
  return (
    <>
      <div className="overflow-x-auto mt-7 px-4">
        <table className="min-w-full divide-y-2 divide-gray-700 bg-black text-sm rounded-lg shadow-lg">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                File Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                Type
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                Size
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {fileList.map((file) => (
              <tr
                className="odd:bg-gray-800 hover:bg-gray-700 transition-colors"
                key={file.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  {file.fileName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-white">
                  {file.fileType}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-white">
                  {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-white flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <Link
                    href={`/file-preview/${file.id}`}
                    className="text-green-400 hover:text-green-600 transition"
                    aria-label={`View ${file.fileName}`}>
                    View
                  </Link>

                  {/* Edit Button */}
                  <button
                    onClick={() => onEdit(file)}
                    className="text-blue-400 hover:text-blue-600 transition"
                    aria-label={`Edit ${file.fileName}`}>
                    <Edit3 />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => onDelete(file)}
                    className="text-red-400 hover:text-red-600 transition"
                    aria-label={`Delete ${file.fileName}`}>
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

FileList.propTypes = {
  fileList: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default FileList;
