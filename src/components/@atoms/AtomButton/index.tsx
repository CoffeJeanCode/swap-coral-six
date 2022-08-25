import AtomLoader from '@Components/@atoms/AtomLoader';
import { css } from '@emotion/react';
import { FC } from 'react';
import ButtonStyled, { AtomButtonTypes } from './style';

const Animation = {
  whileHover: { scale: 1.02, transition: { duration: 0.3 } },
  whileTap: { scale: 0.98, opacity: 0.8 }
};

const AtomButton: FC<AtomButtonTypes> = (props) => {
  const { children, disabled, refObject, loading } = props;
  return (
    <ButtonStyled ref={refObject} {...(disabled ? {} : Animation)} {...props}>
      {loading ? (
        <AtomLoader
          isLoading
          type="small"
          colorLoading="white"
          widthLoader="2px"
          customCSS={css`
            width: 100%;
            .lds-ring {
              width: 15px;
              height: 15px;
              div {
                margin: 1px 2px;
                width: 14px;
                height: 14px;
              }
            }
          `}
        />
      ) : (
        <>{children || `Text Default`}</>
      )}
    </ButtonStyled>
  );
};
export default AtomButton;
