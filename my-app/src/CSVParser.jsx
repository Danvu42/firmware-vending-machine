import React, { useState } from 'react';

const CSVParser = () => {
  const [csvData, setCsvData] = useState([]);
  const [delimiter, setDelimiter] = useState(',');
  const [quote, setQuote] = useState('"');
  const [escape, setEscape] = useState('\\');
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
    const data = rows.map(row => {
      return row.split(delimiter).map(cell => {
        return cell.replace(new RegExp(escape + quote, 'g'), quote);
      });
    });
    return data;
  };

  const filterByDate = (row) => {
    const dateColumnIndex = row.length - 1; // Assuming date is the last column
    const dateValue = row[dateColumnIndex].trim(); // Trim to remove leading/trailing spaces
    if (!startDate || !endDate) {
      return true;
    }
    const rowDate = new Date(dateValue);
    const filterStartDate = new Date(startDate);
    const filterEndDate = new Date(endDate);
    return rowDate >= filterStartDate && rowDate <= filterEndDate;
  };

  const filteredData = csvData.filter(row => filterByDate(row));

  return (
    <div>
      <h2>CSV Parser</h2>
      <div>
        <label>Delimiter:</label>
        <input
          type="text"
          value={delimiter}
          onChange={(e) => setDelimiter(e.target.value)}
        />
      </div>
      <div>
        <label>Quote:</label>
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
      </div>
      <div>
        <label>Escape:</label>
        <input
          type="text"
          value={escape}
          onChange={(e) => setEscape(e.target.value)}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {filteredData.length > 0 && (
        <div>
          <h3>Filtered Data:</h3>
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
