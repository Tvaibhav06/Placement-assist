import React, { useState, useMemo } from "react";
import companiesData from "../data/companies.json";

const CompaniesPage = () => {
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Flatten companies if "All" is selected, else use selected year
  const allCompanies = useMemo(() => {
    if (selectedYear === "All") {
      return Object.values(companiesData).flat();
    }
    return companiesData[selectedYear] || [];
  }, [selectedYear]);

  // Filter companies by search term
  const filteredCompanies = useMemo(() => {
    return allCompanies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCompanies, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const currentCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Companies
      </h1>

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px", alignItems: "center" }}>
        <select
          value={selectedYear}
          onChange={(e) => {
            setSelectedYear(e.target.value);
            setCurrentPage(1); // reset page
          }}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="All">All</option>
          {Object.keys(companiesData).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by company"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", flex: 1 }}
        />
      </div>

      {/* Company Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent:"flex-start" }}>
        {currentCompanies.map(company => (
          <div
            key={company.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              width: "calc(33.33% - 13.33px)", // 3 cards per row with gap
              backgroundColor: "#f9f9f9",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
              transition: "0.3s",
              boxSizing: "border-box"
            }}
          >
            <h2 style={{
              fontSize: "25px",            // thoda bada
              fontWeight: "bold",
              marginBottom: "10px",
              fontFamily: "'Courier New', Courier, monospace", // dusra font
              color: "#0B4A63"             // dusra color
            }}>
              {company.name}
            </h2>

            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Role:</strong> {company.role_of_job}</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Job Type:</strong> {company.job_type}</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Avg CTC:</strong> {company.avg_ctc}</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Highest Package:</strong> {company.highest_package}</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Location:</strong> {company.job_location}</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>CGPA Criteria:</strong> {company.cgpa_criteria}</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Rounds:</strong> {company.number_of_rounds}</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}><strong>Total Offers:</strong> {company.total_offers}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px", flexWrap: "wrap" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: "8px 12px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: currentPage === i + 1 ? "#0B4A63" : "#fff",
                color: currentPage === i + 1 ? "#fff" : "#000",
                cursor: "pointer"
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
