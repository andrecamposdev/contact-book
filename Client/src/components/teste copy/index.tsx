import axios from 'axios';
import React, { createContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface User {
  email: string;
  password: string;
  user_id: number;
}

export const UserContext = createContext<User>({ email: '', password: '', user_id: 0 });

export const Teste = () => {
  const [user, setUser] = useState<User>({ email: '', password: '', user_id: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: user.email,
        password: user.password,
      });
      console.log(response.status);
      if (response.status === 200) {
        setIsLoggedIn(true);
        console.log('aaaaa');
        const newUser = { ...user, user_id: response.data.data.id };
        setUser(newUser);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 my-3">
          <h1 className="text-center my-3">Login</h1>
          <p className="text-center lead">Faça login ou crie sua conta</p>
          <div className="row">
            <div className="col-lg mx-3 my-3">
              <h4>Faça seu login</h4>
              <UserContext.Provider value={user}>
                <Form onSubmit={handleLogin}>
                  <Form.Text className="text-muted">
                    Se você ja tem conta faça login preenchendo o formulário abaixo:
                  </Form.Text>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Endereço de Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={user.email}
                      onChange={(event) =>
                        setUser({ ...user, email: event.target.value })
                      }
                      placeholder="Coloque seu email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      value={user.password}
                      onChange={(event) =>
                        setUser({ ...user, password: event.target.value })
                      }
                      placeholder="Senha"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Fazer login
                  </Button>
                </Form>
              </UserContext.Provider>
              <br />
              {isLoggedIn && (
                <p>
                  Bem vindo, {user.email} {user.user_id}!
                </p>
              )}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
