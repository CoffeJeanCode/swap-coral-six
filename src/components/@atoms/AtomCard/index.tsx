/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import { FC } from 'react';
import AtomButton from '../AtomButton';
import AtomImage from '../AtomImage';
import { AtomText } from '../AtomText';

type Card = {
  id?: string;
  type?: string;
  image?: string;
  name?: string;
  onClick?: () => void;
};
const ImageTypes = ['track', 'playlist', 'single', 'compilation', 'album'];

const AtomCard: FC<Card> = (props) => {
  return (
    <AtomButton
      onClick={props?.onClick}
      customCSS={css`
        cursor: pointer;
        transition: all 0.3s ease;
        align-items: flex-start;
        justify-content: space-between;
        color: white;
        padding: 10px;
        background-color: #3b3b462b;
        border-radius: 5px;
        width: 200px;
        height: 270px;
        &:hover {
          box-shadow: 0px 0px 10px #0000003f;
          background: #32323d;
        }
        @media (max-width: 520px) {
          width: 190px;
          height: 240px;
          margin: 0px;
        }
        @media (max-width: 465px) {
          width: 180px;
        }
        @media (max-width: 445px) {
          width: 150px;
        }
        @media (max-width: 425px) {
          width: 150px;
          height: 220px;
        }
        @media (max-width: 375px) {
          width: 130px;
          height: 220px;
        }
      `}
    >
      <AtomImage
        src={props?.image as string}
        alt={props?.name as string}
        width="100%"
        height="180px"
        borderRadius={
          ImageTypes.includes(props?.type as string) ? '5px' : '50%'
        }
        customCSS={css`
          @media (max-width: 520px) {
            width: -webkit-fill-available;
            height: 170px;
          }
          @media (max-width: 445px) {
            width: -webkit-fill-available;
            height: 130px;
          }
          @media (max-width: 425px) {
            width: -webkit-fill-available;
            height: 130px;
          }
        `}
      />
      {(props?.name?.length as number) > 35 ? (
        <AtomText
          as="h4"
          color="white"
          customCSS={css`
            width: 100%;
            line-height: 1.2;
            text-align: left;
            font-size: 1rem;
          `}
        >
          {props?.name?.slice(0, 35)}...
        </AtomText>
      ) : (
        <AtomText
          as="h4"
          color="white"
          customCSS={css`
            width: 100%;
            line-height: 1.2;
            text-align: left;
            font-size: 1rem;
          `}
        >
          {props?.name}
        </AtomText>
      )}
      <AtomText color="white" opacity="0.5">
        {(props?.type?.charAt(0)?.toUpperCase() as string) +
          props?.type?.slice(1)}
      </AtomText>
    </AtomButton>
  );
};

export default AtomCard;
