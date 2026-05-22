import { useState, useCallback, useRef, useEffect } from "react";

interface UseCopyToClipboardReturn {
  copied: boolean;
  copyText: (text: string) => Promise<boolean>;
}

export function useCopyToClipboard(resetInterval: number = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Clear any pending reset timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyText = useCallback(async (text: string): Promise<boolean> => {
    if (typeof window === "undefined") return false;

    // 1. Try modern clipboard API
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(text);
        if (timerRef.current) clearTimeout(timerRef.current);
        setCopied(true);
        timerRef.current = setTimeout(() => setCopied(false), resetInterval);
        return true;
      } catch (err) {
        console.warn("navigator.clipboard.writeText failed, using fallback:", err);
      }
    }

    // 2. Fallback method (document.execCommand)
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      
      // Styling to prevent zooming/scrolling and keep it hidden but selectable
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      textarea.style.fontSize = "12pt"; // Prevent iOS zoom
      
      document.body.appendChild(textarea);
      
      // Select text for iOS and standard browsers
      const isiOS = navigator.userAgent.match(/ipad|iphone/i);
      if (isiOS) {
        const range = document.createRange();
        range.selectNodeContents(textarea);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        textarea.setSelectionRange(0, 999999);
      } else {
        textarea.select();
      }
      
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);
      
      if (success) {
        if (timerRef.current) clearTimeout(timerRef.current);
        setCopied(true);
        timerRef.current = setTimeout(() => setCopied(false), resetInterval);
        return true;
      } else {
        console.error("Fallback execCommand copy returned false");
      }
    } catch (err) {
      console.error("Copy fallback failed:", err);
    }
    
    return false;
  }, [resetInterval]);

  return { copied, copyText };
}
