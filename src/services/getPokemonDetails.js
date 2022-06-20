import axios from "axios";

export const getPokemonDetails = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;

  try {
    const response = await axios.get(url);
    // console.log("response do getPokemonDetails", response.data);
    const {
      abilities,
      forms,
      height,
      id,
      moves,
      name,
      species,
      sprites,
      stats,
      types,
      weight,
    } = response.data;

    return response.data
  } catch (error) {
    console.log(error);
    alert("Error trying to get Pokemon details. Please try again.");
  }
};
