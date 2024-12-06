import React,{ useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer,toast } from "react-toastify";

const RegisterForm = () => {
    const {register} = useContext(AuthContext);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            toast.success('Registration successful! Please login.');
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer />
            <h2>Register</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} required/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;