// PaymentPage.js
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function PaymentPage() {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    // Implement your payment logic here (e.g., integrate with a payment gateway)
    setPaymentSuccess(true);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">
      <header className="w-full flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md shadow-lg">
        <h1 className="text-3xl font-extrabold text-indigo-700">Payment</h1>
      </header>

      <div className="p-8">
        <h2 className="text-xl font-semibold text-white">Order Summary</h2>
        {cart.length === 0 ? (
          <p className="text-white">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-white py-2">
                <span>{item.name}</span>
                <span>${item.price} x {item.quantity}</span>
              </div>
            ))}
            <div className="mt-4 text-white">
              <strong>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</strong>
            </div>

            <button
              onClick={handlePayment}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-indigo font-semibold py-2 rounded-lg"
            >
              Proceed to Payment
            </button>
            {paymentSuccess && <p className="mt-4 text-green-500">Payment Successful! Thank you for your purchase.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
