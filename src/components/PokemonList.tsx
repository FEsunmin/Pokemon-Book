"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Pokemon } from "@/types/pokemon";
import { Teko } from "next/font/google";

const inter = Teko({ subsets: ["latin"] });

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("/api/pokemons");
        console.log(response);
        setPokemons(response.data);
        console.log(typeof response.data);

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [setPokemons]);

  if (loading)
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-black">
        <div className="border border-white w-[300px] h-[300px] flex justify-center items-center">
          <p className="text-white text-xl">로딩중...</p>
        </div>
      </div>
    );
  if (error) return <p>{error}</p>;

  console.log(typeof pokemons);
  console.log(pokemons);

  return (
    <div className="flex flex-col items-center w-full border border-black">
      <h2
        className={`${inter.className} text-black text-6xl font-semibold text-center mt-10 mb-20`}
      >
        Pokemon Book
      </h2>
      <ul className="grid gap-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className="shadow-xl border border-inherit w-[200px] h-[250px] rounded-xl"
          >
            <Link href={`/pokemons/${pokemon.id}`}>
              <div className="flex flex-col items-center mt-8">
                <p className="text-l font-semibold">{pokemon.korean_name}</p>
                <p>({pokemon.name})</p>
                <img
                  className="w-[120px] h-[120px]"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
                <p>도감번호 {pokemon.id}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
