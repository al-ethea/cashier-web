"use client";
import React from "react";
import clsx from "clsx";

interface CashierModalProps {
  id: string;
  title: string;
  description: string;
  value: string | number;
  placeholder: string;
  onChange: (val: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  confirmText?: string;
  confirmColor?: "green" | "red";
}

export default function CashierModal({
  id,
  title,
  description,
  value,
  placeholder,
  onChange,
  onConfirm,
  onCancel,
  isSubmitting,
  confirmText = "Confirm",
  confirmColor = "green",
}: CashierModalProps) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box max-w-sm rounded-2xl bg-white shadow-lg p-6">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {title}
        </h3>
        <p className="text-sm text-gray-500 text-center mb-4">{description}</p>

        {/* Input */}
        <input
          type="number"
          className={clsx(
            "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none mb-6",
            confirmColor === "green" && "focus:ring-2 focus:ring-green-500",
            confirmColor === "red" && "focus:ring-2 focus:ring-red-500"
          )}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className={clsx(
              "px-4 py-2 rounded-lg text-white disabled:opacity-50",
              confirmColor === "green" && "bg-green-600 hover:bg-green-700",
              confirmColor === "red" && "bg-red-600 hover:bg-red-700"
            )}
            onClick={onConfirm}
            disabled={isSubmitting || !value}
          >
            {isSubmitting ? `${confirmText}...` : confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
}
