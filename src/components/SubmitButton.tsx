import React from "react";

interface IButtonProps {
  name: string;
  onClick: () => void;
}
function SubmitButton(props: IButtonProps) {
  return (
    <div className="w-full">
      <button
        onClick={props.onClick}
        className="p-2 rounded-md bg-yellow-400 font-semibold w-full"
      >
        {props.name}
      </button>
    </div>
  );
}

export default React.memo(SubmitButton);
