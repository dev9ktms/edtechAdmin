import React, { useState, useEffect } from "react";
import Nav from '../nav'

const Profile = () => {
    const [admincred, setAdminCred] = useState([]);
    const userdeatils = async () => {
        const response = await fetch("https://ed-tech-service-backend.onrender.com/admin/getadmin", {
            method: "GET",
            headers: {
                adminToken: localStorage.getItem("adminToken"),
            },
        });
        const json = await response.json();
        setAdminCred(json);
    };

    useEffect(() => {
        userdeatils();
    }, []);
    return (
        <>
            <Nav />
            profile
            <h3>
                name : {admincred.useremail}
            </h3>
        </>
    )
}

export default Profile