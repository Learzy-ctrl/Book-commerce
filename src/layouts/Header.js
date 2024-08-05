import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Button,
  Input,
  Row,
  Col,
  Container,
} from "reactstrap";
import Logo from "./Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as LogoWhite } from "../assets/images/logos/materialprowhite.svg";

const Header = () => {
  return (
    <Navbar color="success" dark expand="md" className="fix-header">
      <Container className="d-lg-block d-none">
        <Row>
          <Col md='2'>
            <div className="me-5 pe-3">
              <Logo />
            </div>
          </Col>
          <Col md='2'>
            <Container>
              <Row>
                <label style={{ color: 'white' }}>Enviar a Israel</label>
              </Row>
              <Row>
                <Col md='1'>
                  <FontAwesomeIcon icon={faLocationDot} style={{ color: 'white' }} />
                </Col>
                <Col md='10'>
                  <label style={{ color: 'white', fontWeight: 'bold' }}>Tula de Allende</label>
                </Col>
              </Row>
            </Container>

          </Col>
          <Col md='4'>
            <Container>
              <Row>
                <Col md='11' className="pe-0 ">
                  <Input placeholder="Buscas algun libro?"></Input>
                </Col>
                <Col md='1' className="ps-0">
                  <Button><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
                </Col>
              </Row>
            </Container>

          </Col>
          <Col md='2'>
            <div>
              <Row>
                <label style={{ color: 'white' }}>Hola Israel !!</label>
              </Row>
              <Row>
                <label style={{ color: 'white', fontWeight: 'bold' }}>ir a Cuenta</label>
              </Row>
            </div>
          </Col >
          <Col md='2'>

            <Container>
              <Row>
                <Col className="d-flex justify-content-center align-items-center pe-0" style={{ height: 'auto' }}>
                  <Link to="/carrito">
                    <FontAwesomeIcon icon={faCartShopping} style={{ color: 'white', width: '100%', height: '100%' }} />
                  </Link>
                </Col>
                <Col md='8' className="ps-0">
                  <Container>
                    <Row>
                      <label style={{ color: 'white', fontWeight: 'bold' }}>4</label>
                    </Row>
                    <Row>
                      <label style={{ color: 'white', fontWeight: 'bold' }}>Carrito</label>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>



      <NavbarBrand href="/">
        <LogoWhite className=" d-lg-none" />
      </NavbarBrand>
    </Navbar>
  );
};

export default Header;
