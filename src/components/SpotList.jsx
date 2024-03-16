import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';
import './styles.css';

// eslint-disable-next-line react/prop-types
export default function SpotList({ tech }) {
  const [spots, setSpots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get(`/spots?tech=${tech}`);
      console.log(response);
      setSpots(response.data);
    }

    loadSpots();
  }, [tech]);

  // function handleNavigate(id) {
  //   navigation.navigate('Book', { id });
  // }

  function handleNavigate(id) {
    navigate(`/book/${id}`);
  }

  return (
    <div className="container">
      <p className="title">
        Empresas que usam <span className="bold">{tech}</span>
      </p>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot.id}>
            <header style={{ backgroundImage: `url(http://localhost:3000/files/${spot.thumbnail})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
            <button className="btn" onClick={() => handleNavigate(spot.id)}>Solicitar Reserva</button>
          </li>

        ))}
      </ul>
    </div>
  )
}

