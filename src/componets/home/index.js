import React from 'react';
import Record_home from "./record_home.json";
import './home.css';
import Nav from '../nav';

function index() {
  return (
    <>
    <Nav/>
    <div>
     <div className="home">
        {Record_home &&
          Record_home.map((record) => {
            return (
              <span className="home-body" key={record.id}>
                {/* <img src={record.source} alt=""  className="video"/> */}
                <video
                        width="100%"
                        height="100%"
                        src={record.source}
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

export default index ;