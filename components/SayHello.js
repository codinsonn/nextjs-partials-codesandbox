import React, { useState } from "react";

/* --- <SayHello/> -------------------------------------------------------------------------- */

const SayHello = (props) => {
  // State
  const [greeting, setGreeting] = useState("");

  // -- Render --

  return (
    <div>
      <button
        type="button"
        onClick={() => setGreeting(props.greeting || "World")}
      >
        Say Hello
      </button>
      {greeting && <span>Hello {greeting}</span>}
    </div>
  );
};

/* --- Exports ------------------------------------------------------------------------------ */

export default SayHello;
