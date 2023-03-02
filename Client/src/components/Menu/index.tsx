import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
}

export const Menu = (props: NavbarProps) => {
  const { isLoggedIn } = props;
  console.log(isLoggedIn);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <Link to="/" className="lnk">
            Agenda 📖
          </Link>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#home">
            <Link to="/" className="lnk">
              Home
            </Link>
          </Nav.Link>
          <Nav.Link href="#about">
            <Link to="/about" className="lnk">
              About
            </Link>
          </Nav.Link>

          {isLoggedIn ? (
            <>
              <Nav.Link href="#agenda">
                <Link to="/agenda" className="lnk">
                  Agenda
                </Link>
              </Nav.Link>
              <Nav.Link href="#contato">
                <Link to="/contact" className="lnk">
                  Criar contato
                </Link>
              </Nav.Link>
              <Nav.Link href="#logout">
                <Link to="/logout" className="lnk">
                  Logout
                </Link>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="#singup">
                <Link to="/signup" className="lnk">
                  Cadastro
                </Link>
              </Nav.Link>
              <Nav.Link href="#login">
                <Link to="/login" className="lnk">
                  Login
                </Link>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
