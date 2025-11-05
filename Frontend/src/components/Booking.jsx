import { useState,useEffect } from "react";
import Calendar from "./Calendar";
import StaffAvailability from "./StaffAvailability";
import TimeSelection from "./TimeSelection";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingSection({}) {
  const location = useLocation();
  const selectedService = location.state?.service;
  const service_name = selectedService.name;
  const service_amount = selectedService.amount;
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!selectedService) {
      navigate("/#services", { replace: true }); // Redirect back to services
    }
  }, [selectedService, navigate]);

  if (!selectedService) {
    return null; // Prevents rendering before redirect happens
  }

  const handleNext = () => {
    if (currentStep === 1 && selectedDate) setCurrentStep(2);
    else if (currentStep === 2 && selectedStaff) setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-black px-4">
      <h1 className="text-3xl lg:text-4xl text-center Playfair font-semibold mt-20 lg:mt-25 text-white">Book An Appointment</h1>

      {/* Display selected service */}
      <p className="mt-3 text-gray-300 Lato text-base lg:text-lg text-center">
        Selected Service: <span className="font-semibold">{service_name}</span>
      </p>

      {/* Step progress indicator */}
      <div className="flex gap-6 mt-4">
        {["1", "2", "3"].map((step, index) => (
          <button
            key={index}
            onClick={() => {
              if (step === "1" || (step === "2" && selectedDate) || (step === "3" && selectedStaff)) {
                setCurrentStep(Number(step));
              }
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg font-semibold transition-all duration-300 hover:cursor-pointer ${
              currentStep === Number(step)
                ? "bg-white text-black border-white"
                : "border-gray-400 text-gray-600"
            }`}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Step 1: Calendar */}
      {currentStep === 1 && (
        <div className="w-full flex justify-center mt-1">
          <Calendar onDateSelect={(date) => setSelectedDate(date)} />
        </div>
      )}

      {/* Step 2: Staff Availability */}
      {currentStep === 2 && selectedDate && (
        <div className="w-full flex justify-center mt-10">
          <StaffAvailability
            selectedDate={selectedDate}
            onStaffSelect={(staff) => setSelectedStaff(staff)}
          />
        </div>
      )}

      {/* Step 3: Time Selection */}
      {currentStep === 3 && selectedStaff && (
        <div className="w-full flex justify-center mt-10">
          <TimeSelection
            service_name={service_name}
            service_amount={service_amount}
            selectedDate={selectedDate}
            selectedStaff={selectedStaff}
            onTimeSelect={(time) => setSelectedTime(time)}
          />
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-4 mt-10 mb-10">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="px-6 py-2 border rounded-md text-sm bg-gray-100 hover:bg-gray-200 transition-all"
          >
            Back
          </button>
        )}
        {currentStep < 3 && (
          <button
            onClick={handleNext}
            disabled={(currentStep === 1 && !selectedDate) || (currentStep === 2 && !selectedStaff)}
            className={`px-6 py-2 border rounded-md text-sm transition-all ${
              (currentStep === 1 && !selectedDate) || (currentStep === 2 && !selectedStaff)
                ? "bg-white text-gray-800 cursor-not-allowed hover:cursor-pointer"
                : "bg-[#F0CCCE] text-black hover:hover:bg-[#e2babc] hover:cursor-pointer"
            }`}
          >
            Next
          </button>
        )}
      </div>

      {/* Debug log */}
      {selectedTime && (
        <div className="mt-6 text-center text-green-600">
          <p>✅ Booking Summary:</p>
          <p>Service: {selectedService}</p>
          <p>Date: {selectedDate.toDateString()}</p>
          <p>Staff: {selectedStaff}</p>
          <p>Time: {selectedTime}</p>
        </div>
      )}
    </div>
  );
}
