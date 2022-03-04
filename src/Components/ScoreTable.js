import React from 'react'

import '../styles/ScoreTable.css'

export const ScoreTable = (score) => {
    return (
        <div className = 'ScoreTable'>
            <div id = 'score_text' > SCORE </div>
            <div id = 'score_number'> 000 </div>
        </div>
    )
}
