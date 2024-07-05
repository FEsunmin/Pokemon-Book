"use client";

import PokemonList from "../components/PokemonList";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Home() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <PokemonList />
      </QueryClientProvider>
    </div>
  );
}
