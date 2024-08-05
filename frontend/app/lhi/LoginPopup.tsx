import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPopup: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isOpen || !isClient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
        <p>Your session has expired. Please log in again.</p>
        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            onClose();
            router.push('/login');
          }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
