import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import "./style.scss";

/**
 * 函数式调用全局Loading效果
 * loading 样式免费下载于：https://loading.io/spinner/spin/-spinner-ball-circle-rotate-rosary-loader-ajax
 */
export default function Loading() {
  return (
    <div className="loading-root">
      <div className="loadingio-spinner-spin-qfxgee5fim">
        <div className="ldio-zfscm5g0kzg">
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Loading.toggle = function (loading: boolean) {
  let div = document.getElementById("loading-root");

  if (!div) {
    div = document.createElement("div");
    div.id = "loading-root";
    document.body.appendChild(div);
  }

  if (loading) {
    render(<Loading />, div);

    return;
  }

  unmountComponentAtNode(div);
  document.body.removeChild(div);
};
