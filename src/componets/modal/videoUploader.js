import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";

function VideoUpload() {

    const location = useLocation();
    const portfolioSlug = location.state.portfolioSlug;
    const moduleNumber = location.state.moduleNumber;
    const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
    const [progress, setProgress] = useState();
    const [file, setFile] = useState(null);
    // 
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
    };

    const onChangeHandler = async (e) => {
        e.preventDefault();
        setFile(
            e.target.files[0],
            // loaded: 0,
        );
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video', file);
        const response = await fetch(
            `https://ed-tech-service-backend.onrender.com/edcourse/addvideo/${portfolioSlug}/${moduleNumber}`,
            {
                method: "POST",
                headers: { adminToken: localStorage.getItem("adminToken"), },
                body: formData,
                onUploadProgress: (e) => { setProgress(Math.round((100 * e.loaded) / e.total)); }
            }
        );
        setUploadButtonText("Video Uploaded");
        const json = await response.json();
        console.log(json.success)
        
            setTimeout(() => {
                toast.success("Video Uploaded Successfully", {
                    position: "top-center",
                });
            }, 100);
            setTimeout(() => {
                setShow(false);
                // navigate("/account/tutorial/tutorialPage/modulevideo", { replace: true });
                setUploadButtonText("Upload Video");
            }, 2000);
        
    };
    return (
        <>
            <center>
                <div className="btn-holder" style={{paddingTop:"10px"}}>
                    <Button variant="primary" onClick={handleShow}>
                        + Add Video
                    </Button>
                </div>
            </center>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form method="POST">
                        <div className="mb-3">
                            <label className="btn btn-dark btn-block text-left mt-3">
                                {uploadButtonText}
                                <br />
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={onChangeHandler}
                                    hidden />
                            </label>
                            {progress}
                        </div>
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
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

export default VideoUpload;
