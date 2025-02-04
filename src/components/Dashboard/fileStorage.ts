export const saveFile = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("FileStorage", 1);
  
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore("files", { keyPath: "name" });
      };
  
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("files", "readwrite");
        const store = transaction.objectStore("files");
        const fileData = { name: file.name, data: file };
        store.put(fileData);
        resolve();
      };
  
      request.onerror = () => reject(request.error);
    });
  };
  
  export const getFiles = async (): Promise<File[]> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("FileStorage", 1);
  
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = db.transaction("files", "readonly");
        const store = transaction.objectStore("files");
        const getAllRequest = store.getAll();
  
        getAllRequest.onsuccess = () => resolve(getAllRequest.result);
        getAllRequest.onerror = () => reject(getAllRequest.error);
      };
    });
  };
  