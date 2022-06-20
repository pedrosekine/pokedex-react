import React from "react";
import { Route, Routes, useParams } from "react-router";
import { Home } from "../pages/Home";
import { Pokedex } from "../pages/Pokedex";
import { PokemonDetails } from "../pages/PokemonDetails";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokedex" element={<Pokedex />} />
      <Route path="/details/:name" element={<PokemonDetails />} />
    </Routes>
  );
};
