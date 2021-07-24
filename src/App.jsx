import { useState, useEffect } from 'react';
import useSWR from 'swr';
import fetcher from './utils/fetcher';
import './App.css';

function App() {
  const [number, setNumber] = useState(1);
  const { data, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${number}`,
    fetcher
  );

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 649));
  }, []);

  if (error) {
    return (
      <div className="App">
        <section className="App-content ">
          <h1>Error has occured.</h1>
        </section>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="App">
        <section className="App-content ">
          <h1>Loading...</h1>
        </section>
      </div>
    );
  }

  const { name, sprites } = data;
  const { front_default } =
    sprites.versions['generation-v']['black-white'].animated;
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

  console.log(error);

  return (
    <div className="App">
      <section className="App-content ">
        <img src={front_default} className="App-logo" alt={pokemonName} />
        <h1>{pokemonName}</h1>
        <ul>
          <li>
            <a
              className="App-link"
              href="https://swr.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn SWR
            </a>
          </li>
          <li>
            <a
              className="App-link"
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Pok&#xE9;API
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
