/* eslint-disable @next/next/no-page-custom-font */
import { ApolloProvider } from '@apollo/client';
import { Global } from '@emotion/react';
import HeadComponent from '@Styles/global/head';
import Normalize from '@Styles/global/normalize';
import Layouts from 'layout';
import { SessionProvider } from 'next-auth/react';
import type { AppPropsWithLayout } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import client from '../apollo/client';
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) => {
  const SEO = Component.SEO;
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <HeadComponent>
          <Layouts Layout={Component.Layout} SEO={SEO}>
            <Global styles={Normalize} />
            <ToastContainer />
            <Component {...pageProps} />
          </Layouts>
        </HeadComponent>
      </SessionProvider>
    </ApolloProvider>
  );
};

export default MyApp;
