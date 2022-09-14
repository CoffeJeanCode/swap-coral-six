import AtomButton from '@Components/@atoms/AtomButton';
import AtomIcon from '@Components/@atoms/AtomIcon';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomViewImageSidebar from '@Components/@atoms/AtomViewImageSidebar';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Sections = [
  {
    id: uuidv4(),
    name: 'Feed',
    path: '/public/feed',
    icon: 'https://res.cloudinary.com/whil/image/upload/v1661401537/group_otfmxi.svg'
  },
  {
    id: uuidv4(),
    name: 'Artists',
    path: '/public/artists',
    icon: 'https://res.cloudinary.com/whil/image/upload/v1663124150/user-square_x87nyq.svg'
  },
  {
    id: uuidv4(),
    name: 'Playlists',
    path: '/public/playlists',
    icon: 'https://res.cloudinary.com/whil/image/upload/v1661401537/music-dashboard_ivh8cq.svg'
  },
  {
    id: uuidv4(),
    name: 'Albums',
    path: '/public/albums',
    icon: 'https://res.cloudinary.com/whil/image/upload/v1663123474/music-library-2_m4xi2v.svg'
  },
  {
    id: uuidv4(),
    name: 'Search',
    path: '/public/search',
    icon: 'https://res.cloudinary.com/whil/image/upload/v1661401540/search-normal_afllai.svg'
  }
];

const OrganismNavbar: FC = () => {
  const router = useRouter();
  return (
    <AtomWrapper
      backgroundColor="#191922"
      customCSS={css`
        grid-row: 1 / 2;
        grid-column: 1 / 2;
      `}
    >
      <AtomWrapper
        color="white"
        backgroundColor="#191922"
        customCSS={css`
          height: 100%;
          z-index: 2;
          display: grid;
          grid-template-rows: auto 1fr auto;
          border-radius: 0px 10px 0px 0px;
          top: 0;
          @media (max-width: 980px) {
            display: none;
          }
        `}
      >
        <AtomWrapper
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          padding="1rem"
          gap="1rem"
          customCSS={css`
            grid-row: 2;
          `}
        >
          <AtomButton
            padding="0px"
            backgroundColor="transparent"
            flexDirection="row"
            gap="15px"
            onClick={() =>
              router.push('/public/feed').then(() =>
                document?.getElementById('view')?.scroll({
                  top: 0,
                  behavior: 'smooth'
                })
              )
            }
          >
            <AtomIcon
              width="50px"
              height="50px"
              customCSS={css`
                grid-row: 1 / 2;
              `}
              color="default"
              icon="https://res.cloudinary.com/whil/image/upload/v1663120889/S_pcf0i0.svg"
            />
            <AtomText
              color="white"
              font="Open Sans"
              fontSize="18px"
              fontWeight="bold"
            >
              Swap Coral Six
            </AtomText>
          </AtomButton>
          {Sections?.map((section) => (
            <AtomButton
              key={section.id}
              padding="0px"
              backgroundColor="transparent"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-start"
              gap="20px"
              onClick={() => {
                router
                  .push({
                    pathname: section.path
                  })
                  .then(() => {
                    document?.getElementById('view')?.scroll({
                      top: 0,
                      behavior: 'smooth'
                    });
                  });
              }}
            >
              <AtomIcon
                width="30px"
                height="30px"
                color="default"
                customCSS={css`
                  svg {
                    path {
                      stroke: white;
                    }
                  }
                `}
                icon={section.icon}
              />
              <AtomText color="white" fontSize="16px" fontWeight={600}>
                {section.name}
              </AtomText>
            </AtomButton>
          ))}
        </AtomWrapper>
        <AtomViewImageSidebar />
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default OrganismNavbar;
