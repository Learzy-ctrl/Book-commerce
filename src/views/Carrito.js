import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Col, Container, Row, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import axios from 'axios';
import '../assets/css/styleCart.css';

const Carrito = () => {
    const [carritoData, setCarritoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupons, setAppliedCoupons] = useState([]); // Para almacenar cupones aplicados
    const [descuentos, setDescuentos] = useState([]); // Para almacenar descuentos calculados
    const navigate = useNavigate();


    const handleStarterClick = () => {
        localStorage.removeItem('carritoId');
        navigate(`/starter`);
      };

    useEffect(() => {
        const fetchCarritoData = async () => {
            try {
                const carritoId = localStorage.getItem('carritoId');
                if (!carritoId) {
                    throw new Error('No carritoId found in localStorage');
                }

                const response = await axios.get(`https://tiendaservicios-api-carritocompra.onrender.com/api/carritocompras/${carritoId}`);
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

    const handleCouponClick = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setCouponCode('');
    };

    const handleCouponSubmit = async () => {
        try {
            const response = await axios.get(`http://localhost:7170/api/Cupon/getbycode/${couponCode}`);
            
            if (response.data.result != null) {
                const newCoupon = response.data.result;

                // Agrega el nuevo cupón a la lista de cupones aplicados
                setAppliedCoupons(prevCoupons => [...prevCoupons, newCoupon]);

                // Calcular descuentos
                const descuentosCalculados = carritoData.listaDeProductos.flatMap((producto) => {
                    if (producto.cuponId === newCoupon.cuponId) {
                        const descuento = (producto.precio * newCoupon.porcentajeDescuento) / 100;
                        return {
                            libroId: producto.libroId,
                            descuento: Math.max(descuento, newCoupon.descuentoMinimo)
                        };
                    }
                    return [];
                });

                setDescuentos(prevDescuentos => [...prevDescuentos, ...descuentosCalculados]);
                console.log('Descuentos aplicados:', descuentosCalculados);
            } else {
                console.log('Cupón inválido:', response.data.message);
            }
        } catch (error) {
            console.error('Error aplicando cupón:', error);
        }
        handleModalClose();
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

    // Suma de descuentos
    const descuentosAplicados = descuentos.reduce((sum, descuento) => {
        const producto = productosList.find(p => p.libroId === descuento.libroId);
        return sum + (producto ? descuento.descuento * producto.cantidad : 0);
    }, 0).toFixed(2);

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
                                                        <img src={"data:image/jpeg;base64," + producto.img} className="small-image" alt={producto.tituloLibro} />
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
                                {descuentosAplicados > 0 && (
                                    <Row>
                                        <Col md='8'>
                                            <label style={{ fontSize: '0.9em' }}>Descuento</label>
                                        </Col>
                                        <Col md='4'>
                                            <h7 className="price price-container" style={{ fontSize: '1em', color: '#E53E3E' }}>
                                                <span>$</span>
                                                {descuentosAplicados}
                                            </h7>
                                        </Col>
                                    </Row>
                                )}
                                <Row>
                                    <Col>
                                        <label>
                                            <span className="button-like" onClick={handleCouponClick}>Ingresa código de cupón</span>
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
                                            {(total - descuentosAplicados).toFixed(2)}
                                        </h7>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Button block color="primary" onClick={handleStarterClick}>Continuar compra</Button>
                                </Row>
                            </Container>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {/* Modal de cupón */}
            <Modal isOpen={modalOpen} toggle={handleModalClose}>
                <ModalHeader toggle={handleModalClose}>Ingrese código de cupón</ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        placeholder="Código de cupón"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleCouponSubmit}>Aplicar cupón</Button>
                    <Button color="secondary" onClick={handleModalClose}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default Carrito;
