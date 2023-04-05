import "@/styles/globals.css";
import type {AppType} from "next/app";
import {trpc} from "@/utils/trpc";
import {Layout} from "@/components/Layout";
import React from "react";
import {getSession, SessionProvider, signIn} from "next-auth/react";
import {Session} from "next-auth";


const App: AppType<{ session: Session | null }> = ({
                                                            Component,
                                                            pageProps,
                                                          }) => {
  const content = <Component {...pageProps} />;
  const page = (Component as any).getLayout ? (Component as any).getLayout(content) : <Layout>{content}</Layout>

  return (
        <SessionProvider session={pageProps.session}>
            {page}
        </SessionProvider>
  );
};

App.getInitialProps = async ({ctx}) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      session: null
    };
  }

  return {
    session: await getSession(ctx),
  };
};

export default trpc.withTRPC(App);
