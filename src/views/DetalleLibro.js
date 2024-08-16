import { Row, Col, Card, CardBody, Container, FormGroup, Input, Button, Spinner, Alert } from "reactstrap";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import bg1 from "../assets/images/bg/bg1.jpg";

const DetalleLibro = () => {
    const [selectedOption, setSelectedOption] = useState('1'); // Inicializar con '1'
    const [bookData, setBookData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertColor, setAlertColor] = useState('success');
    const { id } = useParams();

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await axios.get(`https://tendaservicios-api-libro.onrender.com/api/libro/${id}`);
                setBookData(response.data);
            } catch (error) {
                console.error("Error fetching book data:", error);
            }
        };

        fetchBookData();
    }, [id]);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleAddToCart = async () => {
        setIsLoading(true);
        setAlertMessage('');

        const cantidad = Number(selectedOption); // Asegúrate de convertir a número
        const productoLista = Array(cantidad).fill(id);
        const carritoId = localStorage.getItem('carritoId');
        console.log(carritoId);
        try {
            if (carritoId) {
                console.log("put");
                // Hacer PUT si ya existe carritoId en localStorage
                console.log(productoLista);
                await axios.put('https://tiendaservicios-api-carritocompra.onrender.com/api/carritocompras', {
                    carritoSessionId: parseInt(carritoId),
                    productoLista
                });

                setAlertMessage('Carrito actualizado exitosamente!');
                setAlertColor('success');
            } else {
                // Hacer POST si no existe carritoId en localStorage
                console.log("post");
                const fechaCreacionSesion = new Date().toISOString();
                
                const response = await axios.post('https://tiendaservicios-api-carritocompra.onrender.com/api/carritocompras', {
                    fechaCreacionSesion,
                    productoLista
                });

                localStorage.setItem('carritoId', response.data);

                setAlertMessage('Libro agregado al carrito exitosamente!');
                setAlertColor('success');
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            setAlertMessage('Error al agregar el libro al carrito.');
            setAlertColor('danger');
        } finally {
            setIsLoading(false);
        }
    };

    if (!bookData) {
        return <p>Loading...</p>;
    }

    const precioMensual = (bookData.precio / 3).toFixed(2);

    return (
        <>
            <Card>
                <br/>
                <br/>
                <Container>
                    <Row>
                        <Col md='8'>
                            <Container>
                                <Row>
                                    <Col md='6' style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img src={"data:image/jpeg;base64,"+bookData.img || bg1} style={{ width: '100%', height: 'auto' }} alt={bookData.titulo}></img>
                                    </Col>
                                    <Col md='6'>
                                        <span style={{ fontSize: '0.8em', color: 'rgba(0, 0, 0, 0.5)' }}>Nuevo | +1000 vendidos</span>
                                        <br />
                                        <br />
                                        <h4 style={{ fontWeight: 'bold' }}>{bookData.titulo} - {bookData.descripcion}</h4>
                                        <label>
                                            <span style={{ fontSize: '0.8em', color: 'rgba(0, 0, 0, 0.5)' }}>4.8 </span>
                                            <FontAwesomeIcon icon={faStar} style={{ color: '#39C449' }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: '#39C449' }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: '#39C449' }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: '#39C449' }} />
                                            <FontAwesomeIcon icon={faStar} style={{ color: '#39C449' }} />
                                            <span style={{ fontSize: '0.8em', color: 'rgba(0, 0, 0, 0.5)' }}> (167)</span>
                                        </label>
                                        <br />
                                        <br />
                                        <h2>${bookData.precio}</h2>
                                        <label>
                                            <span style={{ fontSize: '1em', }}>en</span>
                                            <span style={{ fontSize: '1em', color: '#2CB56E' }}> 3 meses sin intereses de ${precioMensual}</span>
                                        </label>
                                        <label>
                                            <span style={{ fontSize: '0.85em', color: '#4D93FB' }}>ver los medios de pago</span>
                                        </label>
                                        <br />
                                        <br />
                                        <label>
                                            <span style={{ fontSize: '0.85em' }}>Opciones de compra:</span>
                                        </label>
                                        <br />
                                        <label>
                                            <span style={{ fontSize: '0.85em', color: '#4D93FB' }}>20 productos nuevos desde $ 169</span>
                                        </label>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <label>
                                        <span style={{ fontSize: '0.85em', color: '#2CB56E' }}>Llega gratis</span>
                                        <span style={{ fontSize: '0.85em', }}> entre el lunes y viernes</span>
                                    </label>
                                    <label>
                                        <span style={{ fontSize: '0.85em', color: '#4D93FB' }}>ver formas de entrega</span>
                                    </label>
                                    <br />
                                    <br />
                                    <h6 style={{ fontWeight: 'bold' }}>Stock disponible</h6>
                                    <h9 style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Almacenado y enviado por</h9>
                                    <br/>
                                    <br/>
                                    <Container>
                                        <Row>
                                            <Col md='7'>
                                                <FormGroup>
                                                    <Input type="select" name="select" id="exampleSelect" value={selectedOption} onChange={handleSelectChange}>
                                                        <option value="1">1 Unidad</option>
                                                        <option value="2">2 Unidades</option>
                                                        <option value="3">3 Unidades</option>
                                                        <option value="4">4 Unidades</option>
                                                        <option value="5">5 Unidades</option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <span style={{ fontSize: '0.75em', color: 'rgba(0, 0, 0, 0.5)' }}>(+50 disponibles)</span>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <br/>
                                    <Container>
                                        <Row>
                                            <Col md='12'>
                                                <Button color="success" size="lg" block>Comprar ahora</Button>
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col md='12'>
                                                <Button color="primary" outline size="lg" block onClick={handleAddToCart} disabled={isLoading}>
                                                    {isLoading ? <Spinner size="sm" /> : 'Agregar al carrito'}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Container>
                                </CardBody>
                                <br/>
                                <br/>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Card>
            {alertMessage && (
                <Container>
                    <Row>
                        <Col md='12'>
                            <Alert color={alertColor}>
                                {alertMessage}
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default DetalleLibro;
