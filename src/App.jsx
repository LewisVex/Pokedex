import React, { useState, useEffect } from 'react';
import PokedexHeader from './components/PokedexHeader';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [tofetch, setTofetch] = useState(true);
  const [pokemonTable, setPokemonTable] = useState([]);
  const limit = 10; // Puedes ajustar el límite según tus necesidades

  async function pokemonFetch() {
    setFetching(true);
    const offset = (currentPage - 1) * limit;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    setFetching(false);

    if (data.results.length === 0) {
      setTofetch(false);
      return;
    }

    // Mapear los resultados para obtener más detalles de cada Pokémon
    const pokemonDetails = await Promise.all(
      data.results.map(async (result) => {
        const pokemonResponse = await fetch(result.url);
        return await pokemonResponse.json();
      })
    );

    setPokemonTable((prevList) => [...prevList, ...pokemonDetails]);
    setCurrentPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetching, tofetch]);

  useEffect(() => {
    pokemonFetch();
  }, []);

  const handleScroll = () => {
    if (fetching || !tofetch) {
      return;
    }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      pokemonFetch();
    }
  };

  return (
    <>
      <PokedexHeader />
      <section className="w-screen h-full bg-repeat grid grid-cols-5 items-center">
        {pokemonTable.map((pokemon, index) => (
          <div className='h-72 w-60 bg-gradient-to-l from-blue-400 via-purple-400 to-blue-600 animation rounded-md flex-col m-auto my-5 border-8 border-yellow-400 items-center relative' key={index}>
            <div className='flex justify-between'>
              <h1 className='text-black pt-1 pl-3 text-xl font-semibold'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
              <h1 className='text-black pt-1 pr-3 text-xl font-semibold'>{pokemon.base_experience}</h1>
            </div>
            <div className='h-3/5 w-11/12 border-8 border-yellow-400 items-center content-center absolute inset-0 mx-auto my-auto bg-blue-700'>
              {pokemon.sprites.front_default ? (
                <img src={pokemon.sprites.front_default} className='h-40 mx-auto my-auto' alt={`Imagen de ${pokemon.name}`} />
              ) : (
                <p>No hay imagen disponible</p>
              )}
            </div>
            <div className='flex justify-between absolute inset-x-0 bottom-4'>
              <h1 className='text-black pt-1 pl-3 text-base font-semibold'>Peso: {pokemon.weight}</h1>
              <h1 className='text-black pt-1 pr-3 text-base font-semibold'>Altura: {pokemon.height}</h1>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
