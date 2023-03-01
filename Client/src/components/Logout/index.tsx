import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function logout() {
  // Remova o ID do usuário do localStorage
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  console.log('logout efetuado');
  toast.success('Logout efetuado com sucesso.');
}
export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/');
  }, [navigate]);
  return (
    <div>
      <p>deslogando</p>
    </div>
  );
};
