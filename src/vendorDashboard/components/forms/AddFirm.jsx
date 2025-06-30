import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

function AddFirm() {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem("loginToken");
      if (!loginToken) {
        console.error("User not authorized");
      }
      //we have check box in the form so we have to create a instance
      const formData = new FormData();
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);
      formData.append("image", file);

      category.forEach((value) => {
        formData.append("category", value);
      });
      region.forEach((value) => {
        formData.append("region", value);
      });

      //api call
      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          token: `${loginToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Firm added Successfully");
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);
      }
      const firmId = data.firmId;
      localStorage.setItem("firmId", firmId);
    } catch (error) {
      console.log("Failed to add firm");
    }
  };
  return (
    <div className="loginSection">
      <h3>Add Firm</h3>
      <form
        className="authForm"
        onSubmit={handleFirmSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <label>Firm Name:</label>
        <br />
        <input
          type="text"
          name="firmName"
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
        />
        <br />
        <br />
        <label>Area</label>
        <br />
        <input
          type="text"
          name="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
        <br />
        <div className="check-inp">
          <label>Category</label>
          <br />
          <div className="inputscontainer">
            <div className="checkContainer">
              <label>Veg</label>
              <input
                type="checkbox"
                value="veg"
                checked={category.includes("veg")}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="checkContainer">
              <label>Non Veg</label>
              <input
                type="checkbox"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="check-inp">
          <label>Region</label>
          <br />
          <div className="inputscontainer">
            <div className="checkContainer">
              <label>South-Indian</label>
              <input
                type="checkbox"
                value="south-indian"
                checked={region.includes("south-indian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkContainer">
              <label>North-Indian</label>
              <input
                type="checkbox"
                value="north-indian"
                checked={region.includes("north-indian")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkContainer">
              <label>Chinese</label>
              <input
                type="checkbox"
                value="chinese"
                checked={region.includes("chinese")}
                onChange={handleRegionChange}
              />
            </div>
            <div className="checkContainer">
              <label>Bakery</label>
              <input
                type="checkbox"
                value="bakery"
                checked={region.includes("bakery")}
                onChange={handleRegionChange}
              />
            </div>
          </div>
        </div>
        <br />
        <label>Offer</label>
        <br />
        <input
          type="text"
          value={offer}
          name="offer"
          onChange={(e) => setOffer(e.target.value)}
        />
        <br />
        <br />
        <label>Firm Image</label>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <br />
        <br />
        <div className="btnSubmit2">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddFirm;
