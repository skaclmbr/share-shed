/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createThing = /* GraphQL */ `
  mutation CreateThing(
    $condition: ModelThingConditionInput
    $input: CreateThingInput!
  ) {
    createThing(condition: $condition, input: $input) {
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
export const deleteThing = /* GraphQL */ `
  mutation DeleteThing(
    $condition: ModelThingConditionInput
    $input: DeleteThingInput!
  ) {
    deleteThing(condition: $condition, input: $input) {
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
export const updateThing = /* GraphQL */ `
  mutation UpdateThing(
    $condition: ModelThingConditionInput
    $input: UpdateThingInput!
  ) {
    updateThing(condition: $condition, input: $input) {
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
