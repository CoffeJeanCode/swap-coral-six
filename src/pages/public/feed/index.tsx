import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { NextPageFCProps } from 'next';

const Public: NextPageFCProps = () => {
  return (
    <AtomWrapper>
      <AtomText color="red">FeedPublic</AtomText>
    </AtomWrapper>
  );
};
export async function getServerSideProps() {
  return {
    props: {}
  };
}
Public.Layout = 'public';

export default Public;
