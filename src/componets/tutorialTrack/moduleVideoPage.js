import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../nav";
import "./videoplayer.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import {  ProgressBar} from "react-bootstrap"

const ModuleVideoPage = () => {
  const location = useLocation();
  const moduleNumber = location.state.moduleNumber;
  const portfolioSlug = location.state.portfolioSlug;
  const [datav, setDatav] = useState([]);
  const [data, setData] = useState([]);
  const [usercred, setUserCred] = useState([]);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  // const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
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
        // onUploadProgress: (e) => { setProgress(Math.round((100 * e.loaded) / e.total)); }
      }
    );
    setUploadButtonText("Video Uploaded");
    const json = await response.json();
    console.log(json.success)
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };


  const getVideo = async () => {
    const response = await fetch(
      `https://ed-tech-service-backend.onrender.com/edcourse/getmodule/${portfolioSlug}/${moduleNumber}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setDatav(json);
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
    getVideo();
    getPortfilio();
    userdeatils();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arr = datav.videos;

  const [toggle, setToggle] = useState("1");
  return (
    <>
      <Nav />
      {usercred.useremail === data.portfolioCreator ? <center>
        <div className="btn-holder" style={{ paddingTop: "10px" }}>
          <Button variant="primary" onClick={handleShow}>
            + Add Video
          </Button>
        </div>
      </center> : ""}

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
              {/* {progress} */}
              {/* {progress && (
                <ProgressBar now={progress} label={`${progress}%`} />
              )} */}
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
          </form>
        </Modal.Body>
      </Modal>

      <h2 className="text-capitalize">{datav.moduleName}</h2>
      {arr &&
        arr.map((item) => {
          return (
            <div key={item._id}>
              <main
                onContextMenu={(e) => e.preventDefault()}
                className="container"
               
              >
                <section className="main-video shadow-sm p-3 bg-white mb-5 rounded hover-shadow">
                  <h4
                    className="text-capitalize text-center"
                    onClick={() => setToggle(item._id)}
                  >
                    {item.videoTitle.slice(0, item.videoTitle.length - 4)}{" "}
                  </h4>
                  {toggle === item._id ? (
                    <>{/* <p>{videoTitle}</p> */}</>
                  ) : null}
                </section>

                <section className="video-playlist">
                  {toggle === item._id ? (
                    <>
                      {/* <p>{videoLink}</p> */}
                      <video
                        onContextMenu={(e) => e.preventDefault()}
                        width="100%"
                        height="100%"
                        src={item.videoLink}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        controls
                        controlsList="nodownload"
                      ></video>
                    </>
                  ) : null}
                </section>
              </main>
            </div>
          );
        })}
    </>
  );
};
export default ModuleVideoPage;
