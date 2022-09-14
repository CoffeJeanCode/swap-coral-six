import OrganismListByType from '@Components/@templates/OrganismListByType';
import { NextPageFCProps } from 'next';

const Albums: NextPageFCProps = () => {
  return <OrganismListByType type="albums" />;
};

export async function getServerSideProps() {
  Albums.SEO = {
    title: 'Albums',
    image:
      'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
    description: `Swap Coral Six - Albums is avaible now!`,
    keywords: ['swapcoralsix', 'Albums']
  };

  return {
    props: {}
  };
}
Albums.Layout = 'public';

export default Albums;
