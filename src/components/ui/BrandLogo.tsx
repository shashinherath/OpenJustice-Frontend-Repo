import React, { useState } from "react";
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC_DARK, BRAND_LOGO_SRC_LIGHT } from "@/config/branding";

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
        <>
          <img
            alt={BRAND_LOGO_ALT}
            className={`hidden dark:block ${imageClassName}`}
            src={BRAND_LOGO_SRC_LIGHT}
            onError={() => setImageError(true)}
          />
          <img
            alt={BRAND_LOGO_ALT}
            className={`block dark:hidden ${imageClassName}`}
            src={BRAND_LOGO_SRC_DARK}
            onError={() => setImageError(true)}
          />
        </>
      ) : (
        <span className={`material-symbols-outlined ${iconClassName}`}>balance</span>
      )}
    </div>
  );
};

export default BrandLogo;
