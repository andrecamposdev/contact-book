import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Contact = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [user_id] = useState(Number(userId));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_REACT_API_URL}/contacts`,
        {
          first_name,
          last_name,
          telephone,
          birthday,
          address,
          email,
          user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
        toast.success('Contato criado com sucesso');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Ocorreu um erro ao criar seu contato');
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 my-3">
          <h1 className="text-center my-3">Novo contato</h1>
          <div className="row">
            <div className="col-lg mx-3 my-3">
              <h4>Cadastre um contato:</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Text className="text-muted">
                  Insira os dados do contato abaixo:
                </Form.Text>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    id="first_name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="Nome"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control
                    type="text"
                    id="last_name"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Sobrenome"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    id="telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    required
                    placeholder="Telefone"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Data de nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    id="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    placeholder="Data de nascimento"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    placeholder="Endereço"
                  />
                </Form.Group>

                <Form.Group className="mb-0">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                  />
                </Form.Group>

                <Form.Group className="mb-0">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="hidden"
                    id="user_id"
                    value={user_id}
                    required
                    placeholder=""
                  />
                </Form.Group>
                <p className="text-muted">
                  Ao terminar de preencher o formulário clique em [Criar contato] para
                  salvar o contato e se quiser voltar para agenda para exibir os contatos
                  salvos clique em [Voltar para agenda].
                </p>
                <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                  Criar contato
                </Button>
                <Button variant="dark">
                  <Link to="/agenda" className="lnk">
                    Voltar para agenda
                  </Link>
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
