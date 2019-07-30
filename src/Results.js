import React, { Component } from 'react'
import { Accordion, AccordionItem, ProgressIndicator, ProgressBar, TableContainer, TableBody, TableRow, TableCell, TableHeaderRow, TableHeaderCell } from 'luna-react'

import Clock from 'react-live-clock'
import './Search'

class Result extends Component {
  displayOpeningTimes () {
    const weekday = new Array(7)
    weekday[0] = 'Monday'
    weekday[1] = 'Tuesday'
    weekday[2] = 'Wednesday'
    weekday[3] = 'Thursday'
    weekday[4] = 'Friday'
    weekday[5] = 'Saturday'
    weekday[6] = 'Sunday'

    const list =
            this.props.openingHours.map((openingSlot) =>
              <TableRow key={openingSlot.day}>
                <TableCell> {weekday[openingSlot.day]} </TableCell>
                <TableCell> {openingSlot.start_time} - {openingSlot.end_time} </TableCell>
              </TableRow>
            )
    return list
  }

  render () {
    return (
      <Accordion>
        <AccordionItem className="Containers" title="Search Results">
          <div>
            <p className="Search">Search Results:</p>

            { this.props.loading === false &&
            <div>
              { this.props.storeName !== '' ? <div>
                <TableContainer className="LocalTable">
                  <TableBody>
                    { this.props.storeName !== '' &&
                      <TableRow>
                        <TableCell> Store Name: </TableCell>
                        <TableCell> {this.props.storeName}</TableCell>
                      </TableRow> }

                    { this.props.storeAddress !== '' &&
                      <TableRow>
                        <TableCell> Store Address: </TableCell>
                        <TableCell> {this.props.storeAddress} </TableCell>
                      </TableRow> }

                    { this.props.storeCity !== '' &&
                      <TableRow>
                        <TableCell> Store Town/City: </TableCell>
                        <TableCell> {this.props.storeCity} </TableCell>
                      </TableRow> }

                    { this.props.storeCountry !== '' &&
                      <TableRow>
                        <TableCell> Store Country: </TableCell>
                        <TableCell> {this.props.storeCountry} </TableCell>
                      </TableRow> }

                    { this.props.storePostCode !== '' &&
                      <TableRow>
                        <TableCell> Store Post Code: </TableCell>
                        <TableCell> {this.props.storePostCode} </TableCell>
                      </TableRow> }

                    { this.props.storeTelephone !== '' &&
                      <TableRow>
                        <TableCell> Store Telephone Number: </TableCell>
                        <TableCell> {this.props.storeTelephone} </TableCell>
                      </TableRow> }

                    { this.props.storeManager !== '' &&
                      <TableRow>
                        <TableCell> Store Manager: </TableCell>
                        <TableCell> {this.props.storeManager} </TableCell>
                      </TableRow> }

                  </TableBody>
                </TableContainer> <br/>

                <p className="Time">Current Time- <Clock format={'HH:mm'} ticking={true} timezine={'US/Pacific'} /> <br /></p>

                <TableContainer className="Table">
                  <TableBody>
                    <TableHeaderRow>
                      <TableHeaderCell>Week Days: </TableHeaderCell>
                      <TableHeaderCell>Opening Hours: </TableHeaderCell>
                    </TableHeaderRow>
                    {this.displayOpeningTimes()}
                  </TableBody>
                </TableContainer>

              </div> : <div>
                <h6 className="NoResults"> No Search Results! </h6>
                <p className="NoResults"> Use search area to search for any Sainsbury's store and results will be shown here. </p>
              </div> }
            </div> }

            { this.props.loading === true && <div>
              <ProgressIndicator loading preventFocus>
                <ProgressBar className="ln-u-push-bottom-sm" />
                <ProgressBar small />
              </ProgressIndicator>
              <h3 className="Loading"> ...LOADING... </h3>
            </div> }
          </div>
        </AccordionItem>
      </Accordion>
    )
  }
}

export default Result
