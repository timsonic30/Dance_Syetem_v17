"use client";

import React, { useState } from "react";
import "./competition.css";

export default function Competition() {
  // State management
  const [formData, setFormData] = useState({
    crewName: "",
    contactName: "",
    contactNumber: "+852",
    instagram: "@",
    category: "",
    teamMembers: "",
    videoURL: "",
    transactionSlip: null,
  });
  const [formError, setFormError] = useState(""); // Tracks form validation errors
  const [submitStatus, setSubmitStatus] = useState(""); // Feedback for submission status

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input separately for transactionSlip
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      transactionSlip: file,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.crewName ||
      !formData.contactName ||
      !formData.contactNumber ||
      !formData.category ||
      !formData.teamMembers ||
      !formData.videoURL ||
      !formData.transactionSlip
    ) {
      setFormError("Please fill out all required fields correctly.");
      return;
    }

    setFormError(""); // Clear existing errors
    setSubmitStatus("Submitting...");

    try {
      // Prepare data for submission
      const submissionData = new FormData();
      Object.keys(formData).forEach((key) => {
        submissionData.append(key, formData[key]);
      });

      

      // Make POST request to backend
      const response = await fetch("http://localhost:3030/competitionApply/submit", {
        method: "POST",
        body: submissionData,
      });

      if (response.ok) {
        setSubmitStatus("Submission successful!");
        setFormData({
          crewName: "",
          contactName: "",
          contactNumber: "+852",
          instagram: "@",
          category: "",
          teamMembers: "",
          videoURL: "",
          transactionSlip: null,
        }); // Reset form fields
      } else {
        setSubmitStatus("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setSubmitStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="competition-container">
      <form onSubmit={handleFormSubmit}>
        <h3>Competition Registration Form</h3>
        <h5>* Required fields</h5>

        {/* Crew Name */}
        <label>
          Crew Name*:
          <input
            type="text"
            name="crewName"
            value={formData.crewName}
            onChange={handleInputChange}
            required
            placeholder="Enter your crew name"
          />
        </label>
        <br />

        {/* Contact Name */}
        <label>
          Contact Name*:
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            required
            placeholder="Enter contact name"
          />
        </label>
        <br />

        {/* Contact Number */}
        <label>
          Contact Number*:
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={(e) => {
              const regex = /^\+852\d{0,8}$/; // Validate format
              if (regex.test(e.target.value)) {
                setFormError("");
                handleInputChange(e);
              } else {
                setFormError("Phone number must start with '+852' and contain up to 8 digits.");
              }
            }}
            required
            placeholder="+852 XXXXXXXX"
          />
        </label>
        {formError && <span style={{ color: "red" }}>{formError}</span>}
        <br />

        {/* Instagram */}
        <label>
          Instagram*:
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={(e) => {
              const updatedValue = "@" + e.target.value.replace(/^@/, "");
              setFormData((prevData) => ({
                ...prevData,
                instagram: updatedValue,
              }));
            }}
            required
            placeholder="Enter Instagram handle"
          />
        </label>
        <br />

        {/* Category */}
        <label>
          Category*:
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select category</option>
            <option value="U12 (Choreography)">U12 (Choreography)</option>
            <option value="U18 (Choreography)">U18 (Choreography)</option>
            <option value="Open (Choreography)">Open (Choreography)</option>
            <option value="K-Pop (Cover)">K-Pop (Cover)</option>
          </select>
        </label>
        <br />

        {/* Team Members */}
        <label>
          Number of Team Members*:
          <input
            type="number"
            name="teamMembers"
            value={formData.teamMembers}
            onChange={handleInputChange}
            required
            placeholder="Enter number of members"
            min="1"
            max="20"
          />
        </label>
        <br />

        {/* Video URL */}
        <label>
          Video Submission URL*:
          <input
            type="url"
            name="videoURL"
            value={formData.videoURL}
            onChange={handleInputChange}
            required
            placeholder="Paste video URL"
          />
        </label>
        <br />

        {/* Transaction Slip */}
        <label>
          Upload Transaction Slip*:
          <input
            type="file"
            name="transactionSlip"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>
        <br />

        {/* Submit Feedback */}
        {submitStatus && <p style={{ color: submitStatus.includes("successful") ? "green" : "red" }}>{submitStatus}</p>}

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
