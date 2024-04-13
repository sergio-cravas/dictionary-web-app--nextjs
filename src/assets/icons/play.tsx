type Props = { color?: string; size?: number; className?: string };

export const PlayIcon = ({ color = '#A445ED', size = 75, className }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} viewBox="0 0 75 75">
      <g fill={color} fillRule="evenodd">
        <path d="M29 27v21l21-10.5z" />
      </g>
    </svg>
  );
};
