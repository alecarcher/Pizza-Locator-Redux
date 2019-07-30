import React, {Component} from 'react'
import {Card} from 'luna-react'
import { withLabel, Sainsburys } from 'luna-images'
import Time from 'react-time'
import Clock from 'react-live-clock'

const SainsburysLogo = withLabel(Sainsburys)

class Title extends Component {

    render() {
        
        let now = new Date()

            return (
                <Card className="Logo">
                    <SainsburysLogo label="Sainsburys Group plc" width="320px" />

                    <p className="Subtitle">Pizza Locator</p>

                    <p className="Date">
                        <Time value={now} format="dddd Do MMMM YYYY" /> <br />
                        <Clock format={'h:mm A'} ticking={true} timezine={'US/Pacific'} /> <br />
                        JavaScript Version
                    </p>
                </Card>
        )
    }
}

export default Title