//componants capitalized
//ES7 snippets then type rfce (react functional componant with an export)
// Card element from Material UI. textSecondary look up differernt fonts in docs

import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core' // CardContent gives white,clean background. Typography fancy text

function InfoBox({ title, cases, total }) {  //each box has title, how many cases increased, and total cases
    return ( 
        <Card className="infoBox">
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary"> 
                    {title} 
                </Typography>
                
                <h2 className="infoBox__cases">{cases}</h2>

                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>    
        </Card>
    )
}

export default InfoBox
