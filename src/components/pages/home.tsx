// components/Home.tsx

import React from "react";

interface HomeProps {
  username: string;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ username, onLogout }) => {
  return (
    <div>
      <h2>Bem-vindo, {username}!</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
