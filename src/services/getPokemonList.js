import axios from "axios";

export const getPokemonList = async (limit, offset) => {
  if (!limit) {
    limit = 20;
  }
  if (!offset) {
    offset = 0;
  }

  const URL = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  try {
    const response = await axios.get(URL);
    console.log("getPokemonList Response", response);
    return response
  } catch (error) {
    console.log("error at getPokemonLlist", error);
    alert("Pokemon List couldn't be loaded. Please try again.");
  }
};
