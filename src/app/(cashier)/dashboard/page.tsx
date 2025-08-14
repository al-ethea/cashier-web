// pages/index.tsx
"use client";
import Link from "next/link";
import useCashierDashboard from "@/features/cashier/hooks/useCashierDashboard";
import authStore from "@/zustand/authStore";
import { useState } from "react";
import apiInstance from "@/utils/api/apiInstance";

export default function CashierDashboard() {
  const {
    navItems,
    shiftData,
    loading,
    openClockInModal,
    closeClockInModal,
    handleClockIn,
    startingCash,
    setStartingCash,
    isSubmitting,
    handleClockOut,
    openClockOutModal,
    closeClockOutModal,
    endingCash,
    setEndingCash,
  } = useCashierDashboard();

  // const [isClockingIn, setIsClockingIn] = useState(false);
  // const handleClockIn = async () => {
  //   try {
  //     setIsSubmitting(true);
  //     await apiInstance.post(
  //       "/cashier/clock-in",
  //       { startingCash: Number(startingCash) },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     closeClockInModal();
  //     setStartingCash("");
  //   } catch (error) {
  //     console.error("Clock in failed", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  console.log("shiftData", shiftData);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#00af81] text-white p-6 flex flex-col">
        <div className="text-2xl font-bold mb-10">Kasir Pintar</div>
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link href={item.path} key={item.name}>
              <div className="px-4 py-2 rounded-lg hover:bg-[#66cbb0] hover:bg-opacity-30 cursor-pointer transition">
                {item.name}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

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
                  disabled={!shiftData?.clockOutDone}
                  className={`px-4 py-2 rounded-lg transition ${
                    !shiftData?.clockOutDone
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  Clock In
                </button>

                <button
                  onClick={openClockInModal}
                  disabled={shiftData?.clockOutDone} // no active shift
                  className={`px-4 py-2 rounded-lg transition ${
                    shiftData?.clockOutDone
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
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
      <dialog id="clock_in_modal" className="modal">
        <div className="modal-box bg-white text-black rounded-lg w-fit mx-auto my-auto">
          <p className="text-center mb-4">Enter your starting cash</p>
          <input
            type="number"
            className="input input-bordered w-full text-black mb-4"
            placeholder="Starting Cash"
            value={startingCash}
            onChange={(e) => setStartingCash(e.target.value)}
          />
          <div className="modal-action flex justify-center gap-x-4">
            <form method="dialog">
              <button
                className="btn w-28 border-gray-400 bg-white text-gray-700 shadow-none rounded-lg text-lg"
                onClick={closeClockInModal}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </form>
            <button
              className="btn w-28 shadow-none rounded-lg text-lg bg-green-600 border-green-600 text-white"
              onClick={handleClockIn}
              disabled={isSubmitting || !startingCash}
            >
              {isSubmitting ? "Clocking In..." : "Confirm"}
            </button>
          </div>
        </div>
      </dialog>
      {/* Clock Out Modal */}
      <dialog id="clock_out_modal" className="modal">
        <div className="modal-box bg-white text-black rounded-lg w-fit mx-auto my-auto">
          <p className="text-center mb-4">Enter your ending cash</p>
          <input
            type="number"
            className="input input-bordered w-full text-black mb-4"
            placeholder="Ending Cash"
            value={endingCash}
            onChange={(e) => setEndingCash(e.target.value)}
          />
          <div className="modal-action flex justify-center gap-x-4">
            <form method="dialog">
              <button
                className="btn w-28 border-gray-400 bg-white text-gray-700 shadow-none rounded-lg text-lg"
                onClick={closeClockOutModal}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </form>
            <button
              className="btn w-28 shadow-none rounded-lg text-lg bg-red-600 border-red-600 text-white"
              onClick={handleClockOut}
              disabled={isSubmitting || !endingCash}
            >
              {isSubmitting ? "Clocking Out..." : "Confirm"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
