import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./consult.css";
import Nav from "../nav";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/moduleCreation";

const TutorialPage = () => {
  const location = useLocation();
  const portfolioSlug = location.state.portfolioSlug;
  const num = location.state.portfolioSlug;
  const [data, setData] = useState([]);
  const [usercred, setUserCred] = useState([]);
  const navigate = useNavigate();

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
      {usercred.useremail === data.portfolioCreator ? <Modal /> : ""}

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
