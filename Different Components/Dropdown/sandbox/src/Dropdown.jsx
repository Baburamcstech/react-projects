import React, { useState, useEffect } from "react";
import "./Mycss.css";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const dropdown = document.querySelector(".dropdown");
    if (!isOpen) {
      dropdown.classList.add("open");
    }
  }, [isOpen]);
  const handleDivClick = (e) => {
    if (e.target.className !== "dropbtn") {
      setIsOpen(true);
    }
  };

  const disbtn = () => {
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div onClick={handleDivClick} id="id2">
      {isOpen ? (
        <button className="dropbtn" onClick={disbtn}>
          Dropdown
        </button>
      ) : (
        <div className="dropdown">
          <ul id="removedot">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
