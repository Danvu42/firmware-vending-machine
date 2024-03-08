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
          <h3>Parsed Data:</h3>
          <ul>
            {filteredData.map((row, index) => (
              <li key={index}>{JSON.stringify(row)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CSVParser;
