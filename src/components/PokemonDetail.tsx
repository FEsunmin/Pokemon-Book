import React from "react";
import axios from "axios";
import { Pokemon } from "@/types/pokemon";

const detailUrl = process.env.API_DETAIL_URL;

const getPokemonData = async (id: string): Promise<Pokemon> => {
  const response = await axios.get(
    `pokemon-book-xi.vercel.app/api/pokemons/${id}`
  );
  return response.data;
};

const PokemonDetail = async ({ params }: { params: { id: string } }) => {
  const pokemon = await getPokemonData(params.id);

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center shadow-xl border border-inherit w-[80%] h-[90%] rounded-xl">
        <div className="flex w-full items-center justify-between">
          <a className="ml-5 mt-5 border rounded-md p-2" href="/">
            Back to Pokemon List
          </a>
          <h1 className="mt-5 items-center font-bold text-2xl">
            {pokemon.korean_name} ({pokemon.name})
          </h1>
          <div className="w-[180px] mr-5 mt-5  rounded-md p-2 float-left"></div>
        </div>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div className="flex mt-0">
          <div className="flex mr-10">
            <p className="mr-2 font-bold">키:</p>
            <p>{pokemon.height}</p>
          </div>
          <div className="flex mr-10">
            <p className="mr-2 font-bold">무게:</p>
            <p>{pokemon.weight}</p>
          </div>
        </div>
        <div className="flex mt-5 items-center">
          <h2 className="font-bold mr-3">포켓몬 타입 : </h2>
          <ul className="flex mr-5">
            {pokemon.types.map((type) => (
              <li
                key={type.type.name}
                className="mr-5 w-[30px] h-[30px] bg-orange-300 rounded-md flex justify-center items-center"
              >
                {type.type.korean_name || type.type.name}
              </li>
            ))}
          </ul>
          <h2 className="font-bold mr-3">특성 :</h2>
          <ul className="flex">
            {pokemon.abilities.map((ability) => (
              <li
                key={ability.ability.name}
                className="mr-5 w-[50px] h-[30px] bg-yellow-200 rounded-md flex justify-center items-center"
              >
                {ability.ability.korean_name || ability.ability.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold mt-10 mb-5">기술</h2>
          <div className="h-[300px] overflow-hidden text-center">
            <ul className="grid gap-5 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
              {pokemon.moves.map((move) => (
                <li key={move.move.name}>
                  {move.move.korean_name || move.move.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PokemonDetail;
