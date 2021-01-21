import axios from "axios";
import React from "react";
import FetchingBox from "../components/FetchingBox";

interface IHomeData {
  title?: string;
  subTitle?: string;
  content?: string;
}

export default function Home() {
  // 两种写法都可以，效果一样

  // return (
  //   <FetchingBox loader={() => axios.get<IHomeData>("https://xxx.api/v1/home")}>
  //     {(res) => <Home.Content {...res?.data} />}
  //   </FetchingBox>
  // );

  return (
    <FetchingBox<IHomeData> loader={() => axios.get("https://xxx.api/v1/home")}>
      {(res) => <Home.Content {...res?.data} />}
    </FetchingBox>
  );
}

Home.Content = function ({ title, subTitle, content }: IHomeData) {
  return (
    <div>
      <h1>{title}</h1>
      <h3>{subTitle}</h3>
      <article>{content}</article>
    </div>
  );
};
