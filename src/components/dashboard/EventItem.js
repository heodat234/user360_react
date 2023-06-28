import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import iconLocation from 'src/assets/images/icon_location.png'

const EventItem = (props) => {
  const { item } = props
  // const [address, setAddress] = useState()

  // useEffect(() => {
  //   if(item.lat && item.lon){
  //     const geocoder = new window.google.maps.Geocoder();
  //     const latlng = { lat: parseInt(item.lat), lng: parseInt(item.lon) };

  //     geocoder.geocode({ location: latlng }, (results, status) => {
  //       if (status === 'OK') {
  //         if (results[0]) {
  //           setAddress(results[0].formatted_address);
  //         } else {
  //           setAddress('');
  //         }
  //       } else {
  //         setAddress('Geocoder failed due to: ' + status);
  //       }
  //     });
  //   }
  // }, [item.lat, item.lon]);

  return (
    <>
      <div className="row mt-3">
        <div className="w-full font-size-14 dark_color_text">
          <dl className="mb-0">
            <dt className="font-size-16 font-weight-500 dark_color_text">
              <div className="justify-content_space">
                <span className="font-size-16 font-weight-500 dark_color_text">
                  {item.eventName}
                </span>
                <span className="font-size-13 color-gray">{item.deviceModel}</span>
              </div>
            </dt>
            <dd className="mb-0">
              <div className="flex justify-between">
                <span className="flex items-start font-size-14 color-gray">
                  <img
                    className="mt-1"
                    src={iconLocation}
                    alt="icon location"
                    width={22}
                    height={22}
                  />
                  <span className=" ml-0.5 break-words"> {item.address}</span>
                </span>
                <span className="font-size-13 color-gray">
                  {dayjs(item.dateTime ? item.dateTime : new Date()).format('DD/MM/YYYY')}
                </span>
              </div>
            </dd>
          </dl>
        </div>
        <div className="line-gray"></div>
      </div>
    </>
  )
}

EventItem.propTypes = {
  item: PropTypes.object,
}

export default EventItem
