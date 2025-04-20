import { gql } from "@apollo/client";

// Character queries
export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
      }
      location {
        id
        name
        type
        dimension
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
      created
    }
  }
`;
