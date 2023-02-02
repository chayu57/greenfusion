import { Avatar } from "react-rainbow-components";
import "./Userinfo.css";
import { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import user from "../../images/user.png";
import poweroff from "../../images/poweroff.jpg";

const Userinfo=(props)=>{
  const auth=useContext(AuthContext);
  const signoutHandler=()=>{
    auth.logout();
  }
    return(

        <div className="user__info__container">
          <div className="user__logo__container">
            <Avatar className="user__logo" src={user}/>
          </div>
          <div className="user__details__container">
            <h2 className="username">{auth.name}</h2>
            <h3 className="role">{auth.rollno}</h3>
          </div>
          <div className="signout__button__container" onClick={signoutHandler}>
            <Avatar className="signout__button" src={poweroff} />

          </div>
       

        </div>
        
    );
}
export default Userinfo;