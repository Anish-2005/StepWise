interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size]} shrink-0`}
        aria-hidden
      >
        <rect x="6" y="6" width="52" height="52" rx="14" fill="#2563EB" />
        <rect x="6.75" y="6.75" width="50.5" height="50.5" rx="13.25" stroke="white" strokeOpacity="0.2" />

        <path
          d="M18 42H28V30H38V22H48V16"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="42" r="2.25" fill="white" />
        <circle cx="28" cy="30" r="2.25" fill="white" />
        <circle cx="38" cy="22" r="2.25" fill="white" />
        <circle cx="48" cy="16" r="2.25" fill="white" />
      </svg>

      {showText && (
        <span className={`font-black tracking-tight text-slate-900 dark:text-white ${textSizeClasses[size]}`}>
          StepWise
        </span>
      )}
    </div>
  );
}
