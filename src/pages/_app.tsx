import "antd/dist/antd.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { useState } from "react";

import PageLayout from "src/components/layout/pagelayout";
import { AuthProvider } from "src/context/auth";
import "src/styles/index.scss";
const App = ({ Component, router, pageProps }: AppProps) => {
  const [activeTab, setActiveTab] = useState<string>("repositories");
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <script src="/config.js"></script>
      </Head>
      <AuthProvider>
        <PageLayout activeTab={activeTab}>
          <Component
            {...pageProps}
            router={router}
            setActiveTab={setActiveTab}
          />
        </PageLayout>
      </AuthProvider>
    </>
  );
};

export default App;
function signInCallback(signInCallback: any) {
  throw new Error("Function not implemented.");
}
