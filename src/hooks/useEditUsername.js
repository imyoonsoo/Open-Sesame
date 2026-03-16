import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

function useEditUsername(){
    const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useLocalStorage('username', '');

  useEffect(() => {
    const saved = localStorage.getItem('username');
    if (saved) {
      setUsername(saved);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('username', username);
    setIsEditing(false);
  };

    return {
    isEditing,
    username,
    setUsername,
    setIsEditing,
    handleSave,
  };
}

export default useEditUsername;