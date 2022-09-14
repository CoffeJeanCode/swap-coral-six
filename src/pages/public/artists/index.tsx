import OrganismListByType from '@Components/@templates/OrganismListByType';
import { NextPageFCProps } from 'next';

const Artists: NextPageFCProps = () => {
  return <OrganismListByType type="artists" />;
};

export async function getServerSideProps() {
  Artists.SEO = {
    title: 'Artists',
    image:
      'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
    description: `Swap Coral Six - Artists is avaible now!`,
    keywords: ['swapcoralsix', 'Artists']
  };

  return {
    props: {}
  };
}
Artists.Layout = 'public';

export default Artists;
