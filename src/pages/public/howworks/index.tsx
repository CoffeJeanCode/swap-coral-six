import AtomImage from '@Components/@atoms/AtomImage';
import AtomLINK from '@Components/@atoms/AtomLink';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { NextPageFCProps } from 'next';
import { v4 as uuidv4 } from 'uuid';

const HowWorksPage: NextPageFCProps = () => {
  return (
    <AtomWrapper alignItems="flex-start" justifyContent="flex-start">
      <AtomWrapper
        padding="35px"
        maxWidth="1440px"
        flexDirection="column"
        flexWrap="wrap"
        customCSS={css`
          gap: 10px;
          color: white !important;
        `}
      >
        <AtomText
          color="white"
          as="h1"
          fontSize="32px"
          fontWeight="bold"
          width="auto"
        >
          How Works?
        </AtomText>
        <AtomText color="white" width="auto">
          IMPORTANT!: This project was created with educative intentions
        </AtomText>
        {STEPS_SPOTIFY?.map((item) => (
          <AtomWrapper key={item.id} flexDirection="column" gap="20px">
            <AtomText color="white" fontWeight="bold" fontSize="22px">
              {item.title}
            </AtomText>
            {item.description}
            <AtomWrapper flexDirection="row" gap="20px" flexWrap="wrap">
              {item.images?.map((item) => (
                <AtomWrapper key={item.id}>
                  <AtomText color="white" fontWeight="bold" fontSize="18px">
                    {item.title}
                  </AtomText>
                  <AtomImage
                    src={item?.image as string}
                    alt={item?.image as string}
                    height="auto"
                    maxWidth="640px"
                  />
                </AtomWrapper>
              ))}
            </AtomWrapper>
          </AtomWrapper>
        ))}
      </AtomWrapper>
    </AtomWrapper>
  );
};

type STEPS_SPOTIFY = {
  id: string;
  title: string;
  description?: JSX.Element;
  images?: {
    id?: string;
    image?: string;
    title?: string;
  }[];
};

const STEPS_SPOTIFY: STEPS_SPOTIFY[] = [
  {
    id: uuidv4(),
    title: '1. CREATE TOKEN PUBLIC SPOTIFY ',
    description: (
      <>
        <AtomWrapper>
          <AtomText color="white">
            You need spotify web api node and axios libraries. <br />
            you're going to send a request to Spotify.com and with your
            client_id and client_scret. in mode Buffer.from(). This method send
            in raw binary data your credentials in base64.{' '}
            <AtomLINK
              color="white"
              textDecoration="underline"
              href="https://nodejs.org/en/knowledge/advanced/buffers/how-to-use-buffers/#:~:text=What%20Are%20Buffers%3F,methods%20specifically%20for%20binary%20data."
            >
              More Info.
            </AtomLINK>
            <br />
            <br />
            Spotify is going to return a token, but this token is public, doesnt
            belong a user. So why do I need this token? Because this token give
            access to data, Artists, Albums, Tracks, Episodies, Shows.
            <br />
            THIS TOKEN DOESNT WORK WITH SOME METHODS FROM THE LIBRARY
            Spotify-we-api-node.
            <br />
            This token you need register in spotify-web-api-node, why? because
            every token has expire. and if don't register this token. you can't
            consum the spotify api
          </AtomText>
        </AtomWrapper>
      </>
    ),
    images: [
      {
        id: uuidv4(),
        title: 'Spotify API Token',
        image:
          'https://res.cloudinary.com/whil/image/upload/v1663354333/createTokenpublic_ffb9no.png'
      },
      {
        id: uuidv4(),
        title: 'Credentials',
        image:
          'https://res.cloudinary.com/whil/image/upload/v1663355032/CREDENTIALS_h1iobw.png'
      }
    ]
  },
  {
    id: uuidv4(),
    title: '2. CREATE QUERYS CONSUMERS (GRAPHQL) OPTIONAL',
    description: (
      <AtomWrapper>
        <AtomText color="white">
          I have created a query that recive a slug, with context graphql. I
          recive a function that is the function of first step. and execute this
          function.
          <br />
          So with the token registered. I can send request to Spotify and get
          data and save in my Database
        </AtomText>
      </AtomWrapper>
    ),
    images: [
      {
        id: uuidv4(),
        image:
          'https://res.cloudinary.com/whil/image/upload/v1663356881/QUERY_CONSUMER_rpzrtp.png',
        title: 'QUERY'
      },
      {
        id: uuidv4(),
        title: 'Graphql Config Server',
        image:
          'https://res.cloudinary.com/whil/image/upload/v1663357137/GRAPHQLSERVERCONFIG_lyhho3.png'
      }
    ]
  },
  {
    id: uuidv4(),
    title: '3. Next Auth and your credentials',
    description: (
      <AtomWrapper>
        <AtomText color="white">
          Why NextAuth?, yeah because takes your credentials when you are going
          to play a song <br />
          But how? <br />
          yeah when you re listen music and this message appears. YOU NEED SIGN
          IN WITH YOUR ACCOUNT IN THE BROWSER AND APP WINDOWS, reload the page
          and select a new song. and you can listen complete the song
        </AtomText>
      </AtomWrapper>
    ),
    images: [
      {
        id: uuidv4(),
        title: 'Login Spotify',
        image:
          'https://res.cloudinary.com/whil/image/upload/v1663358483/LOGIN_pi2rbv.png'
      },
      {
        id: uuidv4(),
        title: 'SIGN IN WITH YOUR ACCOUNT IN THE BROWSER AND APP WINDOWS',
        image:
          'https://res.cloudinary.com/whil/image/upload/v1663358682/SIGN_IN_SPOTFY_ylcxip.png'
      },
      {
        id: uuidv4(),
        title: 'NextAuth Config',
        image:
          'https://res.cloudinary.com/whil/image/upload/v1663358277/NEXTAUTH_zqmgqt.png'
      }
    ]
  },
  {
    id: uuidv4(),
    title: '4. useIFRAME Hook',
    description: (
      <AtomText color="white">
        This Hook or Function takes the Iframe from player and you can get
        controls from spotify iframe
        <br />- Commands
        <ol>
          <li>
            Toogle: This command can play and pause the iframe song. for example
            you want to stop the song in the minute 2:03 and go back and listen
            that minute. you can use this method!
          </li>
          <li>playerReadyAck: unknown</li>
          <li>play: Always play a song from the beginning</li>
          <li>TogglePlay: works as the first mehtod</li>
          <li>
            Seek: Set the duration of the song with timestamp. for example jump
            to minute 1:00 or 2:00
          </li>
          <li>SendMessageToEmbed: This commando is unknown</li>
        </ol>
        <br />- Commands unknown
        <ol>
          <li>onPlayerReady</li>
          <li>onPlaybackUpdate</li>
          <li>loadUri</li>
          <li>flushCommandQ</li>
        </ol>
        <br />
        ...and more
        <br />
        <AtomText color="white">- Total</AtomText>
        <br />
        This param by default is '*' but is unknown and I'm finding their use
      </AtomText>
    ),
    images: [
      {
        id: uuidv4(),
        title: 'IFRAME',
        image:
          'https://res.cloudinary.com/whil/image/upload/v1663363382/IFARME_tw730e.png'
      },
      {
        id: uuidv4(),
        title: 'Command Play',
        image:
          'https://res.cloudinary.com/whil/image/upload/v1663363496/BUTTONPLAY_k8kkbz.png'
      },
      {
        id: uuidv4(),
        title: 'useIFRAME',
        image:
          'https://res.cloudinary.com/whil/image/upload/v1663359108/USEIFRAME_ojy6ur.png'
      }
    ]
  }
];
HowWorksPage.Layout = 'public';
export default HowWorksPage;
