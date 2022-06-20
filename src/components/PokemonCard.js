import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { getPokemonDetails } from "../services/getPokemonDetails";

import { GlobalStateContext } from "../global/GlobalStateContext";

export const PokemonCard = (props) => {
  const [details, setDetails] = useState({});
  const [thumbnail, setThumbnail] = useState("");
  const [moves, setMoves] = useState([]);
  const [bodyText, setBodyText] = useState("");
  const [alreadyOnPokedex, setAlreadyOnPokedex] = useState(false);

  useEffect(() => {
    organizeCardData();
  }, []);

  const navigate = useNavigate();

  const { states, setters } = useContext(GlobalStateContext);
  const { setPokedex } = setters;

  const { name, url } = props.pokemon;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const goToDetails = () => {
    navigate(`/details/${name}`, { replace: true });
  };

  const organizeCardData = async () => {
    const response = await getPokemonDetails(name);
    organizeDetails(response);
    organizeThumbnails(response);
    setMoves(response.moves);
    generateBodyText(response);
    // console.log("Response.data.sprites.other[official-artwork][front_default] para entender", response.data.sprites.other["official-artwork"]["front_default"])
  };

  const organizeThumbnails = (data) => {
    setThumbnail(data.sprites.other["official-artwork"]["front_default"]);
  };

  const organizeDetails = (data) => {
    setDetails(data);
  };

  const generateBodyText = (data) => {
    // console.log("data", data)
    setBodyText(
      `${capitalName}s weight around ${data.weight / 10}kg and are usually
      ${data.height / 10}m tall. Their base experience is
      ${data["base_experience"]}xp and they can learn up until
      ${data.moves.length} moves.`
    );
  };

  const capitalName = capitalizeFirstLetter(name);

  const handleAddToPokedex = () => {
    // console.log("setters para entender", setters);
    // console.log("states.pokedex para entender", states.pokedex);
    setPokedex([...states.pokedex, details]);
    // console.log("states para entender",states.pokedex)
  };

  const handleRemoveFromPokedex = () => {
    const filteredPokedex = states.pokedex.filter((pokemon) => {
      return pokemon.name !== name;
    });

    setPokedex(filteredPokedex)
    setAlreadyOnPokedex(false);

  };

  for (const pokedexPokemon of states.pokedex) {
    if (!alreadyOnPokedex && pokedexPokemon.name === name) {
      setAlreadyOnPokedex(true);
      // console.log("Já está na POKEDEX!!!!!");
    }
  }

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={4}
      lg={3}
      xl={2}
      // sx={{ display: { xs: "10", sm: 10, md: 6, lg: "4", xl: "3" } }}
    >
      <Card
        sx={
          {
            // maxWidth: "sm",
          }
        }
      >
        <CardMedia
          component="img"
          height="200px"
          image={thumbnail}
          alt={`${name} image`}
          sx={{
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {capitalName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {bodyText ? bodyText : "loading"}
          </Typography>
        </CardContent>
        <CardActions>
          {!alreadyOnPokedex ? (
            <Button onClick={handleAddToPokedex} size="small">
              Add to Pokedex
            </Button>
          ) : (
            <Button onClick={handleRemoveFromPokedex} size="small" color="error">
              Remove From Pokedex
            </Button>
          )}

          <Button onClick={goToDetails} size="small">
            Pokemon Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
