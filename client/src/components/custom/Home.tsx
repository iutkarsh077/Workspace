import type { IUser } from "@/types/index";
import axios from "axios";
import { useEffect, useState } from "react";


const Home = () => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
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
  return <div>This is a Home {userInfo?.email}</div>;
};

export default Home;
