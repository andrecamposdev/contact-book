import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LoginProps {
  onLogin: () => void;
}

async function login(email: string, password: string): Promise<number> {
  // Envie uma solicitação para o servidor e obtenha o ID do usuário
  const response = await axios.post('http://localhost:3000/login', { email, password });
  console.log(response.data);
  const authorizationString = response.data.cookie[0];
  const startIndex = authorizationString.indexOf('=') + 1;
  const endIndex = authorizationString.indexOf(';');

  const token = authorizationString.substring(startIndex, endIndex);
  console.log(token);
  localStorage.setItem('token', token);
  const userId = response.data.data.id;
  console.log(userId);
  return userId;
}

export const Login = (props: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('oii');
    try {
      const userId = await login(email, password);
      console.log(userId);
      localStorage.setItem('userId', userId.toString());
      props.onLogin();
      toast.success('Login efetuado com sucesso.');
      navigate('/agenda');
    } catch (error) {
      console.log(error);
      toast.error('Falha ao fazer login. Verifique suas credenciais.');
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 my-3">
          <h1 className="text-center my-3">Login</h1>
          <p className="text-center lead">Faça seu login</p>
          <div className="row">
            <div className="col-lg mx-3 my-3">
              <h4>Faça seu login</h4>

              <Form onSubmit={handleLogin}>
                <Form.Text className="text-muted">
                  Se você ja tem conta faça login preenchendo o formulário abaixo:
                </Form.Text>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Endereço de Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Coloque seu email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Senha"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Fazer login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
