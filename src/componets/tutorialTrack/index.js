import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Nav from "../nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Index() {
  const [data, setData] = useState([]);
  const [usercred, setUserCred] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();


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
    console.log("--> ", json)
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };



  const allPortfilio = async () => {
    const response = await fetch(
      "https://ed-tech-service-backend.onrender.com/edcourse/allportfolio",
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setData(json);
  };

  const delPortfilio = async (slug) => {
    const response = await fetch(
      `https://ed-tech-service-backend.onrender.com/edcourse/allportfolio/${slug}`,
      {
        method: "DELETE",
      }
    );
    console.log("res => ", response);
  };

  const userdeatils = async () => {
    const response = await fetch(
      "https://ed-tech-service-backend.onrender.com/admin/getadmin",
      {
        method: "GET",
        headers: {
          adminToken: localStorage.getItem("adminToken"),
        },
      }
    );
    const json = await response.json();
    setUserCred(json);
  };

  useEffect(() => {
    allPortfilio();
    userdeatils();
  }, []);

  return (
    <>
      <Nav />
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
          </form>
        </Modal.Body>
      </Modal>

      <div className="header">
        <h1>
          <strong>Pick a Track</strong>
        </h1>
      </div>

      <div className="cards">
        {data &&
          data.map((tutorial) => {
            return (
              <div className="card" key={tutorial.portfolioSlug}>
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>{tutorial.portfolioName}</strong>
                  </h5>
                  <p className="card-text">{tutorial.portfolioDescription}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate("/account/tutorial/tutorialPage", {
                        state: { portfolioSlug: tutorial.portfolioSlug },
                      });
                    }}
                  >
                    View
                  </button>
                  {usercred.useremail === tutorial.portfolioCreator ? (
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => { delPortfilio(tutorial.portfolioSlug); }}
                    ></button>
                  ) : (
                    ""
                  )}

                  <p> Created By : {tutorial.portfolioCreator}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Index;
