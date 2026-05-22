import { useState, useEffect } from "react";

export function useJakartaTime() {
  const [time24, setTime24] = useState<string>("");
  const [time12, setTime12] = useState<string>("");

  useEffect(() => {
    const formatter24 = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const formatter12 = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const updateTime = () => {
      const now = new Date();
      try {
        setTime24(formatter24.format(now));
        setTime12(formatter12.format(now));
      } catch (e) {
        console.error("Error formatting time for Jakarta:", e);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return { time24, time12 };
}
