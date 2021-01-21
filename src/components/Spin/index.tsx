import React from "react";

interface ISpinProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Spin({ loading, children, className }: ISpinProps) {
  if (loading) {
    return <h2>loading...</h2>;
  }

  return <div className={className}>{children}</div>;
}
