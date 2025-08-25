// pages/index.tsx
"use client";
import Link from "next/link";
import useCashierDashboard from "@/features/cashier/dashboard/hooks/useCashierDashboard";
import CashierModal from "./components/CashierModal";

export default function CashierDashboard() {
  const {
    shiftData,
    loading,
    openClockInModal,
    handleClockIn,
    startingCash,
    setStartingCash,
    isSubmitting,
    handleClockOut,
    openClockOutModal,
    endingCash,
    setEndingCash,
    isSubmittingClockOut,
    closeClockInModal,
    closeClockOutModal,
  } = useCashierDashboard();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main content */}
      <main className="flex-1 p-10">
        {loading ? (
          <p className="text-gray-500">Loading shift...</p>
        ) : shiftData ? (
          <div>
            {/* Welcome Message */}
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              Welcome,{" "}
              <span className="text-[#00af81]">{shiftData.cashierName}</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Here’s your current shift details:
            </p>

            {/* Shift Card */}
            <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
              <p className="text-xl font-medium text-gray-800 mb-2">
                Shift: <span className="text-[#00af81]">{shiftData.shift}</span>
              </p>
              <p className="text-gray-600">
                {shiftData.startTime} - {shiftData.endTime}
              </p>

              {/* Clock In/Out Buttons */}
              <div className="flex space-x-4 mt-3">
                <button
                  onClick={openClockInModal}
                  className="px-4 py-2 rounded-lg transition bg-green-500 text-white hover:bg-green-600"
                >
                  Clock In
                </button>

                <button
                  onClick={openClockOutModal}
                  className="px-4 py-2 rounded-lg transition bg-red-500 text-white hover:bg-red-600"
                >
                  Clock Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No shift information available.</p>
        )}
      </main>

      {/* Clock In Modal */}
      <CashierModal
        id="clock_in_modal"
        title="Clock In"
        description="Enter your starting cash to begin your shift."
        placeholder="Starting Cash"
        value={startingCash}
        onChange={setStartingCash}
        onConfirm={handleClockIn}
        onCancel={closeClockInModal}
        isSubmitting={isSubmitting}
        confirmText="Confirm"
        confirmColor="green"
      />

      {/* Clock Out Modal */}
      <CashierModal
        id="clock_out_modal"
        title="Clock Out"
        description="Enter your ending cash to close your shift."
        placeholder="Ending Cash"
        value={endingCash}
        onChange={setEndingCash}
        onConfirm={handleClockOut}
        onCancel={closeClockOutModal}
        isSubmitting={isSubmittingClockOut}
        confirmText="Confirm"
        confirmColor="red"
      />
    </div>
  );
}
