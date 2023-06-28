import React, { useState } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api'
import PropTypes from 'prop-types'

const mapContainerStyle = {
  height: '400px',
  width: '100%',
  borderRadius: '5px',
}

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

class LoadScriptOnlyIfNeeded extends LoadScript {
  componentDidMount() {
    const cleaningUp = true
    const isBrowser = typeof document !== 'undefined' // require('@react-google-maps/api/src/utils/isbrowser')
    const isAlreadyLoaded =
      window.google && window.google.maps && document.querySelector('body.first-hit-completed') // AJAX page loading system is adding this class the first time the app is loaded
    if (!isAlreadyLoaded && isBrowser) {
      // @ts-ignore
      if (window.google && !cleaningUp) {
        console.error('google api is already presented')
        return
      }

      this.isCleaningUp().then(this.injectScript)
    }

    if (isAlreadyLoaded) {
      this.setState({ loaded: true })
    }
  }
}

const calculator = function (markers, numStyles) {
  var index = 0
  var count = markers.length
  var dv = count
  while (dv !== 0) {
    dv = parseInt(dv / 10, 10)
    index++
  }

  index = Math.min(index, numStyles)
  return {
    text: count,
    index: index,
  }
}

const Map = (props) => {
  const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  // const libraries = ["places"];

  const { locations } = props
  const [, setInfoWindowOpen] = useState(false)

  // Tính toán tọa độ trung tâm
  let center = { lat: 10.777754679899761, lng: 106.69530456241897 }
  if (locations.length > 0) {
    const sumLat = locations.reduce((sum, coord) => sum + coord.lat, 0)
    const sumLng = locations.reduce((sum, coord) => sum + coord.lng, 0)
    const avgLat = sumLat / locations.length
    const avgLng = sumLng / locations.length
    center = { lat: avgLat, lng: avgLng }
  }

  const handleOpenInfoWindow = (cluster) => {
    // infoWindow.setContent(`Current Cluster Length: ${cluster.markers.length}`)
    setInfoWindowOpen(true)
  }

  const handleCloseInfoWindow = (cluster) => {
    setInfoWindowOpen(false)
  }

  return (
    <LoadScriptOnlyIfNeeded
      id="script-loader"
      googleMapsApiKey={key}
      // libraries={libraries}
      language={'vi'}
      region={'vi'}
    >
      <GoogleMap id="marker-example" mapContainerStyle={mapContainerStyle} zoom={6} center={center}>
        <MarkerClusterer
          options={options}
          minimumClusterSize={5}
          calculator={calculator}
          onMouseOver={(cluster) => handleOpenInfoWindow(cluster)}
          onMouseOut={(cluster) => handleCloseInfoWindow(cluster)}
        >
          {(clusterer) =>
            locations.length &&
            locations.map((location, idx) => (
              <Marker key={idx} position={location} clusterer={clusterer}>
                {/* <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
                  <h1>Hi I am Info Window</h1>
                </InfoWindow> */}
              </Marker>
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScriptOnlyIfNeeded>
  )
}

Map.propTypes = {
  locations: PropTypes.array,
}

export default React.memo(Map)
