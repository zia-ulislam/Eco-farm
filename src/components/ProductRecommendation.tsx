import React, { useState } from 'react';
import './ProductRecommendation.css';

const districtsData = {
  Punjab: [
    "Attock", "Bahawalnagar", "Bahawalpur", "Bhakkar", "Chakwal", "Chiniot",
    "Dera Ghazi Khan", "Faisalabad", "Gujranwala", "Gujrat", "Hafizabad",
    "Jhang", "Jhelum", "Kasur", "Khanewal", "Khushab", "Lahore", "Layyah",
    "Lodhran", "Mandi Bahauddin", "Mianwali", "Multan", "Muzaffargarh",
    "Nankana Sahib", "Narowal", "Okara", "Pakpattan", "Rahim Yar Khan",
    "Rajanpur", "Rawalpindi", "Sahiwal", "Sargodha", "Sheikhupura", "Sialkot",
    "Toba Tek Singh", "Vehari"
  ],
  Sindh: [
    "Badin", "Dadu", "Ghotki", "Hyderabad", "Jacobabad", "Jamshoro",
    "Karachi Central", "Karachi East", "Karachi South", "Karachi West",
    "Karachi Malir", "Kashmore", "Khairpur", "Larkana", "Matiari",
    "Mirpur Khas", "Naushahro Feroze", "Qambar Shahdadkot", "Sanghar",
    "Shaheed Benazirabad", "Shikarpur", "Sukkur", "Tando Allahyar",
    "Tando Muhammad Khan", "Tharparkar", "Thatta", "Umerkot"
  ],
  KPK: [
    "Abbottabad", "Bajaur", "Bannu", "Battagram", "Buner", "Charsadda",
    "Dera Ismail Khan", "Hangu", "Haripur", "Karak", "Khyber", "Kohat",
    "Kohistan Lower", "Kohistan Upper", "Kolai Pallas", "Lakki Marwat",
    "Malakand", "Mansehra", "Mardan", "Mohmand", "Nowshera", "Orakzai",
    "Peshawar", "Shangla", "South Waziristan", "Swabi", "Swat", "Tank",
    "Torghar", "Upper Chitral", "Lower Chitral", "Upper Dir", "Lower Dir"
  ],
  Balochistan: [
    "Awaran", "Barkhan", "Chagai", "Dera Bugti", "Gwadar", "Harnai",
    "Jafarabad", "Jhal Magsi", "Kalat", "Kech (Turbat)", "Kharan", "Khuzdar",
    "Kohlu", "Lasbela", "Loralai", "Mastung", "Musakhel", "Naseerabad",
    "Nushki", "Panjgur", "Pishin", "Qila Abdullah", "Qila Saifullah",
    "Quetta", "Sherani", "Sibi", "Sohbatpur", "Washuk", "Zhob", "Ziarat"
  ],
  "Gilgit-Baltistan": [
    "Astore", "Diamer", "Ghanche", "Ghizer", "Gilgit", "Hunza",
    "Nagar", "Skardu", "Shigar", "Kharmang"
  ],
  AJK: [
    "Bagh", "Bhimber", "Hattian Bala", "Haveli", "Kotli", "Mirpur",
    "Muzaffarabad", "Neelum", "Poonch", "Sudhnoti"
  ],
  ICT: ["Islamabad"]
};

const customFields = [
  "District",
  "Soil Type",
  "pH Range",
  "Electrical Conductivity(EC)",
  "Temperature Range(°C)",
  "Organic Matter(%)",
  "Phosphorus(mg/kg)",
  "Potassium(mg/kg)"
];

export default function ProductRecommendation() {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [customData, setCustomData] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomData({ ...customData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isDistrictSelected = selectedProvince !== '';
    const isCustomDataFilled = Object.values(customData).some(value => value.trim() !== '');

    if (isDistrictSelected || isCustomDataFilled) {
      alert("Form submitted successfully!");
    } else {
      alert("Please select a district or fill custom data.");
    }
  };

  return (
    <div className="recommendation-container">
      <h1>Product Recommendation</h1>
      <form onSubmit={handleSubmit} className="recommendation-form">
        <div className="dropdown-container">
          <label htmlFor="province">Select Province:</label>
          <select
            id="province"
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">Select Province:</option>
            {Object.keys(districtsData).map((province) => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>

          {selectedProvince && (
            <>
              <label htmlFor="district">Select District:</label>
              <select id="district">
                <option value="">Select District:</option>
                {districtsData[selectedProvince].map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </>
          )}
        </div>

        <div className="divider">OR</div>

        <div className="input-grid">
          {customFields.map((label) => (
            <div key={label} className="input-group">
              <label htmlFor={label}>{label}</label>
              <input
                type="text"
                id={label}
                name={label}
                placeholder={`Enter ${label}`}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}