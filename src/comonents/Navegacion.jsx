import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Logo from "../assets/logo.png"
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import service from '../services/config.services'
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

function Navegacion() {

    const { isLoggedIn, user, logOutUser, userName } = useContext(AuthContext)
    const [buscar, setBuscar] = useState("")
    const [resultadoBuscar, setResultadoBuscar] = useState([])

    const handleBuscar = (event) => {
        let inputBuscar = event.target.value
        setBuscar(inputBuscar)
    }

    const handleSearch = (e) => {
        e.preventDefault()

        service.get(`/search?query=${buscar}`)
            .then((response) => {
                console.log(response.data)
                setResultadoBuscar(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Link to={"/"}>
                        <Navbar.Brand><img id='logo' src={Logo} alt="" /></Navbar.Brand>
                    </Link>
                    {isLoggedIn && (
                        <div>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <NavDropdown title={userName} id="navbarScrollingDropdown">
                                        <Link to={"/create-car"} className='text-decoration-none'>
                                            Subir Coche
                                        </Link>
                                        <br />
                                        <Link to={"/favorites"} className='text-decoration-none'>
                                            Favoritos
                                        </Link>
                                        <br />
                                        <Button id='logout' variant="outline-danger" onClick={logOutUser}>Salir</Button>
                                        <NavDropdown.Divider />
                                    </NavDropdown>
                                </Nav>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Buscar"
                                        className="me-2"
                                        aria-label="Search"
                                        value={buscar}
                                        onChange={handleBuscar}
                                    />
                                    <Button variant="outline-success" onClick={handleSearch}>Buscar</Button>
                                    <div>
                                        <ul>
                                            {resultadoBuscar.map(car => (
                                                <div key={car._id}>
                                                    <li>
                                                        <Link to={`/car/${car._id}`}>
                                                            <Card style={{ width: '18rem' }}>
                                                                <Card.Img variant="top" src={car.imageUrl} width={"30px"} />
                                                                <Card.Body>
                                                                    <p>{car.name}</p>
                                                                </Card.Body>
                                                            </Card>
                                                        </Link>
                                                    </li>
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                </Form>
                            </Navbar.Collapse>
                        </div>
                    )
                    }

                    {
                        !isLoggedIn && (
                            <div>
                                <Link className='text-decoration-none' id='empezar' to={"/signup"}>Registrase</Link>
                                <Link className='text-decoration-none' to={"/login"}>Iniciar Session</Link>
                            </div>
                        )
                    }

                </Container >
            </Navbar >
        </div >
    )
}

export default Navegacion