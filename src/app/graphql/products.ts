import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      title
      price
      description
      images
      category {
        id
        name
        image
      }
    }
  }
`;
export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;


export const AUTH_WITH_JWT_TOKEN = gql`
  mutation AuthWithJwtToken($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;
