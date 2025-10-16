import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  mobileNumber: string;
  setMobileNumber: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  receiveUpdates: boolean;
  setReceiveUpdates: Dispatch<SetStateAction<boolean>>;
  setCurrentStep: (step: "contact" | "address" | "payment") => void;
};

const Checkout_Contact = ({
  mobileNumber,
  setMobileNumber,
  email,
  setEmail,
  receiveUpdates,
  setReceiveUpdates,
  setCurrentStep,
}: Props) => {
  const [mobileError, setMobileError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleContactContinue = () => {
    let hasError = false;

    if (!/^\d{10}$/.test(mobileNumber)) {
      setMobileError(true);
      hasError = true;
    } else setMobileError(false);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError(true);
      hasError = true;
    } else setEmailError(false);

    if (!hasError) setCurrentStep("address");
  };

  return (
    <div className="max-w-xl">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Contact details</h2>
      <p className="text-gray-600 text-center mb-8">Enter mobile & email to continue</p>

      <div className="space-y-4">
        <div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-lg bg-gray-50">
              <span className="text-xl">🇮🇳</span>
              <span className="text-sm font-medium text-gray-700">+91</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <input
              type="tel"
              placeholder="Mobile number"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                setMobileError(false);
              }}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          {mobileError && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please enter a valid 10-digit mobile number
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Please enter a valid email
            </p>
          )}
        </div>

        <div className="flex items-start gap-3 py-2">
          <input
            type="checkbox"
            id="updates"
            checked={receiveUpdates}
            onChange={(e) => setReceiveUpdates(e.target.checked)}
            className="w-5 h-5 mt-0.5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 cursor-pointer"
          />
          <label htmlFor="updates" className="text-sm text-gray-700 cursor-pointer">
            Send me offers and order updates
          </label>
        </div>

        <button
          onClick={handleContactContinue}
          className="w-full bg-black text-white py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors mt-6"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Checkout_Contact;
