import ChatList from "./chatList/ChatList";
import "./list.css";
import Userin from "./userinfo/Userin";
const List = () => {
    return(
        <div className='list'>
            <Userin/>
            <ChatList/>
        </div>
    )
}
export default List