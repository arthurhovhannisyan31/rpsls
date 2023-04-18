import { errorsFragment } from "src/gql/fragments";
import {
  MutationCreateRoomArgs,
  MutationLoginArgs, MutationRoundEndArgs, MutationRoundPlayArgs,
  MutationRoundStartArgs,
  MutationUpdateRoomArgs
} from "src/models/generated";

export const mutationLogin = ({ name }:MutationLoginArgs): QueryProps => ({
  query: `
    mutation login($name: String!){
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

export const mutationCreateRoom = ({ roomType, name }: MutationCreateRoomArgs): QueryProps => ({
  query: `
    mutation createRoom($name: String!, $roomType: String!) {
      createRoom(name: $name, roomType: $roomType) {
        data {
          _id
          name
          active
          open
        }
        ${errorsFragment}
      }
    }
  `,
  variables: {
    name,
    roomType
  }
});

export const mutationUpdateRoom = ({ _id, action }: MutationUpdateRoomArgs): QueryProps => ({
  query: `
    mutation updateRoom($_id: String!, $action: RoomUpdateAction!){
      updateRoom(_id: $_id, action: $action) {
        data {
            _id
            active
            open
            name
            guest {
                name
            }
            host {
                name
            }
            roomType
        }
        ${errorsFragment}
      }
    }
`,
  variables: {
    _id,
    action
  }
});

export const mutationRoundStart = ({ room }: MutationRoundStartArgs): QueryProps => ({
  query: `
    mutation roundStart($room: String!) {
      roundStart(room: $room){
        data{
          _id
          room{
              roomType
          }
          host{
              user{
                  name
              }
              choice
          }
          guest{
              user{
                  name
              }
              choice
          }
          winner {
              name
          }
        }
        ${errorsFragment}
      } 
    }
  `,
  variables: {
    room,
  }
});

export const mutationRoundPlay = ({ _id, choice }: MutationRoundPlayArgs): QueryProps => ({
  query: `
    mutation roundPlay($_id: String!, $choice: ChoiceEnum!){
      roundPlay(_id: $_id, choice: $choice) {
        data{
          _id
          host{
            user{
              name
            }
            choice
          }
          guest{
            user{
              name
            }
            choice
          }
          room{
            name
          }
          winner{
            name
          }
        }
        ${errorsFragment}
      }
    }
  `,
  variables: {
    _id,
    choice
  }
});

export const mutationRoundEnd = ({ _id }: MutationRoundEndArgs): QueryProps => ({
  query: `
    mutation roundEnd($_id: String!){
      roundEnd(_id: $_id){
        data{
            _id
            ended
            guest{
                choice
                user{
                    name
                }
            }
            host{
                choice
                user{
                    name
                }
            }
            winner{
                name
            }
        }
        ${errorsFragment}
      }
    }  
  `,
  variables: {
    _id,
  }
});
