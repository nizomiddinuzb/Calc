import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const TipCalculator: React.FC = () => {
  const [bill, setBill] = useState<number | string>('');
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<number | string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);

  const handleTipChange = (percentage: number) => {
    setTipPercentage(percentage);
    setCustomTip('');
  };

  const reset = () => {
    setBill('');
    setTipPercentage(15);
    setCustomTip('');
    setNumberOfPeople(1);
  };

  const billAmount = typeof bill === 'number' ? bill : parseFloat(bill) || 0;
  const customTipAmount = typeof customTip === 'number' ? customTip : parseFloat(customTip) || 0;
  const finalTipPercentage = customTip ? customTipAmount : tipPercentage;
  const tipAmount = (billAmount * finalTipPercentage) / 100;
  const totalAmount = billAmount + tipAmount;
  const tipPerPerson = tipAmount / numberOfPeople;
  const totalPerPerson = totalAmount / numberOfPeople;

  return (
    <div className="flex justify-center items-center h-screen bg-blue-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="mb-4">
          <label className="block text-gray-700">Bill</label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="w-full p-2 mt-2 border rounded"
            placeholder="$"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select Tip %</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[5, 10, 15, 25, 50].map((percentage) => (
              <button
                key={percentage}
                onClick={() => handleTipChange(percentage)}
                className={`p-2 rounded text-white ${
                  tipPercentage === percentage && customTip === ''
                    ? 'bg-teal-500'
                    : 'bg-teal-700'
                }`}
              >
                {percentage}%
              </button>
            ))}
            <input
              type="number"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              className="p-2 rounded bg-gray-300 text-gray-700"
              placeholder="Custom"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Number of People</label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(parseInt(e.target.value, 10))}
            className="w-full p-2 mt-2 border rounded"
          />
        </div>

        <div className="bg-teal-700 p-4 rounded text-white mb-4">
          <div className="flex justify-between">
            <span>Tip Amount</span>
            <span>${tipPerPerson.toFixed(2)} / person</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Total</span>
            <span>${totalPerPerson.toFixed(2)} / person</span>
          </div>
        </div>

        <button
          onClick={reset}
          className="w-full bg-teal-500 p-2 rounded text-white"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;