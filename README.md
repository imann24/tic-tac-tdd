# Tic-Tac-TDD
The game of Tic-Tac-Toe, written using [Test Driven Development](https://www.freecodecamp.org/news/test-driven-development-what-it-is-and-what-it-is-not-41fa6bca02a2/)

[![](https://github.com/imann24/tic-tac-tdd/workflows/Tests/badge.svg)](https://github.com/imann24/tic-tac-tdd/actions)
[![Coverage Status](https://coveralls.io/repos/github/imann24/tic-tac-tdd/badge.svg?branch=develop)](https://coveralls.io/github/imann24/tic-tac-tdd?branch=develop)

## Setup
1. Install `yarn` package manager: https://yarnpkg.com
1. `yarn install`

## Commands
1. `yarn test` -- runs all tests
1. `yarn build` -- build as a static web page
1. `yarn dev` -- run a dev server which rebuilds on changes
1. `yarn start` -- runs a web server against the build folder (must run `yarn build` first)

## Docker Setup
1. Install `docker`: https://www.docker.com/get-started
1. `docker build . -t tic-tac-tdd`

## Docker Commands
1. `docker run tic-tac-tdd yarn test` -- runs all tests
