"use client";

import { usePathname } from "next/navigation";
import AppLayout from "./AppLayout";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Pakai Layout
  const useLayoutPaths = [
    "/dashboard",
    "/dashboard/siswa",
    "/dashboard/kelas",
    "/dashboard/pelanggaran",
  ];

  // Path tanpa layout
  const noLayoutPaths = ["/auth/login", "/auth/register"];

  if (noLayoutPaths.includes(pathname)) {
    return <>{children}</>;
  }

  const useAppLayout = useLayoutPaths.some((p) => pathname.startsWith(p));
  if (useAppLayout) {
    return <AppLayout>{children}</AppLayout>;
  }

  return <AppLayout>{children}</AppLayout>;
}
