import React from 'react';
import Image from 'next/image';

interface ZovoIconProps {
  className?: string;
  size?: number;
}

export const ZovoIcon: React.FC<ZovoIconProps> = ({ className = '', size = 36 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/brand/icon.png"
        alt="ZOVO SEAM Icon"
        width={size}
        height={size}
        priority
        className="object-contain"
      />
    </div>
  );
};
