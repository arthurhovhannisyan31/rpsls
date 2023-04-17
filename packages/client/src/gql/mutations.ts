import { errorsFragment } from "src/gql/fragments";
import { MutationLoginArgs } from "src/models/generated";

export const mutationLogin = ({ name }:MutationLoginArgs): QueryProps => ({
  query: `
    mutation mutationLogin($name: String!) {
        login(name: $name){
            data {
                name
            }
            ${errorsFragment}
        }
    }
  `,
  variables: {
    name
  }
});

export const mutationLogout = (): QueryProps => ({
  query: `
    mutation {
    logout {
        data
        ${errorsFragment}
      }
    }  
  `
});
