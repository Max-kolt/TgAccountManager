import React, { RefObject, useEffect, useRef } from "react";

type PopupProps = {
  children: React.ReactNode;
  clickHandler: () => void;
  custom?: string;
};

export function DefaultPopup({ children, clickHandler, custom }: PopupProps) {
  const wrapperRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        clickHandler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div className={"fixed z-50" + custom} ref={wrapperRef}>
      {children}
    </div>
  );
}
