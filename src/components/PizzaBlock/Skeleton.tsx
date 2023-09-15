import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="245" rx="10" ry="10" width="280" height="30" />
    <rect x="0" y="292" rx="10" ry="10" width="280" height="88" />
    <circle cx="139" cy="115" r="110" />
    <rect x="0" y="407" rx="10" ry="10" width="97" height="28" />
    <rect x="127" y="397" rx="23" ry="23" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
