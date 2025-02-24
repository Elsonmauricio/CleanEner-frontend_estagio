import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import { getFiles } from "./fileStorage";
import "./FileManager.css";

interface FileData {
  name: string;
  url: string;
  type: string;
  extractedData?: {
    consumptionData: {
      date: string;
      value: number;
    }[];
  };
}

const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    // Carregar arquivos salvos ao montar o componente
    loadSavedFiles();
  }, []);
  
  const loadSavedFiles = async () => {
    try {
      const savedFiles = await getFiles();
      const fileDataArray = savedFiles.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }));
      setFiles(fileDataArray);
    } catch (error) {
      console.error("Erro ao carregar arquivos:", error);
    }
  };

  const handleUpload = (file: File, extractedData?: any) => {
    const fileUrl = URL.createObjectURL(file);
    setFiles(prevFiles => [...prevFiles, { 
      name: file.name, 
      url: fileUrl, 
      type: file.type,
      extractedData 
    }]);

    // Se houver dados extraídos, emitir evento para atualizar gráficos
    if (extractedData) {
      const event = new CustomEvent('pdfDataExtracted', { 
        detail: extractedData 
      });
      window.dispatchEvent(event);
    }
  };
  
    return (
      <div className="file-manager">
        <h2>📁 Gestão de Documentos</h2>
        <FileUploader onUpload={handleUpload} />
  
        <ul className="file-list">
          {files.map((file, index) => (
            <li key={index} className="file-item">
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                {file.extractedData && (
                  <span className="file-status">✓ Dados processados</span>
                )}
              </div>
              <div className="file-actions">
                <a 
                  href={file.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="view-btn"
                >
                  Visualizar PDF
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
export default FileManager; 