import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';

const HomePage = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/models");
        setCardsData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUploadRedirect = () => {
    navigate('/upload');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">3D Model Library</h1>
        <button 
          onClick={handleUploadRedirect}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          + Upload New Model
        </button>
      </div>
    <div className="flex flex-wrap w-full gap-4 p-4">
      {cardsData.map((card) => (
        <Card
          key={card.id}
          title={card.name}
          description={`Model ID: ${card.id}`}
          buttonText="View Model"
          onClick={() => navigate(`/model/${card.id}`, { state: { modelUrl: card.url } })}
        />
      ))}
      </div>
    </div>
  );
};

export default HomePage;