import React, { Component } from 'react'
import moment from 'moment'
import { Accordion, AccordionItem, SwitchField, OutlinedButton, AsyncAutocompleteField } from 'luna-react'
import './Results'

const { Search } = require('luna-icons')

class SearchArea extends Component {
  constructor (props) {
    super(props)
    this.state = { value: '', showHFC: false, openNow: false, loading: false }
    this.onClick = this.onClick.bind(this)
    this.searchStores = this.searchStores.bind(this)
    this.selectStore = this.selectStore.bind(this)
    this.onChangeHFC = this.onChangeHFC.bind(this)
  }

  async onClick () {
    if (this.state.value === '') {
      return
    }
    this.props.setLoading()
    const response = await fetch(`https://api.stores.sainsburys.co.uk/v1/stores/${this.state.value}`)
    await response.json().then(data => this.props.updateStore(data))
  }

  onChangeHFC (event) {
    if (event.currentTarget.id === 'switchField-hotFood') {
      this.setState({ showHFC: !this.state.showHFC })
    } else {
      this.setState({ openNow: !this.state.openNow })
    }
  }

  searchStores (event) {
    this.setState({ selectedStore: event.target.value })
  }

  selectStore (event) {
    if (event === null) {
      return
    }
    this.setState({ value: event.value })
  }

  render () {
    const openNow = moment().format('YYYY-MM-DD HH:mm')

    const loadOptions = async value => {
      let url = `https://api.stores.sainsburys.co.uk/v1/stores/?complete=${value}`
      if (this.state.showHFC === true) {
        url = `https://api.stores.sainsburys.co.uk/v1/stores/?complete=${value}&facility=Hot+Food+Counter`
      }
      if (this.state.openNow === true) {
        url = `https://api.stores.sainsburys.co.uk/v1/stores/?complete=${value}&open_at=${openNow}`
      }
      if (this.state.openNow && this.state.showHFC === true) { url = `https://api.stores.sainsburys.co.uk/v1/stores/?complete=${value}&facility=Hot+Food+Counter&open_at=${openNow}` }
      return fetch(url)
        .then(response => response.json())
        .then(response =>
          response.results.map(item => ({
            label: item.other_name,
            value: item.code
          }))
        )
    }

    return (
      <Accordion multipleOpen titleElement="h3">
        <AccordionItem className="Containers" title="Search Sainsbury's Stores">

          <p className="Search">Search Sainsbury's Stores:</p>

          <SwitchField
            name="switchField"
            className="Switch"
            onChange={this.onChangeHFC}
            listType="inline"
            options={[
              { value: 'hotFood', label: 'Hot Food Counters' },
              { value: 'openStoreNow', label: 'Stores Open Now' }] } />

          <AsyncAutocompleteField
            name="async-autocomplete-field-1"
            label=""
            placeholder="Search Sainsbury's Stores..."
            loadOptions={loadOptions}
            onChange={this.searchStores}
            onSelect={this.selectStore}
            minChars={3} />

          <OutlinedButton
            className="SearchButton"
            onClick={this.onClick}>
            <Search /> Search
          </OutlinedButton>
        </AccordionItem>
      </Accordion>
    )
  }
}

export default SearchArea
