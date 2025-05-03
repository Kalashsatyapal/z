import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function PaymentPage() {
  const [cart, setCart] = useState([]);
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

    // Clear cart
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);

    // Navigate to success page
    navigate("/success");
  };

  if (cart.length === 0) {
    return <div className="p-8 text-center text-xl">Your cart is empty.</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between mb-2">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>

        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
