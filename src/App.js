import "./App.css";
import useCastLink from "./useCastLink";

const App = () => {
  const projectId = 2114;
  const contactId = 1443684;

  // This key can be public, it can only be used to retrieve a link to the presentation given above.
  const apiKey =
    "f92a872467c4b12f1021dbcb4a3a067a2f42b588dff45d64100b91fe63921ac4";

  const linkState = useCastLink(projectId, contactId, apiKey);

  let display;
  if (!linkState.loaded) {
    display = <h2>Loading...</h2>;
  } else if (linkState.error) {
    display = <h2>Error: {linkState.error}</h2>;
  } else {
    display = (
      <>
        <h2>Link</h2>
        <a href={linkState.link}>Open presentation</a>
        <h2>Button</h2>
        <a
          className="button"
          rel="noreferrer"
          href={linkState.link}
          target="_blank"
        >
          Open presentation in a new tab
        </a>
        <h2>Embedded</h2>
        <iframe
          className="cast-iframe"
          title="Cast Delivery"
          src={linkState.link}
        />
      </>
    );
  }

  return (
    <>
      <h1>Cast Delivery React Example</h1>
      {display}
    </>
  );
};

export default App;
