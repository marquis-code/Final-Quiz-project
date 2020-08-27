import React, {useState,useContext,Fragment} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Login = props=>{
    const [user,setUser] = useState({matric: "", password : ""});
    const [message,setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.login(user).then(data=>{
            console.log(data);
            const { isAuthenticated,user,message} = data;
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                props.history.push("/play");
            }
            else
                setMessage(message);
        });
    }



    return(
    <Fragment>
           <Helmet><title>Nimelssa Quiz - Login page</title></Helmet>    
        <div>
        <form onSubmit={onSubmit}>
            <h3>Please sign in</h3>
            <label htmlFor="matric" className="sr-only">Matric: </label>
            <input type="number" 
                   name="matric" 
                   onChange={onChange} 
                   className="form-control" 
                   placeholder="Enter Matric"/>
            <label htmlFor="password" className="sr-only">Password: </label>
            <input type="password" 
                   name="password" 
                   onChange={onChange} 
                   className="form-control" 
                   placeholder="Enter Password"/>
            <button className="btn btn-lg btn-primary btn-block" 
                    type="submit">Log in </button>
                    <br/>
            <h7>Dont have an account? <Link to="/register">Create Account</Link></h7>
        </form>
        {message ? <Message message={message}/> : null}
    </div> 
</Fragment>
    )
}

export default Login;