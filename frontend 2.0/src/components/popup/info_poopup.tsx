import { useEffect, useState } from "react";


type InfoPopupProps = {
  delay: number;
  text: string;
};

export function InfoPopup({ delay, text }: InfoPopupProps) {
  const [popupLife, setLife] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLife(popupLife + 1);
    }, delay);
  }, []);

  return (
    popupLife < delay && (
      <div className="fixed right-0 bottom-0 bg-slate-100 min-w-32 rounded-md">
        <span className="w-full h-1 bg-white">
          <span
            className={
              "w-[100%]" +
              (popupLife / delay) * +" rounded-t-md h-1 bg-blue-300"
            }
          ></span>
        </span>
        <div className="p-3">{text}</div>
      </div>
    )
  );
}
