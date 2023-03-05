import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendOtp = () => {
    const navigate = useNavigate();
    const [useremail, setUseremail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://ed-tech-service-backend.onrender.com/admin/otpsend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                useremail
            }),
        });
        const json = await response.json();
        // console.log("---==> ",json);
        if (json.success === true) {
            setTimeout(() => {
                toast.success(
                    "OTP sent to registered mail",
                    {
                        position: "top-center",
                    }
                );
            }, 100);
            localStorage.setItem("adminToken", json.adminToken);
            setTimeout(() => {
                navigate("/admin/updatepassword", { replace: true });
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

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Send Otp
                    </button>
                </div>
                <ToastContainer />
            </form>
        </>
    )
}

export default SendOtp;