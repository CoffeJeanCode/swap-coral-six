import OrganismListByType from '@Components/@templates/OrganismListByType';
import { NextPageFCProps } from 'next';

const Playlists: NextPageFCProps = () => {
  return <OrganismListByType type="playlist" />;
};
export async function getServerSideProps() {
  Playlists.SEO = {
    title: 'Playlists',
    image:
      'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
    description: `Swap Coral Six - Playlists is avaible now!`,
    keywords: ['swapcoralsix', 'Playlists']
  };

  return {
    props: {}
  };
}
Playlists.Layout = 'public';

export default Playlists;
