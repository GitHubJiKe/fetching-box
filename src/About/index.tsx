import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import FetchStatusBox from "../components/FetchStatusBox";

interface IAboutData {
  avatar?: string;
  name?: string;
  location?: string;
}

export default function About() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<IAboutData>();

  const doFetching = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axios.get<IAboutData>("https://xxx.api/v1/about");

      setData(res.data);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    doFetching();
  }, [doFetching]);

  return (
    <FetchStatusBox loading={loading} error={error} onRetry={doFetching}>
      <About.Content {...data} />
    </FetchStatusBox>
  );
}

About.Content = function ({ avatar, name, location }: IAboutData) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <strong>{name}</strong>
      <i>{location}</i>
    </div>
  );
};
