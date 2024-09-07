/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getThing = /* GraphQL */ `
  query GetThing($id: ID!) {
    getThing(id: $id) {
      content
      createdAt
      id
      img_url
      owner
      status
      title
      updatedAt
      __typename
    }
  }
`;
export const listThings = /* GraphQL */ `
  query ListThings(
    $filter: ModelThingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        content
        createdAt
        id
        img_url
        owner
        status
        title
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
