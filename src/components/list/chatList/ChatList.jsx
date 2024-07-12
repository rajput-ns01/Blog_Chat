import React, { useEffect, useState } from 'react';
import "./chatlist.css";
import AddUser from './addUser/addUser';
import { useUserStore } from '../../../lib/userStore';
import { onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);
    const [input, setInput] = useState("");
    const [selectedChat, setSelectedChat] = useState(null);

    const { currentUser } = useUserStore();
    const { changeChat } = useChatStore();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const data = res.data();
            if (data && data.chats) {
                const items = data.chats;

                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const user = userDocSnap.data();
                        return { ...item, user };
                    }
                    return item;
                });

                const chatData = await Promise.all(promises);
                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            }
        });

        return () => {
            unSub();
        }
    }, [currentUser.id]);

    const handleSelect = async (chat) => {
        setSelectedChat(chat);

        const userChats = chats.map(item => {
            const { user, ...rest } = item;
            return rest;
        });

        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);
        if (chatIndex !== -1) {
            userChats[chatIndex].isSeen = true;

            const userChatsRef = doc(db, "userchats", currentUser.id);

            try {
                await updateDoc(userChatsRef, {
                    chats: userChats,
                });
                changeChat(chat.chatId, chat.user);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const handleDeleteChat = async (chatId) => {
        try {
            const userChatsRef = doc(db, "userchats", currentUser.id);
            const userChatsSnapshot = await getDoc(userChatsRef);

            if (userChatsSnapshot.exists()) {
                const userChatsData = userChatsSnapshot.data();
                const updatedChats = userChatsData.chats.filter(chat => chat.chatId !== chatId);

                await updateDoc(userChatsRef, {
                    chats: updatedChats,
                });

                setChats(updatedChats);
                setSelectedChat(null); // Clear selected chat after deletion
            }
        } catch (err) {
            console.log(err);
        }
    };

    const filteredChats = chats.filter(c => c.user.username.toLowerCase().includes(input.toLowerCase()));

    return (
        <div className='chatlist'>
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="Search" onChange={(e) => setInput(e.target.value)} />
                </div>
                <img
                    src={addMode ? "./minus.png" : "./plus.png"}
                    alt=""
                    className="add"
                    onClick={() => setAddMode(prev => !prev)}
                />
            </div>

            {filteredChats.map(chat => (
                <div
                    className="item"
                    key={chat.chatId}
                    onClick={() => handleSelect(chat)}
                    style={{
                        backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
                    }}
                >
                    <img src={chat.user?.avatar || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user?.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                    {selectedChat?.chatId === chat.chatId && (
                        <button onClick={() => handleDeleteChat(chat.chatId)} className='deleteButton'><img src='delete.png' className='image'></img></button>
                    )}
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
