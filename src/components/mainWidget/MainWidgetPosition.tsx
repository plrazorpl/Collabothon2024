import React from "react";
import Two from "../../assets/2.svg";
import One from "../../assets/1.svg";
import Three from "../../assets/3.svg";
import Four from "../../assets/4.svg";
import Five from "../../assets/5.svg";
import Image from "next/image";

function MainWidgetPosition({
  score,
  comparedCurrency,
  currencyValue,
  valueChange,
  currencyAccountBalance,
}: any) {
  const preapreValueChange = () => {
    return valueChange >= 0 ? "+ " + valueChange?.toFixed(2) : "- " + Math.abs(valueChange?.toFixed(2));
  };

  const colorForText = valueChange >= 0 ? "text-green-500" : "text-red-500";

  const defineChart = () => {
    switch (score) {
      case 1:
        return <Image src={One} alt={"test"} width={80} height={40} />;
      case 2:
        return <Image src={Two} alt={"test"} width={80} height={40} />;
      case 3:
        return <Image src={Three} alt={"test"} width={80} height={40} />;
      case 4:
        return <Image src={Four} alt={"test"} width={80} height={40} />;
      case 5:
        return <Image src={Five} alt={"test"} width={80} height={40} />;
    }
  };
  return (
    <div className="flex items-center">
      <div className="flex items-center">{defineChart()}</div>
      <div className="flex flex-col ml-5">
        <div className="flex-none w-14 text-xs">EUR/{comparedCurrency}</div>
        <div className={`flex-initial w-64 font-bold ${colorForText}`}>
          {currencyValue?.toFixed(2)} EUR / {preapreValueChange()} %
        </div>
      </div>

      <div className="flex flex-col justify-start text-start">
        <div className="flex-none text-xs">Acc. value</div>
        <div className={`text-md font-medium`}>{currencyAccountBalance} {comparedCurrency}</div>
      </div>
    </div>
  );
}

export default MainWidgetPosition;
