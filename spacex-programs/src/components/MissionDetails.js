import React from 'react';
import "./MissionDetails.css";

const MissionDetails = ({ details }) => {

  const {
      flight_number,
      mission_name,
      mission_id,
      launch_year,
      launch_success,
      links,
      rocket,
    } = details;

  const imgSrc = links.mission_patch_small;
  const land_success = rocket.first_stage.cores[0].land_success;

  return (
    <div class="card">
      <div key={flight_number}>
        <div>
          <img
            src={imgSrc}
            alt="mission imgage not available"
            className="mission-image"
          />
        </div>
        <div className="mission-name-and-flight-number">
          {mission_name} #{flight_number}
        </div>
        <div className="label">
          Mission Ids:{" "}
          <ul>
            {" "}
            <li className="value">{mission_id}</li>
          </ul>
        </div>
        <div className="label">
          Launch Year:{" "}
          <span className="value">{launch_year}</span>
        </div>
        <div className="label">
          Successful Launch:{" "}
          <span className="value">
            {launch_success ? "true" : "false"}
          </span>
        </div>
        <div className="label">
          Successful Landing:{" "}
          <span className="value">
            {land_success ? "true" : "false"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MissionDetails
