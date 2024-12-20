import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import Blog from "./components/Blog/Blog";
import BlogDetail from "./components/Blog/BlogDetail";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/myList";
import UserHome from "./components/UserHome/UserHome";
import "../src/InstagramPost.css";

const MessagesView = () => {
  const [activeTab, setActiveTab] = useState("list"); // Default to "list" view
  const { chatId } = useChatStore();

  return (
    <div className="messages-view">
      {/* Tab Buttons */}
      <div className="tab-buttons">
        <button
          className={activeTab === "chat" ? "active" : ""}
          onClick={() => setActiveTab("chat")}
        >
          Show Chat
        </button>
        <button
          className={activeTab === "detail" ? "active" : ""}
          onClick={() => setActiveTab("detail")}
        >
          Show Detail
        </button>
        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          Show List
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "list" && <List />}
      {activeTab === "chat" && chatId && <Chat />}
      {activeTab === "detail" && chatId && <Detail />}

      {/* Handle no chatId scenario */}
      {(activeTab === "chat" || activeTab === "detail") && !chatId && (
        <div className="no-chat">Please select a chat to continue.</div>
      )}
    </div>
  );
};


const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <Router>
      <div className="instagram-ui">
        {/* Main Content */}
        <div className="container">
          {currentUser ? (
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route path="/search" element={<Blog />} />
              <Route path="/blog-detail/:blogId" element={<BlogDetail />} />
              <Route path="/messages" element={<MessagesView />} />
            </Routes>
          ) : (
            <Login />
          )}
        </div>

        {/* Bottom Navigation */}
        {currentUser && (
          <div className="bottom-nav">
            <NavLink to="/" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
              <span className="icon">🏠</span>
              <span className="label">Home</span>
            </NavLink>
            <NavLink to="/search" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
              <span className="icon">🔍</span>
              <span className="label">Search</span>
            </NavLink>
            <NavLink to="/messages" className={({ isActive }) => (isActive ? "tab active" : "tab")}>
              <span className="icon">💬</span>
              <span className="label">Messages</span>
            </NavLink>
          </div>
        )}
        <Notification />
      </div>
    </Router>
  );
};

export default App;
