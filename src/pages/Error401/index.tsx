import React from 'react';
import { Container } from './styles';

const Error401: React.FC = () => (
  <Container>
    <article>
      <h1>Token inválido</h1>
      <p>Acesse novamente a pagina no menu lateral para gerar um token novo</p>
    </article>
  </Container>
);

export default Error401;
