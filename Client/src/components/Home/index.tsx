import './style.css';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1 className="text-center my-5">Bem vindo ao seu app de agenda</h1>
      <p className="text-center my-5">
        Para se cadastrar ou fazer login clique no botão abaixo <br /> <br /> <br />
        <Button variant="primary">
          <Link to="/login" className="lnk">
            Login
          </Link>
        </Button>{' '}
      </p>
      <br />
    </div>
  );
};
