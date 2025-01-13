import { Link } from "@react-email/components";
import React from "react";
function FileList({ fileList }) {
  return (
    fileList && (
      <div className="overflow-x-auto mt-7">
        <table className="min-w-full divide-y-2 divide-gray-700 bg-black text-sm">
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
              <th className="whitespace-nowrap px-4 py-2 font-medium text-white"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {fileList.map((file, index) => (
              <tr className="odd:bg-gray-800" key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-white">
                  {file.fileName}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-white">
                  {file.fileType}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-white">
                  {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-white">
                  <Link
                    href={"/file-preview/" + file.id}
                    className="cursor-pointer">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default FileList;
