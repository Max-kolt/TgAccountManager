type DefaultButtonProps = {
  callbackHandler: () => void;
  img?: string;
  text?: string;
  custom?: string;
};

export function DefaultButton({
  callbackHandler,
  img,
  custom,
  text,
}: DefaultButtonProps) {
  return (
    <div
      className={
        "flex justify-center items-center border border-gray-950 bg-white hover:bg-gray-200 rounded-lg p-3 cursor-pointer " +
        custom
      }
      onClick={() => callbackHandler()}
    >
      {text || (img && <img src={img} width={24} />)}
    </div>
  );
}
