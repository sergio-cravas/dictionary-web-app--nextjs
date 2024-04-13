type Props = { color?: string; size?: number; className?: string };

export const ArrowDownIcon = ({ color = '#A445ED', size = 14, className }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={(size * 8) / 14} viewBox="0 0 14 8" className={className}>
      <path fill="none" stroke={color} strokeWidth="1.5" d="m1 1 6 6 6-6" />
    </svg>
  );
};
