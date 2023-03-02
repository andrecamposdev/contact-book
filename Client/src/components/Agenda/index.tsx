import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

interface DataObject {
  id: number;
  first_name: string;
  last_name: string;
  telephone: string;
  birthday: Date;
  address: string;
  email: string;
}

interface ResponseData {
  data: DataObject[];
}
export const Agenda = () => {
  const [data, setData] = useState<DataObject[]>([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Tem certeza que quer excluir este contato?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/contacts/${id}`);
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<ResponseData>(
          `http://localhost:3000/contacts/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setData(result.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 my-3">
          <h1 className="text-center">Agenda</h1>
          <p className="text-center lead">Contatos abaixo</p>
          <div className="row">
            <div className="col my-3">
              {/* <div className="alert alert-danger text-center">Deu erro</div> */}
              <div className="responsive-table">
                <Table striped hover className="table my-3">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Sobrenome</th>
                      <th>Telefone</th>
                      <th>Data de Nascimento</th>
                      <th>Endereço</th>
                      <th>Email</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.telephone}</td>
                        <td>
                          {new Date(item.birthday).toLocaleDateString('pt-BR', {
                            timeZone: 'UTC',
                          })}
                        </td>
                        <td>{item.address}</td>
                        <td>{item.email}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            Excluir
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <Button variant="primary">
                <Link to="/contact" className="lnk">
                  Novo contato
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
