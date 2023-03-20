import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export const EditContact = () => {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const [user_id] = useState(Number(userId));

  const location = useLocation();
  const { contact } = location.state;

  const [formData, setFormData] = useState({
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    telephone: contact.telephone,
    birthday: contact.birthday,
    address: contact.address,
    email: contact.email,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_REACT_API_URL}/contacts/${formData.id}`,
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          telephone: formData.telephone,
          birthday: formData.birthday,
          address: formData.address,
          email: formData.email,
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
        toast.success('Contato editado com sucesso');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Ocorreu um erro ao editar seu contato');
      });
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 my-3">
          <h1 className="text-center my-3">Editar contato</h1>
          <div className="row">
            <div className="col-lg mx-3 my-3">
              <h4>Edite o contato:</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Text className="text-muted">
                  Edite os dados do contato abaixo:
                </Form.Text>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    required
                    placeholder="Nome"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Sobrenome</Form.Label>
                  <Form.Control
                    type="text"
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    required
                    placeholder="Sobrenome"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Telefone</Form.Label>
                  <Form.Control
                    type="text"
                    id="telephone"
                    value={formData.telephone}
                    onChange={(e) =>
                      setFormData({ ...formData, telephone: e.target.value })
                    }
                    required
                    placeholder="Telefone"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Data de nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    id="birthday"
                    value={new Date(formData.birthday).toISOString().slice(0, 10)}
                    onChange={(e) =>
                      setFormData({ ...formData, birthday: e.target.value })
                    }
                    required
                    placeholder="Data de nascimento"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                    placeholder="Endereço"
                  />
                </Form.Group>

                <Form.Group className="mb-0">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  Ao terminar de editar clique em [Editar contato] para salvar e se quiser
                  voltar para agenda para exibir os contatos salvos clique em [Voltar para
                  agenda].
                </p>
                <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
                  Editar contato
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
