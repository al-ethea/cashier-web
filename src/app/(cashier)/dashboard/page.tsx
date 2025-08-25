// pages/index.tsx
"use client";
import useCashierDashboard from "@/features/cashier/dashboard/hooks/useCashierDashboard";
import CashierModal from "./components/CashierModal";
import ShiftCard from "./components/ShiftCard";
import RevenueCard from "./components/RevenueCard";

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
      <main className="flex-1 p-10">
        {loading ? (
          <p className="text-gray-500">Loading shift...</p>
        ) : shiftData ? (
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">
              Welcome,{" "}
              <span className="text-[#00af81]">{shiftData.cashierName}</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Here’s your current shift details:
            </p>

            {/* Shift Card */}
            <ShiftCard
              shift={shiftData.shift}
              startTime={shiftData.startTime}
              endTime={shiftData.endTime}
              openClockInModal={openClockInModal}
              openClockOutModal={openClockOutModal}
            />

            {/* Revenue Card */}
            <RevenueCard totalRevenue={shiftData.totalRevenue ?? 0} />
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
