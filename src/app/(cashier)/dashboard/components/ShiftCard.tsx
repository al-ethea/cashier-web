"use client";

import { IShiftCardProps } from "@/types/cashier.type";

export default function ShiftCard({
  shift,
  startTime,
  endTime,
  openClockInModal,
  openClockOutModal,
}: IShiftCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <p className="text-xl font-medium text-gray-800 mb-2">
        Shift: <span className="text-[#00af81]">{shift}</span>
      </p>
      <p className="text-gray-600">
        {startTime} - {endTime}
      </p>

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
  );
}
