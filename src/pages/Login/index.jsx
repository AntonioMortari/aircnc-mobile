import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  const navigate = useNavigate();

  useEffect( () => {}, [])

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post('/users', { email });

    const id  = response.data;
    console.log(id);

    localStorage.setItem('user_id', id);
    localStorage.setItem('techs', techs);

    navigate('/list');
  }

  return (
    <>
      {/* <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
      </p> */}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input 
          id="email" 
          type="email" 
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <label htmlFor="tecnologia">Tecnologias *</label>
        <input 
          id="tecnologia" 
          type="tecnologia" 
          placeholder="Tecnologias"
          value={techs}
          onChange={event => setTechs(event.target.value)}
        />

        <button className="btn" type="submit">Encontrar Spots</button>
      </form>
    </>
  )
}