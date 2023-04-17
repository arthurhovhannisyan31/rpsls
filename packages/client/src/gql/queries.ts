import { errorsFragment } from "src/gql/fragments";

export const queryMe = (): QueryProps => ({
  query: `
    query {
      me {
        data{
          name
        }
        ${errorsFragment}
      }
    }  
  `
});

export const queryRooms = (): QueryProps => ({
  query: `
    query {
      rooms {
        data {
          _id
          name
          active
          open
          roomType
          host {
            name
          }
          guest{
            name
          }
        }
        ${errorsFragment}
      }
    }  
  `
});
