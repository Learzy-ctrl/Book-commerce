import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const Blog = (props) => {
  const originalPrice = Number(props.price).toFixed(2).split('.');
  const increasedPrice = (Number(props.price) * 1.3).toFixed(2).split('.');
  return (
    <Card>
      <CardImg alt="Card image cap" src={"data:image/jpeg;base64,"+props.image} style={{ height: '300px', objectFit: 'cover' }} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          10.000+ vendidos
        </CardSubtitle>
        <CardText className="mt-3">
          <span style={{ fontSize: '0.8em' }}>$</span>
          <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{originalPrice[0]}</span>
          <span style={{ fontSize: '0.8em' }}>.{originalPrice[1]}</span>
          <span style={{ fontSize: '0.8em', textDecoration: 'line-through', color: 'rgba(0, 0, 0, 0.5)', marginLeft: '10px' }}>
            ${increasedPrice[0]}.{increasedPrice[1]}
          </span>
        </CardText>
        <CardText className="mt-3">Envio gratis a partir de 170$</CardText>
      </CardBody>
    </Card>
  );
};

export default Blog;
