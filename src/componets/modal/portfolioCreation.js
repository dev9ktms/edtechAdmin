import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


function Index() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {

    setShow(false);

  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://ed-tech-service-backend.onrender.com/edcourse/createportfolio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          adminToken: localStorage.getItem("adminToken"),
        },
        body: JSON.stringify({
          portfolioName: name,
          portfolioDescription: description,
        }),
      }
    );
    const json = await response.json();
    // console.log(json);
    if (json.success === true) {
      setTimeout(() => {
        toast.success("Portfolio Created Successfully", {
          position: "top-center",
        });
      }, 100);
      setTimeout(() => {
        navigate("/account/tutorial", { replace: true });
      }, 2000);
    }
  };
  return (
    <>
      <center>
        <div className="btn-holder">
          <Button variant="primary" onClick={handleShow}>
            + Add Portfolio
          </Button>
        </div>
      </center>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Portfolio Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Portfolio Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
