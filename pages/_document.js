import Document, { Html, Head, Main, NextScript } from "next/document";

/* --- <CustomDocument/> ---------------------------------------------------------------------- */

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { page } = this.props.__NEXT_DATA__;
    const isPartialRequest = page.includes("/render");

    // -- Render Component? --

    if (isPartialRequest) {
      return (
        <div>
          <Main />
          <NextScript />
          <pre>{JSON.stringify({ page, isPartialRequest })}</pre>
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
          <pre>{JSON.stringify({ page, isPartialRequest })}</pre>
        </body>
      </Html>
    );
  }
}

/* --- Exports ------------------------------------------------------------------------------ */

export default CustomDocument;
