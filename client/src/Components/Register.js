import React, {useState,useRef,useEffect,Fragment} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Register = props=>{
    const [user,setUser] = useState({username: "", matric: "", password : "", role : ""});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({username : "", matric: "", password : "",role : ""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
            }
        });
    }



    return(
    <Fragment>
           <Helmet><title>Nimelssa Quiz - Registeration page</title></Helmet>
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please Register</h3>
                <label htmlFor="username" className="sr-only">Username: </label>
                <input type="text" 
                       name="username" 
                       value={user.username}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Username"/>
                <label htmlFor="matric" className="sr-only">Matric: </label>
                <input type="number" 
                       name="matric" 
                       value={user.matric}
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Matric"/>       
                <label htmlFor="password" className="sr-only">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter Password"/>
                <label htmlFor="role" className="sr-only">Role: </label>
                <input type="text" 
                       name="role"
                       value={user.role}  
                       onChange={onChange} 
                       className="form-control" 
                       placeholder="Enter role (admin/user)"/>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Register</button>
                        <br/>
              <h7>Already Registered? <Link to="/login">Login</Link></h7>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    </Fragment>
    )
}

export default Register;