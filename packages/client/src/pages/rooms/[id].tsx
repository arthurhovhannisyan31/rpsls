import { memo } from "react";

export interface GameProps {}

export const Game = memo<GameProps>(() => {
  return(
      <div>
        game page
      </div>
  )
})

Game.displayName = "Game"

// getServerSideProps - room
