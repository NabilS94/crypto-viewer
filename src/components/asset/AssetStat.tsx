export const AssetStatComponent = ({
  title,
  statValue,
  customStyle
}: {
  title: string;
  statValue: string;
  customStyle?: string;
}) => {
  return (
    <div className={`${customStyle ?? ''}`}>
      <p className="text-white font-semibold text-sm md:text-lg">{title}</p>
      <p className="text-white text-sm md:text-lg text-center">{statValue}</p>
    </div>
  );
};
