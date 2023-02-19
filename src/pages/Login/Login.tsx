import React, {useEffect, useState} from 'react';
import './Login.scss'
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/images/kodiva_logo_simple.png'
import {useLoginMutation} from "../../api/loginApi";
import {useNavigate} from "react-router-dom";
import Notification from "../../components/Notification/Notification";

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loginMutation, {isError, isSuccess}] = useLoginMutation();
    const [data, setData] = useState<any>();
    const [displayError, setDisplayError] = useState(false);
    const [loginResult, setLoginResult] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(name, password)
        loginMutation({userName: name, password: password}).then((data) => setData(data))
    }

    useEffect(() => {
        if (isError) {
            setDisplayError(true)
            setLoginResult("ERROR")
            setTimeout(() => {
                setDisplayError(false);
            }, 4000)
        }
        return () => clearTimeout(4000)
    }, [isError])

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem("token", data.data)
            navigate("/home");
        }
    }, [data])

    return (
        <section className="login">
            {displayError && <Notification result={loginResult}/>}
            <div className="login_container">
                <div className="login_container_header">
                    <img src={logo} alt="Kodiva logo"/>
                    <h1>Kodiva</h1>
                </div>
                <form className="login_container_auth-form" onSubmit={(event) => handleSubmit(event)}>
                    <h3>Sign into your account</h3>
                    <div className="login_container_auth-form_username">
                        <input
                            type={"text"}
                            required
                            name="username"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <label htmlFor="username" className="text">
                            Username
                        </label>
                    </div>
                    <div className="login_container_auth-form_password">
                        <input
                            type={"password"}
                            required
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <label htmlFor="password" className="text">
                            Password
                        </label>
                    </div>
                    <button type={"submit"}>LOGIN</button>
                </form>
            </div>
        </section>
    );
};

export default Login;
