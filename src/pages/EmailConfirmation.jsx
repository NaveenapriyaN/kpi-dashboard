function EmailConfirmation() {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="text-center p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">✅ Account Created!</h2>
        <p className="text-gray-700">
          Please check your inbox and confirm your email address before logging in.
        </p>
        <p className="text-gray-700">Close this tab</p>
      </div>
    </div>
  );
}

export default EmailConfirmation;
