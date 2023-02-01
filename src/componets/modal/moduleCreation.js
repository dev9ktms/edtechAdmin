import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";

function Index() {
    const navigate = useNavigate();
    const location = useLocation();
    const portfolioSlug = location.state.portfolioSlug;
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [description, setDescription] = useState("");
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `https://ed-tech-service-backend.onrender.com/edcourse/addModule/${portfolioSlug}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    adminToken: localStorage.getItem("adminToken"),
                },
                body: JSON.stringify({
                    moduleName: name,
                    moduleNumber: number,
                    moduleDescription: description,
                }),
            }
        );
        const json = await response.json();
        if (json.success === true) {
            setTimeout(() => {
                toast.success("Module Created Successfully", {
                    position: "top-center",
                });
            }, 100);
            setTimeout(() => {
                navigate("/account/tutorial/tutorialPage", { replace: true });
            }, 2000);
        }
    };
    return (
        <>
            <center>
                <div className="btn-holder">
                    <Button variant="primary" onClick={handleShow}>
                        + Add Module
                    </Button>
                </div>
            </center>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Module</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Module Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Module Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Module Number</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Module Number"
                                required
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Enter Description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleClose}
                            >
                                Submit
                            </button>
                        </div>
                        <ToastContainer />
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Index;
