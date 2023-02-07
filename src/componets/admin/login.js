import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../nav";

const Login = () => {
    const navigate = useNavigate();
    const [useremail, setUseremail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://ed-tech-service-backend.onrender.com/admin/loginadmin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                useremail, password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success === true) {
            setTimeout(() => {
                toast.success(
                    "Admin Login Successfully",
                    {
                        position: "top-center",
                    }
                );
            }, 100);
            localStorage.setItem("adminToken", json.adminToken);
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 2000);
        } else {
            toast.warn("Invalid Credentials", {
                position: "top-center",
            });
        }
    }

    return (
        <>
            <Nav />
            <form method="POST" onSubmit={handleSubmit}>
                <h3>Log in admin</h3>

                <div className="mb-3">
                    <label>UserEmail</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter UserEmail"
                        required
                        maxLength="50"
                        minLength="2"
                        value={useremail}
                        onChange={(e) => setUseremail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    Not Signed Up? <Link to="/admin/signup">Login</Link>
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
                <ToastContainer />
            </form>
        </>
    )
}

export default Login