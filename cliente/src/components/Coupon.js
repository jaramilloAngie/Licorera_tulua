import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';


const Coupon = ({ couponCode, discount, description }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="coupon-container border-2 border-green-600 rounded-md p-4 shadow-lg flex flex-col items-center bg-white">
      <h3 className="text-xl font-bold text-green-600">¡{discount}% de descuento!</h3>
      <p className="text-gray-600 my-2">{description}</p>
      <div className="coupon-code-container bg-green-100 px-4 py-2 rounded-md flex items-center gap-2">
        <span className="text-green-800 font-mono">{couponCode}</span>
        <button
          className="copy-btn text-green-600 hover:text-green-800"
          onClick={handleCopy}
        >
          <FaCopy />
        </button>
      </div>
      {copied && <p className="text-sm text-green-500 mt-2">¡Código copiado!</p>}
    </div>
  );
};

export default Coupon;
