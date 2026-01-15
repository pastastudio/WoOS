type ShapeProps = {
  size: number;
  color: string;
};

type StarShapeProps = ShapeProps & {
  points: number;
};

const generateStarPath = (points: number, outer: number, inner: number) => {
  const step = Math.PI / points;
  let path = '';

  for (let i = 0; i < 2 * points; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = i * step - Math.PI / 2;

    const x = 12 + radius * Math.cos(angle);
    const y = 12 + radius * Math.sin(angle);

    path += i === 0 ? `M${x},${y}` : `L${x},${y}`;
  }

  return path + 'Z';
};

export const StarShape = ({ size, color, points = 5 }: StarShapeProps) => {
  const outer = 10;
  const inner = outer * 0.45;

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d={generateStarPath(points, outer, inner)} fill={color} />
    </svg>
  );
};

export const CircleForm = ({ size, color }: ShapeProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='12' cy='12' r='10' fill={color} />
    </svg>
  );
};
