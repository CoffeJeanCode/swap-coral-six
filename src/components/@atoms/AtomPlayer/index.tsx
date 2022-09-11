import { FC } from 'react';
import AtomPlayerIframe from '../AtomPlayerIframe';

const AtomPlayer: FC = () => {
  // const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);

  // const router = useRouter();

  // const { data, loading } = useQuery<IQueryFilter<'audioById'>>(audioById, {
  //   skip: !controls?.currentTrack?.id,
  //   fetchPolicy: 'cache-and-network',
  //   variables: {
  //     id: controls?.currentTrack?.id
  //   }
  // });

  return (
    <>
      <AtomPlayerIframe />
    </>
  );
};

export default AtomPlayer;
