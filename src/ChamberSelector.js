import React from 'react';
import { Link } from "react-router-dom";

const ChamberSelector = () => {

  return (
    <>
      Learn more about the:
      <ul>
        <li><Link to="/senate">Senate</Link></li>
        <li><Link to="/house">Congress</Link></li>
      </ul>
    </>
  );
}

export default ChamberSelector;