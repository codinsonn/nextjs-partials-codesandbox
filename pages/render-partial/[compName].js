// Components
import SayHello from "../../components/SayHello";

// List of renderable "partials" / components
const componentRegistry = { SayHello };

/* --- <RenderPartial/> ------------------------------------------- */

const RenderPartial = (props) => {
  // Props
  const { component, componentProps } = props;
  const Component = componentRegistry[component];

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
      componentProps: ctx.req.body || {
        greeting: ctx.query.greeting || "World"
      }
    }
  };
};

/* --- Exports ---------------------------------------------------- */

export default RenderPartial;
