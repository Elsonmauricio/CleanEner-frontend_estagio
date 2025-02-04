import React, { useState } from "react";
import "./FileManager.css";

interface FileUploaderProps {
  onUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Validação do tipo de arquivo
      if (!["image/png", "image/jpeg", "application/pdf"].includes(file.type)) {
        setError("Apenas arquivos PNG, JPEG e PDF são permitidos.");
        return;
      }

      // Validação do tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("O arquivo deve ter no máximo 5MB.");
        return;
      }

      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Nenhum arquivo selecionado.");
      return;
    }

    setUploading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula um upload real
      onUpload(selectedFile); // Envia o arquivo para o FileManager
      setSelectedFile(null);
    } catch (err) {
      setError("Erro ao carregar o arquivo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-uploader">
      <label>
        <input type="file" onChange={handleFileChange} />
        <p>📤 Clique aqui ou arraste um arquivo para carregar</p>
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {selectedFile && <p>Selecionado: {selectedFile.name}</p>}
      <button className="upload-btn" onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? "Carregando..." : "Carregar Arquivo"}
      </button>
    </div>
  );
};

export default FileUploader;
