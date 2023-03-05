import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Record_home from "./record_home.json";
import './home.css';
import Nav from '../nav';

function Index() {

  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);
  const [datav, setDatav] = useState([]);
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
      `https://ed-tech-service-backend.onrender.com/homevideo/uploadhomevideo`,
      {
        method: "POST",
        body: formData,
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
      `https://ed-tech-service-backend.onrender.com/homevideo/gethomevideo`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setDatav(json);
  };

  useEffect(() => {
    getVideo();
  }, []);

  console.log("==> ", datav)

  const Record_home = datav;

  return (
    <>
      <Nav />
      <div>

        <center>
          <div className="btn-holder" style={{ paddingTop: "10px" }}>
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
        <div className="home">
        {Record_home &&
          Record_home.map((record) => {
            return (
              <span className="home-body" key={record.id}>
                <video
                        width="100%"
                        height="100%"
                        src={record.videoLink}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        controls
                        controlsList="nodownload"
                      ></video>
              </span>
            );
          })}
      </div>
      </div>

    </>
  )
}

export default Index;