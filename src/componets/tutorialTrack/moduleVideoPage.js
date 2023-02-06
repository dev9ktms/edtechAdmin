import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../modal/videoUploader";
import Nav from "../nav";
import "./videoplayer.css";

const ModuleVideoPage = () => {
  const location = useLocation();
  const moduleNumber = location.state.moduleNumber;
  const portfolioSlug = location.state.portfolioSlug;
  const [datav, setDatav] = useState([]);

  useEffect(() => {
    getVideo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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

  const arr = datav.videos;

  const [toggle, setToggle] = useState("1");
  return (
    <>
      <Nav />
      <Modal/>
      <h2 className="text-capitalize">{datav.moduleName}</h2>
        {arr && arr.map((item) => {
          return (
            <>
              <main onContextMenu={(e) => e.preventDefault()} className="container" key={item._id}>
              <section className="main-video shadow-sm p-3 bg-white mb-5 rounded hover-shadow">
              <h4 className="text-capitalize text-center" onClick={() => setToggle(item._id)}>{item.videoTitle.slice(0,item.videoTitle.length-4)} </h4>
                  {toggle === item._id ? (
                    <>{/* <p>{videoTitle}</p> */}</>
                  ) : null}
                </section>

                <section className="video-playlist">
                  {toggle === item._id ? (
                    <>
                      {/* <p>{videoLink}</p> */}
                      <video onContextMenu={(e) => e.preventDefault()}
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
            </>
          );
        })}
      
    </>
  );
};
export default ModuleVideoPage;
