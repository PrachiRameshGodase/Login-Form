import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

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
//   const [enteredPassword, setEnteredPassword] = useState("");
//   const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]=useReducer(emailReducer, {
    value:"", 
    isValid:null
})
  
const [passwordState,dispatchPassword]=useReducer(passReduce,{
    value:"", 
    isValid:null
})

const authctx=useContext(AuthContext);
  
const {isValid:emailIsValid}=emailState;
const {isValid:passwordIsValid}=passwordState;
  useEffect(()=>{
    console.log("Effect running");
    return(()=>{
        console.log("Effect cleanup")
    })
  },[])

  useEffect(() => {
    const identifier=setTimeout(()=>{
        console.log("checking form validity")
        setFormIsValid(
          emailIsValid && passwordIsValid  && enteredcollegeName.trim().length>4
          );
    },500)
    return ()=>{
        console.log("CleanUp");
        clearTimeout(identifier);
    }
  }, [emailIsValid,passwordIsValid,enteredcollegeName]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:"User_Input",val:event.target.value})
    // setFormIsValid(
    //     event.target.value.includes("@") && passwordState.isValid && enteredcollegeName.trim().length>4
    //         );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:"User_Input",val:event.target.value})
    // setFormIsValid(
    //     emailState.value.includes("@") && event.target.value.trim().length > 6 && enteredcollegeName.trim().length>4
    //     );
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
    authctx.onLogin(emailState.value, passwordState.value,enteredcollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input id="email" 
        label="E-Mail" 
        type="email" 
        isValid={emailIsValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}/>

        <Input id="college" 
        label="College-Name" 
        type="college" 
        isValid={collegeIsValid}
        value={passwordState.value}
        onChange={collegeChangeHandler}
        onBlur={validateCollegeHandler}/>
        
        
        <Input id="password" 
        label="Password" 
        type="password" 
        isValid={passwordIsValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}/>
        
        
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