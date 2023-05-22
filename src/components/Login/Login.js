import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer=(state,action)=>{
    if(action.type==="User_Input"){
        return {value: action.val, isValid:action.val.includes("@")}
    }
    if(action.type==="Input_Blur"){
        return {value:state.value,isValid:state.value.includes("@")}
    }
    return {value:"", isValid:false}
}

const passReduce=(state,action)=>{
    if(action.type==="User_Input"){
        return {value: action.val, isValid:action.val.trim().length > 6}
    }
    if(action.type==="Input_Blur"){
        return {value:state.value,isValid:state.value.trim().length > 6}
    }
    return {value:"", isValid:false}
}

const Login = (props) => {
//   const [enteredEmail, setEnteredEmail] = useState("");
//   const [emailIsValid, setEmailIsValid] = useState();
  const[enteredcollegeName,setEnteredcollegeName]=useState("");
  const[collegeIsValid,SetCollegeIsValid]=useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]=useReducer(emailReducer, {
    value:"", 
    isValid:null
})
  
const [passwordState,dispatchPassword]=useReducer(passReduce,{
    value:"", 
    isValid:null
})
  
  useEffect(()=>{
    console.log("Effect running");
    return(()=>{
        console.log("Effect cleanup")
    })
  },[])

//   useEffect(() => {
//     const identifier=setTimeout(()=>{
//         console.log("checking form validity")
//         setFormIsValid(
//             enteredEmail.includes("@") && enteredPassword.trim().length > 6 && enteredcollegeName.trim().length>4
//           );
//     },500)
//     return ()=>{
//         console.log("CleanUp");
//         clearTimeout(identifier);
//     }
//   }, [enteredEmail,enteredPassword,enteredcollegeName]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:"User_Input",val:event.target.value})
    setFormIsValid(
        event.target.value.includes("@") && passwordState.isValid && enteredcollegeName.trim().length>4
            );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:"User_Input",val:event.target.value})
    setFormIsValid(
        emailState.value.includes("@") && event.target.value.trim().length > 6 && enteredcollegeName.trim().length>4
        );
  };
  const collegeChangeHandler=(event)=>{
    setEnteredcollegeName(event.target.value);
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type:"Input_Blur"})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:"Input_Blur"})
  };
  const validateCollegeHandler=()=>{
    SetCollegeIsValid(enteredcollegeName.trim().length >4)
  }


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value,enteredcollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div  className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}>
        <label htmlFor="college">College-Name</label>
          <input
            type="text"
            id="college"
            value={enteredcollegeName}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;