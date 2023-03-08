import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LogoutProps {
  onLogout: () => void;
}

function logout() {
  // Remova o ID do usuário do localStorage
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  toast.success('Logout efetuado com sucesso.');
}
export const Logout = (props: LogoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    props.onLogout();
    navigate('/');
  }, [navigate]);
  return (
    <div>
      <p>deslogando</p>
    </div>
  );
};
