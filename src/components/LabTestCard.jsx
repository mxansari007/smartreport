import React from 'react';

const LabTestCard = ({test ,handleCart}) => {
  const {testName,price,description,img}=test;
  return (
    <div className="max-w-sm max-h-72 rounded overflow-hidden shadow-lg">
     {/* hye  */}
      <div className="px-6 py-4 flex flex-row gap-4">
      <img className="w-20 h-20" src={img} alt={testName} />
      <div>
      <div className="font-bold text-xl mb-2">{testName}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
        
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => handleCart(test)}
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"
        >
          Add to Cart
        </button>
        <span className="text-xl font-bold">${price}</span>
      </div>
    </div>
  );
};

export default LabTestCard;
