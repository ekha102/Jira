import React from 'react'
import { Link, Outlet } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function Layout() {


  return (
    <div className="container-fluid">
      <Navbar
        expand="md"
        className="bg-body-tertiary mb-3"
        bg="primary" data-bs-theme="dark"
      >
        <Container>
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-link" to="/">Home</Link>
              <Link className="nav-link" to="create">Create</Link>
              <Link className="nav-link" to="backlog">Backlog</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Outlet />
    </div>
  )
}
