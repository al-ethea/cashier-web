"use client";
import React from "react";

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
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {title}
        </h3>
        <p className="text-sm text-gray-500 text-center mb-4">{description}</p>

        <input
          type="number"
          className={`w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-${confirmColor}-500 mb-6`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-lg bg-${confirmColor}-600 text-white hover:bg-${confirmColor}-700 disabled:opacity-50`}
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
