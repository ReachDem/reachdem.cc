"use client";

import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  size = 120,
  duration = 8,
}: {
  className?: string;
  size?: number;
  duration?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]",
        className,
      )}
    >
      <div
        className="absolute -top-px left-[-20%] h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-90"
        style={{
          width: `${size}px`,
          animation: `border-beam-x ${duration}s linear infinite`,
        }}
      />
      <div
        className="absolute -left-px top-[-20%] w-px bg-gradient-to-b from-transparent via-primary to-transparent opacity-90"
        style={{
          height: `${size}px`,
          animation: `border-beam-y ${duration}s linear infinite`,
        }}
      />
      <style jsx>{`
        @keyframes border-beam-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(1600%);
          }
        }
        @keyframes border-beam-y {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(800%);
          }
        }
      `}</style>
    </div>
  );
}
