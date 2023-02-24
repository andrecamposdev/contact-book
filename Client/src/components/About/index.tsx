export const About = () => {
  const userId = localStorage.getItem('userId');

  return (
    <div>
      <h1>About</h1>
      <p>Bem-vindo, usuário {userId}!</p>
    </div>
  );
};
