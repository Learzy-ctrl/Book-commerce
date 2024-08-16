import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Blog from '../components/dashboard/Blog';

const Starter = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    axios.get('https://tendaservicios-api-libro.onrender.com/api/libro')
      .then(response => {
        setBlogData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Row>
        {blogData.map((data, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Link to={`/libro-seleccionado/${data.libreriaMaterialId}`} style={{ textDecoration: 'none' }}>
              <Blog
                image={data.img}
                title={data.titulo}
                price={data.precio}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
