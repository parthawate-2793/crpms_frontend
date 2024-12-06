import React,{ useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        try{
            await login(email,password);
            toast.success('Logged in successfully!');
        } catch(error) {
            toast.error('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer />
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;