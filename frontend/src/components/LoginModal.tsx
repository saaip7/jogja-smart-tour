import React from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 md:p-8 w-11/12 max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Modal Title */}
        <h2 className="text-xl font-bold text-center text-blue-600 mb-2">
          Cobain Sekarang!
        </h2>
        {/* Subtitle */}
        <p className="text-center text-sm text-gray-600 mb-6">
          Rasakan kemudahan Jogja Smart Tour untuk perjalananmu
        </p>
        {/* Google Sign in Button */}
        <button
          onClick={() => login()}
          className="w-full py-2 px-4 border flex justify-center items-center gap-2 rounded-md bg-blue-600 text-white mb-4 hover:bg-blue-700 transition duration-150"
        >
          <Image src="/Google.png" alt="Google Icon" width={24} height={24} />
          <span>Sign in with Google</span>
        </button>
        {/* Divider
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">
            Belum punya akun? Daftar di sini
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        {/* Sign Up Button }
        <button className="w-full py-2 px-4 border flex justify-center items-center gap-2 rounded-md border-gray-300 hover:bg-gray-50 transition duration-150">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.247,1.354-1.402,2.442-2.817,2.442 c-1.587,0-2.873-1.287-2.873-2.873s1.286-2.873,2.873-2.873c0.682,0,1.312,0.238,1.808,0.634l1.421-1.421 c-0.847-0.802-1.993-1.296-3.229-1.296c-2.692,0-4.867,2.175-4.867,4.867c0,2.691,2.175,4.867,4.867,4.867 c2.691,0,4.867-2.175,4.867-4.867v-0.967h-5.493V12.151z"
              fill="currentColor"
            />
          </svg>
          <span>Sign up with Google</span>
        </button> */}
      </div>
    </div>
  );
};

export default LoginModal;
