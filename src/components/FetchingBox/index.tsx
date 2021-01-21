import React, { useState, useEffect, useCallback } from "react";
import { AxiosResponse } from "axios";
import FetchStatusBox from "../FetchStatusBox";

interface IFetchingBoxProps<T> {
  loader: () => Promise<AxiosResponse<T>>;
  children: (res?: AxiosResponse<T>) => React.ReactNode;
  className?: string;
}

export default function FetchingBox<T>({
  loader,
  children,
  className,
}: IFetchingBoxProps<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [res, setRes] = useState<AxiosResponse<T>>();

  const doFething = useCallback(async () => {
    setLoading(true);

    try {
      const response = await loader();
      setRes(response);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  }, [loader]);

  useEffect(() => {
    doFething();
  }, [doFething]);

  return (
    <FetchStatusBox
      loading={loading}
      error={error}
      className={className}
      onRetry={doFething}
    >
      {children(res)}
    </FetchStatusBox>
  );
}
