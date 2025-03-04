import React from 'react';

const Card = ({ title, description, buttonText, onClick }) => {
  return (
    <div className="max-w-sm mx-auto bg-gray-100 rounded-xl shadow-md p-4 flex items-center">
      <h2 className="text-2xl mb-4">{title}</h2>
      <p className="text-center mb-8">{description}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
