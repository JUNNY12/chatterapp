import { Typography } from './element';
import { FaPlus } from 'react-icons/fa';
import { useFollow } from '../hooks/user/useFollow';

interface FollowProps {
   uid: string;
}

export const Follow = ({ uid }: FollowProps): React.JSX.Element => {
   const { handleSetfollow } = useFollow();
   return (
      <Typography
         onClick={() => handleSetfollow(uid)}
         variant={2}
         className="ms-4 font-semibold mobileXL:text-[12px] inline-flex items-center"
      >
         <span className="me-2">Follow</span>
         <span>
            <FaPlus />
         </span>
      </Typography>
   );
};
