import type { IUser } from "@/types/index";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react"


const Home = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/userinfo`, {
          withCredentials: true
        });
        console.log(user);
        setUserInfo(user.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

   const handleEditorDidMount = (editor) =>{
    editorRef.current = editor
  }

  const currentValue = () =>{
    console.log(editorRef.current.getValue())
  }
  return (
    <div className="">
      <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" onMount={handleEditorDidMount}/>
  </div>
  );
};

export default Home;
