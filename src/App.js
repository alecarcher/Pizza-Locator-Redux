import React, { Component } from 'react'
import './Main.css'

import Title from './Title'
import Search from './Search'
import Result from './Results'
import Local from './Local'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      storeName: '',
      storeAddress: '',
      storeCity: '',
      storeCountry: '',
      storePostCode: '',
      storeTelephone: '',
      storeManager: '',
      openingHours: [],
      search: [],
      loading: false
    }
    this.updateStoreInfo = this.updateStoreInfo.bind(this)
    this.getMultipleStores = this.getMultipleStores.bind(this)
    this.setLoading = this.setLoading.bind(this)
  }

  updateStoreInfo (storeData) {
    this.setState({
      storeName: storeData.store.name,
      storeAddress: storeData.store.contact.address1,
      storeCity: storeData.store.contact.city,
      storeCountry: storeData.store.contact.country,
      storePostCode: storeData.store.contact.post_code,
      storeTelephone: storeData.store.contact.telephone,
      storeManager: storeData.store.contact.manager,
      openingHours: storeData.store.opening_times })
    this.setState({ loading: false })
  }

  setLoading () {
    this.setState({ loading: true })
  }

  getMultipleStores (data) {
    this.setState({ stores: data.results.map((store) =>
      <div key={store.code}>
        <li>  {store.other_name}</li>
        <li > {store.code}</li>
      </div>
    ) })
  }

  render () {
    return (
      <div>
        <Title />
        <Search
          updateStore = {this.updateStoreInfo}
          updateMultiple = {this.getMultipleStores}
          setLoading = {this.setLoading}
        />

        <Result
          storeName={this.state.storeName}
          storeAddress={this.state.storeAddress}
          storeCity={this.state.storeCity}
          storeCountry={this.state.storeCountry}
          storePostCode={this.state.storePostCode}
          storeTelephone={this.state.storeTelephone}
          storeManager={this.state.storeManager}
          openingHours={this.state.openingHours}
          loading={this.state.loading}
        />

        <Local />
      </div>
    )
  }
}

export default App
