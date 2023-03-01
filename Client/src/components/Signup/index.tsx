import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/users', { email, password })
      .then((res) => {
        console.log(res.data);
        alert('Conta criada com sucesso');
      })
      .catch((err) => {
        console.error(err);
        alert('Ocorreu um erro ao criar sua conta');
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 my-3">
          <h1 className="text-center my-3">Cadastro</h1>
          <p className="text-center lead">Crie sua conta</p>
          <div className="row">
            <div className="col-lg mx-3 my-3">
              <h4>Faça seu cadastro</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Text className="text-muted">
                  Se você ainda não tem conta crie uma preenchendo o formulário abaixo:
                </Form.Text>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Endereço de Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Coloque seu email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Senha"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Cadastrar conta
                </Button>
              </Form>
            </div>

            {/* <div className="col-lg mx-3 my-3">
              <h4>Faça seu login</h4>
              <Form>
                <Form.Text className="text-muted">
                  Se você ja tem conta faça login preenchendo o formulário abaixo:
                </Form.Text>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Endereço de Email</Form.Label>
                  <Form.Control type="email" placeholder="Coloque seu email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Senha" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Fazer login
                </Button>
              </Form>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
