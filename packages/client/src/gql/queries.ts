import { errorsFragment } from "src/gql/fragments";
import { QueryRoomArgs } from "src/models/generated";

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

export const queryRoom = ({ _id }: QueryRoomArgs): QueryProps => ({
  query: `
    query room($_id: String!){
      room(_id: $_id){
        data {
          _id
          name
          active
          open
          roomType
          guest{
              name
          }
          host{
              name
          }
        }
        ${errorsFragment}
      }
    }
  `,
  variables:{
    _id
  }
});
