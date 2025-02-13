interface CustomBarProps {
  bgColor: string;
  sentiment: string;
  sentimentValue: number;
  total: number;
}
const CustomBar = ({
  sentiment,
  sentimentValue,
  total,
  bgColor,
}: CustomBarProps) => {
  let color = "black";
  if (sentiment === "veryPositive" || sentiment === "veryNegative") {
    color = "white";
  }
  return (
    <div
      className="h-[18px] flex justify-center font-normal items-center text-xs"
      style={{
        flexBasis: `${(sentimentValue / total) * 100}%`,
        backgroundColor: bgColor,
        color,
      }}
    >
      {`${Math.round((sentimentValue / total) * 100)}%`}
    </div>
  );
};

export default CustomBar;
