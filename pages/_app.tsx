import React,{useEffect, useState} from 'react'
import {Layout} from '../components'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {ThemeProvider} from 'next-themes'
import SEO from "@bradgarropy/next-seo"
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <Layout>
        <SEO title="SelfBlog" description="A blog for Computer Science Engineering ( CSE ) subjects programs/codes,information,etc..."
        icon="/favicon.ico"
        facebook={{
          image: "/favicon.ico",
          url: "https://www.facebook.com/gpranaykumar0",
          type: "website",
      }}
      twitter={{
        image: "/twitter.png",
        site: "@pranaykumar0001",
        card: "summary",
    }}
      keywords={["selfBlog","website", "blog", "technology","CSE","gpranaykumar"]}
      />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
      
  )
}

export default MyApp
