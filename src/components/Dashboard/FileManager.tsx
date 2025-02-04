import React, { useState } from "react";
import FileUploader from "./FileUploader";
import "./FileManager.css";

interface FileData {
  name: string;
  url: string;
  type: string;
}

const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  const handleUpload = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    setFiles((prevFiles) => [...prevFiles, { name: file.name, url: fileUrl, type: file.type }]);
  };

  return (
    <div className="file-manager">
      <h2>📁 Gestão de Ficheiros</h2>
      <FileUploader onUpload={handleUpload} />

      <ul className="file-list">
        {files.map((file, index) => (
          <li key={index}>
            {file.type.startsWith("image/") ? (
              <img src={file.url} alt={file.name} />
            ) : (
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileManager;