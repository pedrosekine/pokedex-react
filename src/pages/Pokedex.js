import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PokemonCard } from "../components/PokemonCard";
import { UpperMenu } from "../components/UpperMenu";
import { GlobalStateContext } from "../global/GlobalStateContext";

export const Pokedex = () => {
  const [pokemonCards, setPokemonCards] = useState();
  const { states } = useContext(GlobalStateContext); // esse teste está funcionando! ✅


  useEffect(() => {
    buildPokemonCards();
  }, [states.pokedex]);


  const teste = JSON.stringify(states.pokedex);

  const buildPokemonCards = () => {
    const components = states.pokedex.map((pokemon) => {
      const propsToSend = {
        name: pokemon.name,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
      };
      return <PokemonCard key={pokemon.id} pokemon={propsToSend} />;
    });
    setPokemonCards(components);
  };

  return (
    <div>
      <UpperMenu />
      <p>Pokedex Page</p>
      <Grid container spacing={2}>
        {states.pokedex.length !== 0 ? pokemonCards : "states está vazio"}
      </Grid>
      <Grid container spacing={2}></Grid>
    </div>
  );
};
