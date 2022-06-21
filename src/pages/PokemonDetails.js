import {
  Button,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UpperMenu } from "../components/UpperMenu";
import styled from "styled-components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, flexbox } from "@mui/system";
import { getPokemonDetails } from "../services/getPokemonDetails";
import { GlobalStateContext } from "../global/GlobalStateContext";

const TitleContainer = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
`
const TitlePokemon =styled.h1`
  margin: 2rem 2rem;
`

const PokemonImages = styled.img`
  margin: 1rem;
  height: 15rem;
  object-fit: cover;
  border-radius: 0.5rem;
  /* background-color: aliceblue; */
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TesteHone = styled.h1``;

export const PokemonDetails = () => {
  const [imageComponent, setimageComponent] = useState();
  const [stats, setStats] = useState([]);
  const [typesComponent, setTypesComponent] = useState();
  const [pageCounter, setPageCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [movesState, setMovesState] = useState([]);
  const [moveComponent, setMoveComponent] = useState();

  const [details, setDetails] = useState({});
  const [alreadyOnPokedex, setAlreadyOnPokedex] = useState(Boolean);

  const params = useParams();

  useEffect(() => {
    updatePokemonDetails();
    // função para verificar se pokemon já está na pokedex 🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴
    alreadyOnPokedexCheck();
  }, []);

  const { states, setters } = useContext(GlobalStateContext);
  const { setPokedex } = setters;

  const updatePokemonDetails = async () => {
    const response = await getPokemonDetails(params.name);
    console.log("response getPokemonDetails", response);
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
    } = response;
    organizeDetails(response);

    defineImages(sprites);
    defineStats(stats);
    defineTypes(types);
    setPageCounter(Math.ceil(moves.length / 10));
    setMovesState(moves);
    movesComponentBuilder(currentPage, moves);
  };

  const organizeDetails = (data) => {
    setDetails(data);
  };

  const defineImages = (sprites) => {
    const imageArray = [
      {
        img: sprites.front_default,
        title: "Front Default",
      },
      {
        img: sprites.back_default,
        title: "Front Default",
      },
    ];

    const imageComponentConstruction = imageArray.map((item) => (
      <ImageListItem key={item.img}>
        <PokemonImages
          src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
        />
      </ImageListItem>
    ));

    setimageComponent(imageComponentConstruction);
  };

  const defineTypes = (types) => {
    const TypesComponentContruction = types.map((type) => {
      console.log("type.name", type.type.name);
      return <Typography>{type.type.name}</Typography>;
    });
    setTypesComponent(TypesComponentContruction);
  };

  const defineStats = (stats) => {
    setStats(stats);
  };

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
    movesComponentBuilder(page);
    // console.log("entrou no changePage, testando pageCounter", page);
  };

  const movesComponentBuilder = (page, movesArgument) => {
    if (!movesArgument) {
      movesArgument = movesState;
    }
    const movesManipulation = movesArgument
      .filter((move, index) => {
        const upperLimit = page * 10;
        const lowerLimit = upperLimit - 10;
        if (lowerLimit <= index && index < upperLimit) {
          return true;
        }
      })
      .map((move) => {
        return (
          <Typography key={move.move.url} margin="0.5rem 0">
            {move.move.name}
          </Typography>
        );
      });
    console.log("movesComponentBuilder", movesManipulation);
    setMoveComponent(movesManipulation);
  };

  const handleAddToPokedex = () => {
    // console.log("setters para entender", setters);
    // console.log("states.pokedex para entender", states.pokedex);
    setPokedex([...states.pokedex, details]);
    setAlreadyOnPokedex(true);

    // console.log("states para entender",states.pokedex)
  };

  const handleRemoveFromPokedex = () => {
    const filteredPokedex = states.pokedex.filter((pokemon) => {
      return pokemon.name !== params.name;
    });

    setPokedex(filteredPokedex);
    setAlreadyOnPokedex(false);
  };

  const alreadyOnPokedexCheck = () => {
    const arrayComparison = states.pokedex.filter((pokemon) => {
      return pokemon.name === params.name;
    });
    if (arrayComparison.length !== 0) {
      setAlreadyOnPokedex(true);
    }
  };

  return (
    <MainContainer>
      <UpperMenu />
      <TitleContainer>
        <TitlePokemon>{params.name}</TitlePokemon>
        {!alreadyOnPokedex ? (
          <Button variant="outlined" onClick={handleAddToPokedex} size="small">
            Add to Pokedex
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={handleRemoveFromPokedex}
            size="small"
            color="error"
          >
            Remove From Pokedex
          </Button>
        )}
      </TitleContainer>

      <Grid
        container
        spacing={2}
        sx={{ margin: "2rem", justifyContent: "center" }}
      >
        <Grid item xs={10} sm={5} md={5} lg={3} xl={3}>
          <ImageList
            component={Paper}
            sx={{ height: 600 }}
            cols={1}
            rows={2}
            // rowHeight={225}
          >
            {imageComponent ? imageComponent : "loading"}
          </ImageList>
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3} xl={3}>
          <TableContainer component={Paper}>
            <Table
              // sx={{ minWidth: 100  }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h5">Stats</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h5">Value</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.length !== 0
                  ? stats.map((row) => (
                      <TableRow
                        key={row.stat.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.stat.name}
                        </TableCell>
                        <TableCell align="right">{row.base_stat}</TableCell>
                      </TableRow>
                    ))
                  : "loading"}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={10} sm={5} md={5} lg={3} xl={3}>
          <Box display="flex" flexDirection="column">
            <Paper
              sx={{
                padding: "1rem",
                margin: "1rem 0",
              }}
            >
              <Typography
                textAlign="center"
                variant="h5"
                sx={{ marginBottom: "2rem" }}
              >
                Types
              </Typography>
              {!typesComponent ? (
                "loading"
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {typesComponent}
                </Box>
              )}
            </Paper>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" marginBottom="1rem">
                Moves
              </Typography>
              {!moveComponent ? <div>loading</div> : moveComponent}
              {/* <Typography>Move 1</Typography>
              <Typography>Move 2</Typography>
              <Typography>Move 3</Typography>
              <Typography>Move 4</Typography>
              <Typography>Move 5</Typography>
              <Typography>Move 6</Typography> */}
              <Pagination
                size="small"
                onChange={handleChangePage}
                count={pageCounter}
                shape="rounded"
                sx={{ margin: "4rem 0" }}
                hideNextButton={true}
                hidePrevButton={true}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </MainContainer>
  );
};
