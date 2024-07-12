import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore"; // Assuming you have a user store
import { useChatStore } from "../../lib/chatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore(); // Correctly invoke the useChatStore hook
    const { currentUser } = useUserStore(); // Correctly invoke the useUserStore hook

    const handleBlock = async () => {
        if (!user) return;
    
        const userDocRef = doc(db, "users", currentUser.id);
    
        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock(); // Toggle the block status for the receiver
        } catch (err) {
            console.log(err);
        }
    };
    

    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt={user?.username || "User Avatar"} />
                <h2>{user?.username || "Jane Doe"}</h2>
                <p>{user?.email || "Lorem ipsum dolor"}</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt="Toggle" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" alt="Toggle" />
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt="Toggle" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="theme.png" alt="Shared" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src="./download.png" alt="Download" className="icon" />
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt="Toggle" />
                    </div>
                </div>
                <button onClick={handleBlock}>
                    {isCurrentUserBlocked ? "You are Blocked!" : isReceiverBlocked ? "User blocked" : "Block User"}
                </button>
                <button className="logout" onClick={() => auth.signOut()}>Logout</button>
            </div>
        </div>
    );
};

export default Detail;
