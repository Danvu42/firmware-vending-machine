import React, { useState } from 'react';

const CSVParser = () => {
  const [csvData, setCsvData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const data = parseCSV(text);
      setCsvData(data);
    };

    reader.readAsText(file);
  };

  const parseCSV = (csvText) => {
    const rows = csvText.split('\n');
    const data = rows.map(row => row.split(','));
    return data;
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filterDataByDate = () => {
    if (!startDate || !endDate) {
      return csvData;
    }

    return csvData.filter(row => {
      const date = new Date(row[8]);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
  };

  const filteredData = filterDataByDate();

  const downloadCSV = () => {
    const csvContent = filteredData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'filtered_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2>CSV Parser</h2>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {filteredData.length > 0 && (
        <div>
          <button onClick={downloadCSV}>Download CSV</button>
          <h3>Parsed Data:</h3>
          <table>
            <thead>
            <tr>
              {csvData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CSVParser;
