"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";

function EditModal({ file, onClose, onSave }) {
  const [newFileName, setNewFileName] = useState(file.fileName);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (newFileName.trim() === "") {
      alert("File name cannot be empty.");
      return;
    }

    setIsSaving(true);
    await onSave(file.id, newFileName.trim());
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">Edit File Name</h2>
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter new file name"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
            disabled={isSaving}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition"
            disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

EditModal.propTypes = {
  file: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditModal;
