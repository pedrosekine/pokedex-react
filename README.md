# Pokédex

A React single-page app for browsing Pokémon and keeping your own Pokédex, built on the public [PokéAPI](https://pokeapi.co/).

Built in June 2022 during the [Labenu](https://www.labenu.com.br/) full-stack web development bootcamp (module 4, front-end). The code is kept as it was delivered; only this README was added later. Commit messages and some identifiers are in Portuguese.

## What it does

- **Home**: paginated list of Pokémon cards, loaded from PokéAPI (20 per page).
- **Add / remove**: add a Pokémon to your Pokédex (or remove it) from its card or its details page.
- **Pokédex page**: the Pokémon you've added.
- **Details page**: sprites, base stats in a table, types and moves for a single Pokémon.

State is shared through React Context (`src/global/`), not persisted: a reload empties the Pokédex.

## Stack

React 18 (Create React App) · React Router 6 · Material UI 5 · styled-components · axios

## Project structure

```
src/
  pages/        Home, Pokedex, PokemonDetails
  components/   PokemonCard, UpperMenu
  services/     getPokemonList, getPokemonDetails (PokéAPI calls)
  global/       GlobalState + context (caught Pokémon)
  routes/       Router
```

## Run it locally

```bash
npm install
npm start
```

Opens on http://localhost:3000. No API key needed: PokéAPI is public.

## Demo

The original surge.sh deployment is offline.

## Known limitations

Left as delivered, bootcamp-era code:

- The Pokédex lives in memory only (no `localStorage`).
- Errors are reported with `alert()`, and some `console.log` calls remain.
- The Create React App test files are the untouched defaults.
