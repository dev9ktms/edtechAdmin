import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [useremail, setUseremail] = useState("");
    const [otp, setOtp] = useState("");
    const [npassword, setNpassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/admin/passwordreset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                useremail, otp, npassword,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success === true) {
            setTimeout(() => {
                toast.success(
                    "Password Reset Success",
                    {
                        position: "top-center",
                    }
                );
            }, 100);
            localStorage.setItem("adminToken", json.adminToken);
            setTimeout(() => {
                navigate("/admin/login", { replace: true });
            }, 2000);
        } else {
            toast.warn("Invalid Credentials", {
                position: "top-center",
            });
        }
    }

    return (
        <>

            <form method="POST" onSubmit={handleSubmit}>


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
                    <label>Enter OTP</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Otp"
                        required
                        maxLength="50"
                        minLength="2"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Enter New password</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter New password"
                        required
                        maxLength="50"
                        minLength="2"
                        value={npassword}
                        onChange={(e) => setNpassword(e.target.value)}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

                
                <ToastContainer />
            </form>
        </>
    )
}

export default UpdatePassword;