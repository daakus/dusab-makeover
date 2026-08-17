"use client";

import { useEffect } from "react";

/**
 * Blocks the casual ways to save an image: right-click "Save image as",
 * drag-to-desktop, and the mobile long-press save menu. Does not — and
 * cannot — prevent someone determined via dev tools, disabling JS, or a
 * screenshot; nothing rendered in a browser can be made truly undownloadable.
 */
export function ImageProtection() {
  useEffect(() => {
    function blockImageContextMenu(e: MouseEvent) {
      if ((e.target as HTMLElement)?.tagName === "IMG") {
        e.preventDefault();
      }
    }
    function blockImageDrag(e: DragEvent) {
      if ((e.target as HTMLElement)?.tagName === "IMG") {
        e.preventDefault();
      }
    }
    document.addEventListener("contextmenu", blockImageContextMenu);
    document.addEventListener("dragstart", blockImageDrag);
    return () => {
      document.removeEventListener("contextmenu", blockImageContextMenu);
      document.removeEventListener("dragstart", blockImageDrag);
    };
  }, []);

  return null;
}
