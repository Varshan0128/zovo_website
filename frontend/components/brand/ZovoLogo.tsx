import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ZovoLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'mono-white' | 'mono-black';
  height?: number;
  href?: string;
  showTagline?: boolean;
}

export const ZovoLogo: React.FC<ZovoLogoProps> = ({
  className = '',
  variant = 'dark',
  height = 36,
  href = '/',
  showTagline = false,
}) => {
  // 1024x411 aspect ratio = 2.4915
  const width = Math.round(height * 2.4915);

  const logoSrc = {
    light: '/brand/logo-light.png',
    dark: '/brand/logo-dark.png',
    'mono-white': '/brand/logo-mono-white.png',
    'mono-black': '/brand/logo-mono-black.png',
  }[variant];

  const content = (
    <div className={`inline-flex flex-col group cursor-pointer ${className}`}>
      <div className="relative inline-flex items-center transition-opacity hover:opacity-95">
        <Image
          src={logoSrc}
          alt="ZOVO — Turning Ideas Into Digital Solutions"
          width={width}
          height={height}
          priority
          style={{ width: `${width}px`, height: `${height}px` }}
          className="object-contain"
        />
      </div>
      {showTagline && (
        <span className="text-[10px] tracking-widest text-[#8E97A8] uppercase font-medium mt-1 pl-1">
          Digital Solutions
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} aria-label="ZOVO Homepage" className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
};
