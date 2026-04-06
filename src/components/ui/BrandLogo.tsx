import React, { useState } from "react";
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from "@/config/branding";

interface BrandLogoProps {
  containerClassName?: string;
  iconClassName?: string;
  imageClassName?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  containerClassName = "flex items-center justify-center overflow-hidden",
  iconClassName = "text-2xl",
  imageClassName = "h-full w-full object-contain",
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={containerClassName}>
      {!imageError ? (
        <img
          alt={BRAND_LOGO_ALT}
          className={imageClassName}
          src={BRAND_LOGO_SRC}
          onError={() => setImageError(true)}
        />
      ) : (
        <span className={`material-symbols-outlined ${iconClassName}`}>balance</span>
      )}
    </div>
  );
};

export default BrandLogo;
