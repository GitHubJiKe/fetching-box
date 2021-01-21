import React from "react";

interface IErrorBoxProps {
  error?: Error;
  onClick?: (ev?: React.SyntheticEvent) => void;
  disabled?: boolean;
}

export default function ErrorBox({ error, onClick, disabled }: IErrorBoxProps) {
  return (
    <div>
      <h1>Error: {error?.message}</h1>
      <button onClick={onClick} disabled={disabled}>
        Retry
      </button>
    </div>
  );
}
