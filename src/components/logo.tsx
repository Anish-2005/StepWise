import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}
      >
        {/* Background circle */}
        <circle cx="32" cy="32" r="32" fill="#3B82F6"/>
        <circle cx="32" cy="32" r="28" fill="white"/>

        {/* StepWise Logo */}
        {/* Stylized S with step elements */}
        <path d="M20 20 C20 16, 24 16, 28 20 C32 24, 32 28, 28 32 C24 36, 20 36, 20 40 C20 44, 24 44, 28 40" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round"/>

        {/* Step indicators */}
        <circle cx="20" cy="20" r="2" fill="#3B82F6"/>
        <circle cx="28" cy="20" r="2" fill="#3B82F6"/>
        <circle cx="28" cy="32" r="2" fill="#3B82F6"/>
        <circle cx="20" cy="32" r="2" fill="#3B82F6"/>
        <circle cx="20" cy="40" r="2" fill="#3B82F6"/>
        <circle cx="28" cy="40" r="2" fill="#3B82F6"/>

        {/* Algorithm visualization bars */}
        <rect x="38" y="18" width="3" height="12" fill="#10B981" rx="1"/>
        <rect x="42" y="22" width="3" height="8" fill="#F59E0B" rx="1"/>
        <rect x="46" y="16" width="3" height="16" fill="#EF4444" rx="1"/>
        <rect x="50" y="20" width="3" height="10" fill="#8B5CF6" rx="1"/>
        <rect x="54" y="24" width="3" height="6" fill="#06B6D4" rx="1"/>
      </svg>

      {showText && (
        <span className={`font-black text-slate-900 dark:text-white ${textSizeClasses[size]}`}>
          StepWise
        </span>
      )}
    </div>
  );
}