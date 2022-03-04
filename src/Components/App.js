import React from 'react'

import '../styles/App.css'
import { GameTitle } from './GameTitle'
import { Grid } from './Grid'
import { MobileButtonsSet } from './MobileButtonsSet'
import { ScoreTable } from './ScoreTable'



export const App = (score) => {
    return (
        <>
            <Grid/>
            <ScoreTable score = {score}/>
            <GameTitle/>
            <MobileButtonsSet/>
        </>
    )
}
