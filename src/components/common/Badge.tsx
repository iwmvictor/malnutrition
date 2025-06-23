import { FC } from "react";

type props = {
  n?: number;
};
const Badge: FC<props> = ({ n }) => {
  return (
    <div className='h-6 text-xs aspect-square bg-gray-100 rounded-full inline-flex items-center justify-center'>
      {n ?? "."}
    </div>
  );
};

export default Badge;
