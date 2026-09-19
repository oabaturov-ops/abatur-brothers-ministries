"use client";

import { useEffect } from "react";

// Регистрация service worker через компонент вместо inline-скрипта,
// чтобы React не выдавал предупреждение про <script> при гидратации.
export default function SwRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return null;
}