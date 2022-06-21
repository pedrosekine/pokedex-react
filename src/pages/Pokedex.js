import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PokemonCard } from "../components/PokemonCard";
import { UpperMenu } from "../components/UpperMenu";
import { GlobalStateContext } from "../global/GlobalStateContext";
import Pokeball from "../images/pokeball.jpg";

const EmptyPokedexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0;
`;

const EmptyPokedexText = styled.h3`
  margin: 3rem 0;
`;

const PokedexContainer = styled.div`
  margin: 2rem;
`

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

  const emptyPokedex = (
    <EmptyPokedexContainer>
      <img src={Pokeball} />
      <EmptyPokedexText>
        Your Pokédex is empty. Try adding some Pokémons to it!
      </EmptyPokedexText>
    </EmptyPokedexContainer>
  );

  return (
    <div>
      <UpperMenu />
      {states.pokedex.length !== 0 ? (
        <PokedexContainer>
          <Grid container spacing={2}>
            {" "}
            {pokemonCards}{" "}
          </Grid>
        </PokedexContainer>
      ) : (
        emptyPokedex
      )}
      <Grid container spacing={2}></Grid>
    </div>
  );
};
