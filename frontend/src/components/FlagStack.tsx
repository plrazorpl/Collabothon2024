import React from "react";
import { CircleFlag } from 'react-circle-flags'

interface FlagStackProps {
  country1: string;
  country2: string;
}

const FlagStack: React.FC<FlagStackProps> = ({ country1, country2 }: FlagStackProps) => {
  return (
    <div style={{ position: "relative", width: "24px", height: "24px" }}>
      <CircleFlag
        countryCode={country1}
        height="24" 
        style={{
          position: "absolute",
          zIndex: 1,
        }}
      />

      <CircleFlag
        countryCode={country2}
        height="20" 
        style={{
          position: "absolute",
          top: "12px",
          left: "12px",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default FlagStack;
