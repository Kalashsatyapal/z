import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function PaymentPage() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [isCardValid, setIsCardValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePayment = () => {
    if (paymentMethod === "credit-card" && !cardNumber.match(/^\d{16}$/)) {
      setIsCardValid(false);
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Zmart - Order Receipt", 20, 20);

    let y = 30;
    cart.forEach((item) => {
      doc.setFontSize(14);
      doc.text(`${item.name} x${item.quantity}`, 20, y);
      doc.text(`$${(item.price * item.quantity).toFixed(2)}`, 150, y);
      y += 10;
    });

    doc.text("Total: $" + calculateTotal(), 20, y + 10);
    doc.save("receipt.pdf");

    // Clear cart and localStorage after payment
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
    navigate("/success");
  };

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center text-xl font-medium text-gray-600">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="bg-[#f8f8f8] min-h-screen p-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-2 bg-white p-8 rounded shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Review Your Order</h2>
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="text-xl font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Box */}
        <div className="bg-white p-8 rounded shadow-lg border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h3>
          <div className="flex justify-between text-gray-700 mb-4">
            <span>Items:</span>
            <span>${calculateTotal()}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-4">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <span>Order Total:</span>
            <span>${calculateTotal()}</span>
          </div>

          {/* Payment Methods */}
          <div className="mt-6">
            <label className="block text-gray-800 text-sm font-medium mb-4">
              Choose Payment Method:
            </label>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="credit-card"
                  name="payment-method"
                  value="credit-card"
                  checked={paymentMethod === "credit-card"}
                  onChange={() => setPaymentMethod("credit-card")}
                  className="mr-2"
                />
                <label htmlFor="credit-card" className="text-gray-700 text-lg">
                  Credit/Debit Card
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="paypal"
                  name="payment-method"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="mr-2"
                />
                <label htmlFor="paypal" className="text-gray-700 text-lg">
                  PayPal
                </label>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod === "credit-card" && (
            <div className="mt-6">
              <label className="block text-gray-800 text-sm font-medium mb-2">
                Credit Card Number
              </label>
              <input
                type="text"
                className={`w-full p-4 border ${isCardValid ? 'border-gray-300' : 'border-red-500'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400`}
                placeholder="1234 5678 1234 5678"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              {!isCardValid && <p className="text-red-500 text-sm mt-2">Invalid card number. Please enter a 16-digit number.</p>}
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="mt-6 text-center">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-sm">
                Pay with PayPal
              </button>
            </div>
          )}

          <button
            onClick={handlePayment}
            className="mt-8 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-md shadow-md transition"
          >
            Place your order
          </button>
        </div>
      </div>
    </div>
  );
}
