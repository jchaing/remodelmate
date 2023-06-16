import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VDJX08BSYL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-VDJX08BSYL');
        `}
        </Script>

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
                })(window,document,'script','dataLayer','GTM-N7CJ7ZH');
                `,
          }}
        />
        {/* End of Google Tag Manager (noscript) */}

        {/* Start Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="ZnDvyYa_Dgih6ivhtGa-_cnRroGeVFqiox0Kgboa9FY"
        />
        {/* End Google Search Console Verification */}
      </Head>
      <body>
        {/* Start of Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N7CJ7ZH"
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
