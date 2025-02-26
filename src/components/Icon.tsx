import React from "react";

const validIconTypes = {
  cryptoViewerLogo: true,
  bitcoin: true,
  ethereum: true,
  "binance-coin": true,
  solana: true,
  xrp: true,
  "usd-coin": true,
  tether: true,
  dogecoin: true,
  cardano: true,
  steth: true,
} as const;

export type IconTypes = keyof typeof validIconTypes;

function isValidIconType(value: string): value is IconTypes {
  return value in validIconTypes;
}

const ICON_SIZES = {
  tiny: "0.5rem" /* 8px */,
  small: "1rem" /* 16px */,
  medium: "1.5rem" /* 24px */,
  large: "3rem" /* 48px */,
};

// Define the icons object
const icons: Record<IconTypes, React.FC<React.SVGProps<SVGSVGElement>>> = {
  cryptoViewerLogo: React.lazy(() => import("/public/icons/crypto-logo.svg")),
  bitcoin: React.lazy(() => import("/public/icons/bitcoin-btc-logo.svg")),
  ethereum: React.lazy(() => import("/public/icons/ethereum-eth-logo.svg")),
  "binance-coin": React.lazy(() => import("/public/icons/bnb-bnb-logo.svg")),
  solana: React.lazy(() => import("/public/icons/solana-sol-logo.svg")),
  tether: React.lazy(() => import("/public/icons/tether-usdt-logo.svg")),
  "usd-coin": React.lazy(() => import("/public/icons/usd-coin-usdc-logo.svg")),
  xrp: React.lazy(() => import("/public/icons/xrp-xrp-logo.svg")),
  dogecoin: React.lazy(() => import("/public/icons/dogecoin-doge-logo.svg")),
  cardano: React.lazy(() => import("/public/icons/cardano-ada-logo.svg")),
  steth: React.lazy(() => import("/public/icons/sui-sui-logo.svg")),
};

// Define the IconProps interface
interface IconProps {
  type: IconTypes;
  color?: string;
  fill?: string;
  stroke?: string;
  size?: keyof typeof ICON_SIZES;
  customSize?: {
    width?: string | number;
    height?: string | number;
  };
  className?: string;
}

// Icon component
const Icon = (iconParams: IconProps) => {
  const iconType = isValidIconType(iconParams.type)
    ? iconParams.type
    : "cryptoViewerLogo";
  const SvgIcon = icons[iconType];
  const svgSize = iconParams.size
    ? ICON_SIZES[iconParams.size]
    : ICON_SIZES.medium;
  const svgFill = iconParams.fill || iconParams.color || "black";
  const svgStroke = iconParams.stroke || iconParams.color || "none";

  return (
    <SvgIcon
      fill={svgFill}
      stroke={svgStroke}
      width={iconParams.customSize?.width || svgSize}
      height={iconParams.customSize?.height || svgSize}
      className={iconParams.className ?? ""}
    />
  );
};

export default Icon;
