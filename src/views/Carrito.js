import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import axios from 'axios';
import '../assets/css/styleCart.css';
import bg1 from "../assets/images/bg/bg1.jpg";

const Carrito = () => {
    const [carritoData, setCarritoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarritoData = async () => {
            try {
                const carritoId = localStorage.getItem('carritoId');
                if (!carritoId) {
                    throw new Error('No carritoId found in localStorage');
                }

                const response = await axios.get(`http://localhost:7258/api/carritocompras/${carritoId}`);
                setCarritoData(response.data);
            } catch (error) {
                console.error('Error fetching carrito data:', error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCarritoData();
    }, []);

    const handleEliminar = (libroId) => {
        alert(`Eliminar libro con ID: ${libroId}`);
        // Aquí puedes agregar la lógica para eliminar el producto
    };

    const handleGuardar = (libroId) => {
        alert(`Guardar libro con ID: ${libroId}`);
        // Aquí puedes agregar la lógica para guardar el producto
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!carritoData) {
        return <p>No data found</p>;
    }

    // Agrupa los productos por libroId
    const productosAgrupados = carritoData.listaDeProductos.reduce((acc, producto) => {
        if (!acc[producto.libroId]) {
            acc[producto.libroId] = {
                ...producto,
                cantidad: 0,
                precioTotal: 0
            };
        }
        acc[producto.libroId].cantidad += 1;
        acc[producto.libroId].precioTotal += producto.precio;

        return acc;
    }, {});

    const productosList = Object.values(productosAgrupados);

    // Calcula el total de productos y el total en dinero
    const totalCantidad = productosList.reduce((sum, producto) => sum + producto.cantidad, 0);
    const total = productosList.reduce((sum, producto) => sum + producto.precioTotal, 0).toFixed(2);

    return (
        <Container>
            <Row>
                <Col md='8'>
                    <Card>
                        <CardBody>
                            <Container>
                                <Row>
                                    <Col>
                                        <CardTitle tag="h7" style={{ fontWeight: 'bold' }}>Productos</CardTitle>
                                        <br />
                                        <br />
                                        <hr />
                                    </Col>
                                </Row>
                                {productosList.map((producto, index) => (
                                    <Row key={index}>
                                        <Col md='12'>
                                            <br />
                                            <Container>
                                                <Row>
                                                    <Col md='1'>
                                                        <img src={"data:image/jpeg;base64,"+producto.img} className="small-image" alt={producto.tituloLibro} />
                                                    </Col>
                                                    <Col md='6'>
                                                        <Container>
                                                            <Row>
                                                                <h7 style={{ fontWeight: 'bold' }}>{producto.tituloLibro}</h7>
                                                            </Row>
                                                            <Row>
                                                                <Col md='3'>
                                                                    <label>
                                                                        <span className="button-like" onClick={() => handleEliminar(producto.libroId)}>Eliminar</span>
                                                                    </label>
                                                                </Col>
                                                                <Col md='3'>
                                                                    <label>
                                                                        <span className="button-like" onClick={() => handleGuardar(producto.libroId)}>Guardar</span>
                                                                    </label>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </Col>
                                                    <Col md='2'>
                                                        <h8 className="center-content">Cantidad:<span style={{ fontWeight: 'bold' }}>{producto.cantidad}</span></h8>
                                                    </Col>
                                                    <Col md="3">
                                                        <h7 className="price price-container">
                                                            <span>$</span>
                                                            {producto.precioTotal.toFixed(2)}
                                                        </h7>
                                                    </Col>
                                                </Row>
                                            </Container>
                                            <br />
                                            <hr />
                                        </Col>
                                    </Row>
                                ))}
                            </Container>
                        </CardBody>
                    </Card>
                </Col>
                <Col md='4'>
                    <Card>
                        <CardBody>
                            <Container>
                                <Row>
                                    <Col>
                                        <CardTitle tag="h8" style={{ fontWeight: 'bold' }}>Resumen de la compra</CardTitle>
                                        <br />
                                        <br />
                                        <hr />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col md='8'>
                                        <label style={{ fontSize: '0.9em' }}>Productos({totalCantidad})</label>
                                    </Col>
                                    <Col md='4'>
                                        <h7 className="price price-container" style={{ fontSize: '1em' }}>
                                            <span>$</span>
                                            {total}
                                        </h7>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col md='10'>
                                        <label style={{ fontSize: '0.9em' }}>Envío</label>
                                    </Col>
                                    <Col md='2'>
                                        <label style={{ fontSize: '0.9em', color: '#39C449' }}>
                                            Gratis
                                        </label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label>
                                            <span className="button-like">Ingresa código de cupón</span>
                                        </label>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col md='8'>
                                        <label style={{ fontSize: '1.1em', fontWeight: 'bold' }}>Total</label>
                                    </Col>
                                    <Col md='4'>
                                        <h7 className="price price-container" style={{ fontSize: '1.1em' }}>
                                            <span>$</span>
                                            {total}
                                        </h7>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Button block color="primary">Continuar compra</Button>
                                </Row>
                            </Container>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Carrito;
