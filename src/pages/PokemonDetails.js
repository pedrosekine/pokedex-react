import { Grid, ImageList, ImageListItem, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
  const [types, setTypes] = useState([]);
  const [pageCounter, setPageCounter] = useState(0)


  const params = useParams();

  useEffect(() => {
    updatePokemonDetails();
  }, []);

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
    
    defineImages(sprites);
    defineStats(stats);
    defineTypes(types);
    setPageCounter(Math.ceil(moves.length/10))
  
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
    setTypes(types);
  }

  const defineStats = (stats) => {
    setStats(stats);
  };
  
  const handleChangePage = (event, page) => {
    console.log("entrou no changePage, testando pageCounter", pageCounter)
  }

  return (
    <MainContainer>
      <UpperMenu />
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
                display: "flex",
                justifyContent: "space-around",
                padding: "1rem",
                marginBottom: "1em",
              }}
            >
              {" "}
              {types.length !== 0 ? (
                <>
                  <Typography>{types[0].type.name}</Typography>
                  <Typography>{types[1].type.name}</Typography>
                </>
              ) : (
                "loading"
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
              <Typography>Move 1</Typography>
              <Typography>Move 2</Typography>
              <Typography>Move 3</Typography>
              <Typography>Move 4</Typography>
              <Typography>Move 5</Typography>
              <Typography>Move 6</Typography>
              <Pagination onChange={handleChangePage} count={pageCounter} shape="rounded" sx={{margin: "4rem 0"}} />

            </Paper>
          </Box>
        </Grid>
      </Grid>
    </MainContainer>
  );
};
