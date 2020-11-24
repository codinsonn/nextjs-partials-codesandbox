/* --- <IndexPage/> ----------------------------------------------- */

const IndexPage = (props) => {
  return (
    <div>
      <h2>This title should not be removed upon hydration</h2>
      <div>
        {/* Uncommenting this breaks the page /}
        <div dangerouslySetInnerHTML={{ __html: props.componentHTML }} />
        {/**/}
        <pre>{props.componentHTML}</pre>
      </div>
    </div>
  );
};

/* --- Initial Props ---------------------------------------------- */

export const getServerSideProps = async ({ req }) => {
  const component = "SayHello";
  const componentProps = JSON.stringify({ greeting: "World" });
  const url = "https://ssiyd.sse.codesandbox.io/";
  const res = await fetch(`${url}/render-partial/${component}`, {
    method: "POST",
    body: componentProps
  });
  const componentHTML = await res.text();
  console.log({ url, componentHTML });
  return { props: { componentHTML } };
};

/* --- Exports ---------------------------------------------------- */

export default IndexPage;
