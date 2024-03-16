import { useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
// import { Alert } from "@material-tailwind/react";

export default function Book() {
  const { id } = useParams();
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user_id = localStorage.getItem('user_id');

      const response = await api.post(`/spots/${id}/bookings`, {
        date,
        user_id
      })

      console.log(response);
      navigate('/list');
    } catch (error) {
      console.log(error);
      if(isAxiosError(error)){
        toast.error(error.response.data.error.message);
      }

    }

  }

  function handleCancel() {
    navigate('/list');
  }

  return (
    <div>

      <form>
        <label htmlFor="data">Data de interesse *</label>
        <input
          id="data"
          type="date"
          placeholder="Qual data você quer reservar?"
          value={date}
          onChange={event => setDate(event.target.value)}
        />

        <button className="btn" onClick={handleSubmit}>Solicitar Reserva</button>
        <button className="btn cancelButton" onClick={handleCancel}>Cancelar</button>
      </form>

    </div>
  )
}