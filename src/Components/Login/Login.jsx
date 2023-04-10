import React, { useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from 'axios';
import { Config } from '../../Config';
import preloader from "../../preloader.gif"

function Login() {

  const navigate = useNavigate();
  const [loader,setLoader]=useState(false)
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validate:(values)=>{
      let error ={};
      if(!values.email){
        error.name = "please enter the username"
      }
      
      if(!values.password){
        error.email="please enter the password"
      }
      return error;
    },
    onSubmit:async(values)=>{
      try {
        setLoader(true)
        console.log(values);
        const user = await axios.post(`${Config.api}/login`,values);
        // console.log(user.data);
        // formik.resetForm();
        setLoader(false);
        navigate("/pdfeditor");
      } catch (error) {
        console.log(error);
      }
    }
  })


  return (
    <div className="Login">
      <div className="Login-card">
        <div className="Login-left">
          <h1 className='Login-Head'>HELLO WORLD.</h1>
          <p >
          Edit PDF by adding text, shapes, comments and highlights. Your secure and simple tool to edit PDF.  
          </p>
          <span className='Login-para'>Don't you have a account ?</span>
          <Link to={"/Signup"}>
            <button className='Login-button'>Register</button>
            </Link> 
        </div>
        <div className="Login-right">
          <h1 className='Login-Head' style={{color:"rgb(249, 246, 238,0.9)"}}>LOGIN</h1>
          <form className='Login-form' onSubmit={formik.handleSubmit}>
            <input type={"email"} placeholder="email" className='Login-input'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
            <input type={"password"} placeholder="password" className='Login-input'
             name='password'
             value={formik.values.password}
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}/>
            <button type='submit' className='Login-button'>{loader?preloader:"Login"}</button>
    
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login