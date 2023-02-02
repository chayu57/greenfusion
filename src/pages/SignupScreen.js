
import "./SignupScreen.css";
import background from "../images/background.jpg";
import { Card, Avatar, Input, Button } from "react-rainbow-components";
import logo from "../images/rolls.png";
import { useState } from "react";
import config from "../utils/config.json";

const logoStyle = { width: 120, height: 120 };
const inputStyles = {
  width: 300,
};

const SignupScreen = (props) => {
  const [rollno, setrollno] = useState();
  const [password, setPassword] = useState();
  const [name,setName]=useState();
  const [secretkey,setSecretKey]=useState();
  const [message,setMessage]=useState();

  const rollnoHandler = (e) => {
    setrollno(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const nameHandler=(e)=>{
    setName(e.target.value);
  }

  const secretkeyHandler=(e)=>{
    setSecretKey(e.target.value);
  }

  const movetoLogin=()=>{
    props.componentHandler("login");
  }

  const signupHandler=()=>{
    const inputs={
        name,
        rollno,
        password,
        secretkey
    };

    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(inputs)
      };
      fetch(config.SERVER.URL+"/api/users/signup", requestOptions)
      .then(async(result) => {
        const data=await result.json();
        
        setMessage(data.message);
      }).catch((err)=>{
        console.log(err);
      });
  }
  return (
    <div
      className="login__screen"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="rainbow-p-around_large flexbox__center card__opacity">
        <Card className="login__card">
          <div className="logo__container">
            <Avatar style={logoStyle} src={logo} />
          </div>
          <div className="login__text__container">
            <p className="login__text">Signup</p>
          </div>
          <div className="rainbow-m-vertical_x-large rainbow-m_auto">
            <div className="rainbow-align-content_center rainbow-flex_wrap">
            <Input
                label="Name"
                placeholder="Name"
                type="text"
                className="rainbow-p-around_medium"
                style={inputStyles}
                onChange={nameHandler}
              />
              <Input
                label="Roll Number"
                placeholder="Roll Number"
                type="text"
                className="rainbow-p-around_medium"
                style={inputStyles}
                onChange={rollnoHandler}
              />

              <Input
                label="Password"
                placeholder="**********"
                type="password"
                className="rainbow-p-around_medium"
                style={inputStyles}
                onChange={passwordHandler}
              />
              <Input
                label="Secret Key"
                placeholder="Secret Key"
                type="text"
                className="rainbow-p-around_medium"
                style={inputStyles}
                onChange={secretkeyHandler}
              />
              <div className="login__button__container">
              <Button
                shaded
                label="Signup"
                onClick={signupHandler}
                variant="brand"
                className="rainbow-m-around_medium"
              />
              </div>
              <p className="new__user__link" onClick={movetoLogin}>Already an User? Click here to Login</p>
              <p className="error__message">{message}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupScreen;

