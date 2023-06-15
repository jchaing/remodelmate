import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Start of Google Tag Manager (noscript) */}
        <Script
          id="gtm-script-remodelmate"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-KMCV6WV');
                `,
          }}
        />
        {/* End of Google Tag Manager (noscript) */}

        {/* Start Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="0tKLUvVGi_4fGRcqMiuqDxticWV8cmnqV8vQcOkOI-E"
        />
        {/* End Google Search Console Verification */}
      </Head>
      <body>
        {/* Start of Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KMCV6WV"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
                `,
          }}
        />
        {/* End of Google Tag Manager (noscript) */}

        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
