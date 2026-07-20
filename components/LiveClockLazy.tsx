"use client";

import dynamic from "next/dynamic";

export const LiveClockLazy = dynamic(
  () => import("@/components/LiveClock").then((m) => m.LiveClock),
  { ssr: false },
);
