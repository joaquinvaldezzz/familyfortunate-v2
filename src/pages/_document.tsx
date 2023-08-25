import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-w-xs scroll-smooth antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
