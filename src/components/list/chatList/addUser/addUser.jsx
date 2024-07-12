import "./addUser.css";
import { collection, query, where, getDocs, serverTimestamp ,setDoc,doc, updateDoc, arrayUnion} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useState } from "react";
import { update } from "firebase/database";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
    const [user, setUser] = useState(null);

    const {currentUser} = useUserStore()

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        console.log("Searching for user:", username); // Debugging

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                const userData = querySnapShot.docs[0].data();
                console.log("User found:", userData); // Debugging
                setUser(userData);
            } else {
                console.log("No user found"); // Debugging
                setUser(null);
            }
        } catch (err) {
            console.log("Error fetching user:", err);
        }
    };

    const handleAdd = async () => {
        const chatRef = collection(db, "chats");
    
        try {
            const newChatRef = doc(chatRef);
    
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: []
            });

             // Update the user documents to add the new chat
             const userChatRef = collection(db, "userchats");

            await updateDoc(doc(userChatRef,user.id),{
                chats:arrayUnion({
                    chatId:newChatRef.id,
                    lastMessage:"",
                    receiverId:currentUser.id,
                    updatedAt:Date.now(),
                }),
            });

            await updateDoc(doc(userChatRef,currentUser.id),{
                chats:arrayUnion({
                    chatId:newChatRef.id,
                    lastMessage:"",
                    receiverId:user.id,
                    updatedAt:Date.now(),
                }),
            });
    
        } catch (err) {
            console.error("Error creating chat:", err);
        }
    };
    

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    onChange={() => setUser(null)} // Clear user state on input change
                />
                <button type="submit">Search</button>
            </form>
            {user && (
                <div className="user">
                    <div className="detail">
                        <img src={user.avatar || "./avatar.png"} alt="User Avatar" />
                        <span>{user.username}</span>
                    </div>
                    <button onClick={handleAdd}>Add User</button>
                </div>
            )}
        </div>
    );
};

export default AddUser;
