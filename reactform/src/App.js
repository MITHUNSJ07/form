// Filename - App.js
// It contains the Form, its Structure
// and Basic Form Functionalities

// 
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("male");
  const [subjects, setSubjects] = useState({
    english: true,
    maths: false,
    physics: false,
  });
  const [resume, setResume] = useState(null);
  const [url, setUrl] = useState("");
  const [choice, setChoice] = useState("");
  const [about, setAbout] = useState("");

  const handleSubjectChange = (subject) => {
    setSubjects((prev) => ({
      ...prev,
      [subject]: !prev[subject],
    }));
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContact("");
    setGender("male");
    setSubjects({
      english: true,
      maths: false,
      physics: false,
    });
    setResume(null);
    setUrl("");
    setChoice("");
    setAbout("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("gender", gender);
    formData.append("subject", JSON.stringify(subjects));  // Store subjects as JSON
    formData.append("resume", resume);
    formData.append("url", url);
    formData.append("choice", choice);
    formData.append("about", about);

    axios
      .post("http://localhost:5005/submit-form", formData)
      .then((response) => {
        if (response.status === 200) {
          alert("Form submitted successfully!");
        } else {
          console.error("Unexpected response:", response);
          alert("Failed to submit the form. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);
        alert("Failed to submit the form. Please try again.");
      });
  };

  return (
    <div className="App">
      <h1>Form in React</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="firstname">First Name*</label>
          <input
            id="firstname"
            type="text"
            placeholder="Enter First Name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <label htmlFor="lastname">Last Name*</label>
          <input
            id="lastname"
            type="text"
            placeholder="Enter Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label htmlFor="email">Enter Email*</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="contact">Enter Contact*</label>
          <input
            id="contact"
            type="tel"
            placeholder="Enter Mobile number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />

          <label>Gender*</label>
          <div className="radio-group">
            <input
              type="radio"
              id="male"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male">Male</label>

            <input
              type="radio"
              id="female"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">Female</label>

            <input
              type="radio"
              id="other"
              value="other"
              checked={gender === "other"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="other">Other</label>
          </div>

          <label>Your best Subject</label>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="english"
              checked={subjects.english}
              onChange={() => handleSubjectChange("english")}
            />
            <label htmlFor="english">English</label>

            <input
              type="checkbox"
              id="maths"
              checked={subjects.maths}
              onChange={() => handleSubjectChange("maths")}
            />
            <label htmlFor="maths">Maths</label>

            <input
              type="checkbox"
              id="physics"
              checked={subjects.physics}
              onChange={() => handleSubjectChange("physics")}
            />
            <label htmlFor="physics">Physics</label>
          </div>

          <label htmlFor="resume">Upload Resume*</label>
          <input
            id="resume"
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />

          <label htmlFor="url">Enter URL*</label>
          <input
            id="url"
            type="url"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          <label htmlFor="choice">Select your choice</label>
          <select
            id="choice"
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
            required
          >
            <option value="" disabled>
              Select your choice
            </option>
            <optgroup label="Beginners">
              <option value="1">HTML</option>
              <option value="2">CSS</option>
              <option value="3">JavaScript</option>
            </optgroup>
            <optgroup label="Advanced">
              <option value="4">React</option>
              <option value="5">Node</option>
              <option value="6">Express</option>
              <option value="7">MongoDB</option>
            </optgroup>
          </select>

          <label htmlFor="about">About</label>
          <textarea
            id="about"
            placeholder="About yourself"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            required
          ></textarea>

          <button type="reset" onClick={handleReset}>
            Reset
          </button>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default App;