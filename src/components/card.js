import React from "react";

const Card = ({ image, title, author, genre, action, gradient, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`w-80 rounded-xl overflow-hidden shadow-lg text-white transform transition-transform duration-300 hover:-translate-y-3 bg-gradient-to-b ${gradient} hover:cursor-pointer`}
    >
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="relative p-4 z-10 bg-gray-700 bg-opacity-50 backdrop-blur-sm">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-200">{author}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-200">{genre}</div>
          <button className="bg-gray-800 text-white py-1 px-4 rounded-full text-sm hover:bg-gray-700">
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
