import { useEffect, useState } from 'react';
import socketio from 'socket.io-client';
import SpotList from '../../components/SpotList';

import './styles.css';

export default function List() {
  const [techs, setTechs] = useState([]);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');

    const socket = socketio('http://localhost:3000', {
      query: { user_id },
    });

    socket.on('booking_response', booking => {
      setResponseData(booking);
    })
  }, []);

  useEffect(() => {
    async function loadTechs() {
      const storagedTechs = localStorage.getItem('techs');
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);

    }
    loadTechs();
  }, []);


  return (
    <>
      <p>
        Lista <strong>techs</strong> encontradas 
      </p>
      {console.log(responseData) }
      { responseData && (
            <p>
              Sua reserva em <strong>{responseData.spot.company}</strong> em <strong>{responseData.date}</strong> foi <strong>{responseData.approved ? "APROVADA" : "REJEITADA"}</strong>
            </p>
      ) }

      { techs.map(tech => 
        <SpotList key={tech} tech={tech} />
      )}
    </>
  )
}