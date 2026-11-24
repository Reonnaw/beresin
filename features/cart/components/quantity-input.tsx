"use client";

import { Button } from "@/components/ui/button";

type QuantityInputProps = {
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
};

export function QuantityInput({ label, value, max, onChange }: QuantityInputProps) {
  return (
    <div className="flex items-center rounded-sm border border-border" role="group" aria-label={label}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Kurangi"
      >
        −
      </Button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={value}
        onChange={(event) => {
          // Clearing the field to retype must not remove the item; removal has its own button.
          const next = Number(event.target.value);
          if (next >= 1) onChange(next);
        }}
        aria-label="Jumlah"
        className="w-12 bg-transparent text-center font-mono text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Tambah"
      >
        +
      </Button>
    </div>
  );
}
