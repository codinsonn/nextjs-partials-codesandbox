## Can NextJS be used for Partial Injections?

Other ways I could phrase this question:
- Has anyone succeeded in turning NextJS into a partial / component renderer?
- Could `pages/index.js` embed & hydrate mutiple html "partials" rendered from calls to 
`pages/render-component/[compName].js`?

## Example / What I Tried:

The  `_document.tsx` file only returns `<Main />` & `<NextScript />` for "partial" routes (omitting `<Html />`& `<Head />`)

<details>
<summary>pages/_document.tsx</summary>

```tsx
// @ts-nocheck
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

/* --- <CustomDocument/> ---------------------------------------------------------------------- */

class CustomDocument extends Document {

    static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx)
      return { ...initialProps }
    }
  
    render() {
        const { page } = this.props.__NEXT_DATA__; 
        
        // -- Render Component? --
       // -i- Only render component HTML & Scripts for partial injections

        if (page.includes('/render')) {
            return (
                <div>
                    <Main />
                    <NextScript />
                </div>
            );
        }

        // -- Render Page --

        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

/* --- Exports ------------------------------------------------------------------------------ */

export default CustomDocument;

```

</details>

> The idea here is to enable injecting certain component into a page
> (e.g. via Twig macro's which call NextJS routes serverside, or other templating languages)

### What doesn't work out:

It seems that embedding multiple `<NextScript />`'s on a page, only result in one of those hydrating the entire page, deleting all other content.

<details>
<summary>pages/index.tsx</summary>

```tsx
import React from 'react';
// Components
import LabelTest from '../components/LabelTest';

/* --- <Home/> --------------------------------------------------------------------- */

const Home = (props) => {
    return (
        <div>
            <h1>
                <LabelTest label={props.body?.label} />
            </h1>
            <br />
            <div dangerouslySetInnerHTML={{ __html: props.component }} />
        </div>
    );
};

/* --- SSR Props ------------------------------------------------------------------------------ */

export const getServerSideProps = async (ctx) => {
    const component = 'SayHello';
    const componentProps = JSON.stringify({ greeting: 'World' });
    const res = await fetch(`http://localhost:3000/render-dynamic/${component}`, { method: 'POST', body: componentProps });
    const componentHTML = await res.text();
    console.log({ componentHTML }, ctx.req.host);
    return { props: { component: componentHTML } };
};

/* --- Exports ---------------------------------------------------------------------------------- */

export default Home;

```

</details>

Can this somehow be avoided?

### CodeSandbox & Minimal Repro Link

codesandbox: https://codesandbox.io/s/nextjs-partials-e1jxi?file=/pages/index.js
repo: https://github.com/codinsonn/nextjs-partials-codesandbox