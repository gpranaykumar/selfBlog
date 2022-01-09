import React,{useEffect, useState} from 'react'
import {Layout} from '../components'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {ThemeProvider} from 'next-themes'
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
      
  )
}

export default MyApp
