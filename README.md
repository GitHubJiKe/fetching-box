# FetchStatusBox & FetchingBox

> React 开发中，更简洁、优雅的处理 loading、error 以及统一 Container 样式的问题的思路

## 组件化思维

使用 React 开发的最大的有事就是组件化解决问题，进而实现消除重复代码，提高代码利用率的目的。

## 主要解决的问题

- 模块级别的 loading
- error 的展示以及重新出发请求的事件处理
- 统一的模块级别的布局样式

### loading

对于某个模块而言，甚至是某个单一请求的页面，显式的处理 loading 是常规操作，如果封装的有自己的`Spin`组件,或者使用的第三方 UI 库里的类似的组件（eg:antd 的 Spin 组件），就是使用该组件去包裹需要渲染的内容区域。

当有多处这样写的时候，重复性的代码就开始显露了。因此`FetchStatusBox`以及基于`FetchStatusBox`进一步封装的`FetchingBox`就是为了减少此类代码的重复。

### error

同 loading 的处理一样，也是为了消除重复，减少组件内部的`if...else...`代码的存在，使`React`代码更加组件化。

### 统一样式

这一点是笔者在实际工作中遇到的问题，对于一个体量比较庞大的项目而言，尽管有统一的设计稿可做参考，但是不同的开发人员在实际的开发过程中还是会写出有着些许差别的样式来，主要体现于容器型组件的`padding,margin,backgroundColor...`。为了解决这一问题，有着统一样式的`Container`组件就显得很有必要。

通过的`common-container-root class`对样式的统一设置，使此问题不复存在，当然如果真的有定制化的需要，也可以通过传递`className`来覆写样式。

## 示例代码

### FetchingBox

```tsx
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
```

### FetchStatusBox

```tsx
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
```

## 优势和缺陷

### 优势

- 组件化
- 减少重复
- 减轻单独处理 loading，error 的心智负担

### 缺陷

- 只能针对模块化比较强的组件或页面使用
- 对于复杂的页面，需要多个请求的数据融合展示的不太友好

## 函数式 Loading

如下代码：

```typescript
function App() {
  useEffect(() => {
    Loading.toggle(true);

    setTimeout(() => {
      Loading.toggle(false);
    }, 2000);
  }, []);

  return (
    <div className="App">
      <Home />
      <About />
    </div>
  );
}
```

函数式调用的好处就是灵活和逻辑分明，根据需要随时随地可以进行 loading 处理

## 结语

从和产品沟通链接需求，到设计师出设计稿，再到前端和后端分别做设计，对页面功能的拆分，模块的划分，最后落实到代码层面，每一步都影响着最终产出的应用是不是一个设计良好，用户体验优良的产品。

作为一个前端工程师，能做的除了尽可能的理解清楚需求外，个人觉得还要积极的和设计师沟通，和后端开发沟通，确保最后的页面设计是和前端功能的拆分、模块的划分是统一的。

后端接口的设计影响着前端模块的划分，有些页面不可避免的需要用到聚合性数据（多个接口的数据，有些团队会引入`Node层做BFF`处理此类情况，这又是另外一个话题了），但是对于大多数拆分的比较合理的模块、页面而言，单独处理和维护自身的请求状态都是比较合理的（高内聚）。

最核心的还是要总结和提炼，运用好 React 的组件化思维。
