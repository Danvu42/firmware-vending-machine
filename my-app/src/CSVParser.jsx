
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

  const parameters = ["apogee_w_m2","batt_mv","humidity_centi_pct","node_addr","panel_mv","press_pa","schema","temp_c","time_received","uptime_ms"];
  const sampleData = ["603.5","3846","34","65535","4977","100954","1","374","2022-10-25 13:41:33.314048","1030320000"];

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
          <table>
            <thead>
              <tr>
                {parameters.map((param, index) => (
                  <th key={index}>{param}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {sampleData.map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CSVParser;
