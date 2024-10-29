// components/Popup.js
"use client";

import React from "react";

const Popup = ({ onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Nhìn xuống dưới để tắt popup!</h2>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    textAlign: "center",
  },
};

export default Popup;
