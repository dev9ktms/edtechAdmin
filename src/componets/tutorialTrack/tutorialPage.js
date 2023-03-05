import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./consult.css";
import Nav from "../nav";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const TutorialPage = () => {
  const location = useLocation();
  const portfolioSlug = location.state.portfolioSlug;
  const num = location.state.portfolioSlug;
  const [data, setData] = useState([]);
  const [usercred, setUserCred] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
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
    console.log("==>", json)
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };


  const getPortfilio = async () => {
    const response = await fetch(
      `https://ed-tech-service-backend.onrender.com/edcourse/allportfolio/${portfolioSlug}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setData(json);
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
    getPortfilio();
    userdeatils();
    // eslint-disable-next-line
  }, []);

  const arr = data.modules;

  return (
    <div>
      <Nav />
      <br />
      {usercred.useremail === data.portfolioCreator ?
        <center>
          <div className="btn-holder">
            <Button variant="primary" onClick={handleShow}>
              + Add Module
            </Button>
          </div>
        </center>
        :
        ""}

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
          </form>
        </Modal.Body>
      </Modal>

      <div className="cards">
        <div className="card" key={data._id}>
          <div className="card-body">
            <h3 className="card-title" style={{ paddingBottom: "20px" }}>
              <strong>{data.portfolioName}</strong>
            </h3>
            <p className="card-text">{data.portfolioDescription}</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="box w-25">
          <h4>Tutorial Track</h4>
        </div>
      </div>

      {arr &&
        arr.map((tutorial) => {
          return (
            <div className="cards" key={tutorial._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>{tutorial.moduleName}</strong>
                  </h5>
                  <p className="card-text">{tutorial.moduleDescription}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate("/account/tutorial/tutorialPage/modulevideo", {
                        state: {
                          moduleNumber: tutorial.moduleNumber,
                          portfolioSlug: num,
                        },
                      })
                    }
                  >
                    Enter
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TutorialPage;
