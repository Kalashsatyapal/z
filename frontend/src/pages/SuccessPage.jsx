import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div className="p-8 text-center min-h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p className="mb-6 text-lg">Thank you for shopping with Zmart.</p>
      <Link
        to="/"
        className="inline-block px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
