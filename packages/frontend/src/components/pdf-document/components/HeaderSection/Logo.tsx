// components/LogoSvg.tsx
import React from "react";

const LogoSvg: React.FC = () => {
  return (
    <svg width="80" height="80" viewBox="0 0 200 200">
      <rect x="30" y="60" width="40" height="110" fill="#d9534f" />
      <rect x="30" y="130" width="40" height="40" fill="#333" />
      <rect x="80" y="60" width="40" height="110" fill="#333" />
      <rect x="80" y="130" width="40" height="40" fill="#337ab7" />
      <rect x="130" y="130" width="40" height="40" fill="#f0ad4e" />
      <path
        d="M75,50 Q100,20 125,50"
        stroke="#d9534f"
        strokeWidth="15"
        fill="none"
      />
    </svg>
  );
};

export default LogoSvg;
