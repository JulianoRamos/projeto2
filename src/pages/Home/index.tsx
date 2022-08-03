import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <ul>
        <li>
          <Link to="/token">Projeto2</Link>
        </li>
      </ul>
    </Container>
  );
};

export default Home;
