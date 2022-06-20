//🟡 Vou usar um useEffect para fazer o primeiro loading da página. Ao mesmo tempo, ela precisa atualizar todas as vezes que
// a Pokédex atualiza. Por isso, na Array condicional, vou precisar colocar o valor da Pokédex.
// Por enquanto, enquanto a lógica não está pronta, vou deixar isso esperando

// 🟡 Para paginação, vai ser importante ter Path Params na Home para conseguir visualizar em que página estou e
// quantos itens estou visualizando por página. Isso porque a API do PokeAPI lida bem com esses dois dados.

import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PokemonCard } from "../components/PokemonCard";
import { UpperMenu } from "../components/UpperMenu";
import { getPokemonList } from "../services/getPokemonList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`


export const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonComponent, setPokemonComponent] = useState();
  const [pokemonCount, setPokemonCount] = useState(0);
  const [pageCounter, setPageCounter] = useState(0)

  useEffect(() => {
    updateHomePage();
  }, []);

  const updateHomePage = async () => {
    const request = await getPokemonList();
    setPokemonList(request.data.results);
    buildPokemonCard(request.data.results);
    setPokemonCount(request.data.count);
    // console.log("o que está indo para pokemonList só para ver", request.data)
    setPageCounter(Math.ceil(request.data.count/20))
    // console.log(Math.ceil(request.data.count/20))
  };

  const buildPokemonCard = (arrayPokemon) => {
    const pokemonListComponent = arrayPokemon.map((pokemon) => {
      // console.log("o que é que tem no objeto pokemon", pokemon) ✅ name and url
      return <PokemonCard key={pokemon.url} pokemon={pokemon} />;
    });
    setPokemonComponent(pokemonListComponent);
    // console.log("o que está indo para o pokemonComponent", pokemonListComponent)
  };

  const handleChangePage = async (event, page) => {

    const request = await getPokemonList(20, (page-1)*20);
    setPokemonList(request.data.results);
    buildPokemonCard(request.data.results);
    // setPokemonCount(request.data.count);
    // console.log("o que está indo para pokemonList só para ver", request.data)
    // setPageCounter(Math.ceil(request.data.count/20))
  }

  return (
    <div>
      <UpperMenu />
      <HomeContainer>
        <Grid container spacing={4} sx={{ width: 1 }}>
          {pokemonComponent}
        </Grid>
        <Pagination onChange={handleChangePage} count={pageCounter} shape="rounded" sx={{margin: "4rem 0"}} />
      </HomeContainer>
    </div>
  );
};
