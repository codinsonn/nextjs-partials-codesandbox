import dynamic from "next/dynamic";

// List of renderable "partials" / components
const dynamicRegistry = {
  SayHello: dynamic(() => import("../../components/SayHello"), {
    loading: () => <p>Loading...</p>
  })
};

/* --- <RenderDynamic/> ------------------------------------------- */

const RenderPartial = (props) => {
  // Props
  const { component, componentProps } = props;
  const Component = dynamicRegistry[component];

  // -- Render --

  return (
    <div>
      {!!Component ? (
        <Component {...(componentProps || {})} />
      ) : (
        <h4>The component &quot;{component}&quot; does not seem to exist</h4>
      )}
    </div>
  );
};

/* --- Initial Props ---------------------------------------------- */

export const getServerSideProps = async (ctx) => {
  // console.log(ctx);
  return {
    props: {
      component: ctx.params.compName,
      componentProps: ctx.req.body || ctx.query
    }
  };
};

/* --- Exports ---------------------------------------------------- */

export default RenderPartial;
