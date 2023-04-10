import React from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Config } from '../../Config'
import axios from 'axios'

function Signup() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:""
    },
    validate:(values)=>{
      let error ={};
      if(!values.name){
        error.name = "please enter the username"
      }
      if(!values.email){
        error.email="please enter the email"
      }
      if(!values.password){
        error.email="please enter the password"
      }
      return error;
    },
    onSubmit:async(values)=>{
      try {
        console.log(values);
        const user = await axios.post(`${Config.api}/signup`,values);
        console.log(user.data);
        formik.resetForm();
        navigate("/")
      } catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <div className="Signup">
    <div className="Signup-card">
      <div className="Signup-left">
        <h1 className='Signup-Head'>HELLO WORLD.</h1>
        <p >
        Edit PDF by adding text, shapes, comments and highlights. Your secure and simple tool to edit PDF.  
        </p>
        <span className='Signup-para'>Already having an account ?</span>
       
          <Link  to={"/"}> <button className='Signup-button-L'>Login</button></Link> 
         
      </div>
      <div className="Signup-right">
        <h1 className='Signup-Head' style={{color:"rgb(249, 246, 238,0.9)"}}>Signup</h1>
        <form className='Signup-form' onSubmit={formik.handleSubmit}>
          <input type={"text"} placeholder="username" className='Signup-input'
          name='name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}/>
          <input type={"text"} placeholder="email" className='Signup-input'
           name='email'
           value={formik.values.email}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}/>
          
          <input type={"password"} placeholder="password" className='Signup-input'
           name='password'
           value={formik.values.password}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}/>
          <button type='submit' className='Signup-button-R'> Signup</button>

        </form>
      </div>
    </div>
  </div>
  )
}

export default Signup