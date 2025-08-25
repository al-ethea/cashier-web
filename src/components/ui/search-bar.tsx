"use client";

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  isLoading,
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-sm">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none"
      />
      {isLoading && (
        <span className="absolute right-3 top-2.5 animate-spin">🔄</span>
      )}
    </div>
  );
}
