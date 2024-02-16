import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [joke, setJoke] = useState({ setup: "Loading", punchline: "" });
  const [loaded, setLoaded] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;

      axios
        .get("https://official-joke-api.appspot.com/random_joke")
        .then((response) => {
          console.log(response);
          setJoke({
            setup: response.data.setup,
            punchline: response.data.punchline,
          });
          setLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  return (
    <div className="App">
      <h2>Hello Aliens, I am back</h2>
      {loaded ? (
        <>
          <h4>{joke.setup}</h4>
          <h4>{joke.punchline}</h4>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
