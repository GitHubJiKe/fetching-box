import React from "react";
import ErrorBox from "../ErrorBox";
import Spin from "../Spin";

import "./style.scss";

interface IFetchStatusBoxProps {
  loading?: boolean;
  error?: Error;
  onRetry?: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function FetchStatusBox({
  loading,
  error,
  onRetry,
  className,
  children,
}: IFetchStatusBoxProps) {
  return (
    <Spin loading={loading} className={`common-container-root ${className}`}>
      {error ? (
        <ErrorBox error={error} onClick={onRetry} disabled={loading} />
      ) : (
        children
      )}
    </Spin>
  );
}
