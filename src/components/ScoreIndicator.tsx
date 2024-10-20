import "./score.css";

const calculateColorForScore = (value: any) => {
  if (value === 5) return "#3DA940";
  else if (value === 4) return "#53B83A";
  else if (value === 3) return "#71B858";
  else if (value === 2) return "#ED8D00";
  else return "#D12000";
};

export const ScoreIndicator = ({ value }: any) => {
  const deg = (180 / 100) * value * 20;
  return (
    <div className="indicator">
      <span
        className="bar"
        style={{
          borderColor: calculateColorForScore(value),
          transform: `rotate(${deg}deg)`,
        }}
      />
    </div>
  );
};
