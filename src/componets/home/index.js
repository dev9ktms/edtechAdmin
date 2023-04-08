import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import './home.css';
import Nav from '../nav';

function Index() {

  const [usercred, setUserCred] = useState([]);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [show, setShow] = useState(false);
  const [datav, setDatav] = useState([]);
  const [isSelected, setIsSelected] = useState(false)
  const [file, setFile] = useState(null);
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
    setIsSelected(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', file);
    const response = await fetch(
      `https://ed-tech-service-backend.onrender.com/homevideo/uploadhomevideo`,
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          adminToken: localStorage.getItem("adminToken"),
        },
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

  const delVideo = async (videoSlug) => {
    const response = await fetch(
      `https://ed-tech-service-backend.onrender.com/homevideo/${videoSlug}`,
      {
        method: "DELETE",
      }
    );
    console.log("res => ", response);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  useEffect(() => {
    getVideo();
    userdeatils();
  }, []);

  const Record_home = datav;

  return (
    <>
      <Nav />
      <div>
        {!localStorage.adminToken ? "" : <center>
          <div className="btn-holder" style={{ paddingTop: "10px" }}>
            <Button variant="primary" onClick={handleShow}>
              + Add Video
            </Button>
          </div>
        </center>}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Home Videos</Modal.Title>
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
                {isSelected ? (
                  <div>
                    <h2>File Details</h2>
                    <p>Filename: {file.name}</p>
                    <p>Filetype: {file.type}</p>
                    <p>Size in bytes: {file.size}</p>
                    <p>
                      lastModifiedDate:{' '}
                      {file.lastModifiedDate.toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p>Select a file to show details</p>
                )}
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
                <div className="home-body" key={record.id}>
                  <video
                    width="100%"
                    height="100%"
                    src={record.videoLink}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    controls
                    controlsList="nodownload"
                  ></video>
                  <div class="d-flex justify-content-center">
                    <p> Created By : {record.videoCreator}</p>
                    {usercred.useremail === record.videoCreator ? (
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => { delVideo(record.videoSlug); }}
                      ></button>
                    ) : (
                      ""
                    )}
                  </div>

                </div>
              );
            })}
        </div>
      </div>

    </>
  )
}

export default Index;