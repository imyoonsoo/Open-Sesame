import { useState, useRef } from 'react';

export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; //input의 value 초기화
    }
    fileInputRef.current?.click(); //숨겨둔 input 클릭
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    selectedFile,
    previewUrl,
    fileInputRef,
    handleFileButtonClick,
    handleFileChange,
    handleRemoveFile,
  };
}
