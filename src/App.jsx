import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/myList";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import ActivityPage from "./components/activity/ActivityPage";

const App = () => {

  const {currentUser,isLoading,fetchUserInfo} = useUserStore();

  const {chatId} = useChatStore(); 


  useEffect(()=>{
    const unSub = onAuthStateChanged(auth,(user)=>{
      fetchUserInfo(user?.uid);
    })

    return ()=>{
      unSub();
    }
  },[fetchUserInfo]);

  if(isLoading)return <div className="loading">Loading...</div>

  return (
    <div className='container'>
      {
        currentUser ? (
<>
        
      <List/>
      {chatId && <Chat/>}
      {chatId && <Detail/>}
      <ActivityPage/>
      </>
    ) : (<Login/>)
  }
  <Notification/>
    </div>
  )
}

export default App