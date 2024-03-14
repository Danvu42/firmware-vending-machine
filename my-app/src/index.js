import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';
import './style.css'; // Import your existing style.css file
import CSVParser from './CSVParser';
import styled from 'styled-components';

// Styled component for the centered image
const CenteredImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
`;

// Styled component for the heading
const Heading = styled.h1`
  font-family: 'Arial', comic-sans; /* Use Roboto font */
  font-weight: 700; /* Bold */
  color: Green; /* Change color to green */
  display: flex;
  align-items: center; /* Align items vertically */
`;

// Styled component for the Navbar
const StyledNavbar = styled(Navbar)`
  background-color: Green; /* Dark grey background */
`;

// Styled component for the image
const NavbarImage = styled.img`
  position: absolute;
  top: 5px; /* Adjust the distance from the top */
  right: 5px; /* Adjust the distance from the right */
  max-width: 40px; /* Adjust the size of the image */
  border-radius: 50%; /* Make the framing of the image a circle */
`;


// Navbar.Brand styled component
const CenteredNavbarBrand = styled(Navbar.Brand)`
  display: block;
  margin: auto;
  text-align: center;
  width: 100%; /* Ensure the Navbar.Brand takes up the full width */
`;

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <StyledNavbar variant="dark" expand="lg">
        {/* Add the image at the top right corner */}
        <NavbarImage src="https://avatars.githubusercontent.com/u/7014873?s=200&v=4" alt="Avatar" />
        {/* Centered Navbar Brand */}
        <CenteredNavbarBrand href="#">SMART CAMPUS ENERGY LAB</CenteredNavbarBrand>
      </StyledNavbar>

      {/* Add the centered image */}
      <CenteredImage src="https://i0.wp.com/www.eng.hawaii.edu/wp-content/uploads/2019/06/holmeshall.jpg?fit=1800%2C600&ssl=1" alt="Centered Image" />

      {/* Add the heading with the photo */}
      <Heading>
        SCEL VENDING MACHINE
        <img src="/SCEL_Icon.png" alt="Icon" style={{ marginRight: '10px', maxWidth: '100px' }} /> {/* Adjust margin-left and max-width for spacing and size */}
      </Heading>

      {/* Add the CSV Parser component */}
      <CSVParser />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
