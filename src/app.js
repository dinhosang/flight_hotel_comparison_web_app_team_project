const main = function() {
  prepareFormView();
  const options = {
    flight: {
      "itineraries": [
        {
          "outbound": {
            "flights": [
              {
                "departs_at": "2018-06-25T07:45",
                "arrives_at": "2018-06-25T19:20",
                "origin": {
                  "airport": "BOS",
                  "terminal": "E"
                },
                "destination": {
                  "airport": "LHR",
                  "terminal": "5"
                },
                "marketing_airline": "AA",
                "operating_airline": "BA",
                "flight_number": "6175",
                "aircraft": "777",
                "booking_info": {
                  "travel_class": "ECONOMY",
                  "booking_code": "K",
                  "seats_remaining": 7
                }
              }
            ]
          },
          "inbound": {
            "flights": [
              {
                "departs_at": "2018-06-28T11:15",
                "arrives_at": "2018-06-28T13:35",
                "origin": {
                  "airport": "LHR",
                  "terminal": "5"
                },
                "destination": {
                  "airport": "BOS",
                  "terminal": "E"
                },
                "marketing_airline": "AA",
                "operating_airline": "BA",
                "flight_number": "6164",
                "aircraft": "744",
                "booking_info": {
                  "travel_class": "ECONOMY",
                  "booking_code": "K",
                  "seats_remaining": 7
                }
              }
            ]
          }
        }
      ],
      "fare": {
        "total_price": "1769.21",
        "price_per_adult": {
          "total_fare": "1769.21",
          "tax": "387.21"
        },
        "restrictions": {
          "refundable": false,
          "change_penalties": true
        }
      }
    },
    hotel: {
      "property_code": "UIROMLMR",
      "property_name": "Hotel La Mela Roma",
      "location": {
        "latitude": 41.84494,
        "longitude": 12.59631
      },
      "address": {
        "line1": "Via Alessandro Stoppato 108",
        "city": "Rome",
        "postal_code": "00173",
        "country": "IT"
      },
      "total_price": {
        "amount": "62.14",
        "currency": "USD"
      },
      "min_daily_rate": {
        "amount": "62.14",
        "currency": "USD"
      },
      "contacts": [
        {
          "type": "PHONE",
          "detail": "39-067-230310"
        },
        {
          "type": "FAX",
          "detail": "39-067-231797"
        }
      ],
      "amenities": [
        {
          "amenity": "JACUZZI",
          "ota_code": 55,
          "description": "Jacuzzi"
        },
        {
          "amenity": "MASSAGE_SERVICES",
          "ota_code": 61,
          "description": "Massage services"
        }
      ],
      "awards": [
        {
          "provider": "Local Star Rating",
          "rating": "4"
        }
      ],
      "images": [],
      "rooms": [
        {
          "booking_code": "N1TPRO",
          "room_type_code": "N1T",
          "rate_plan_code": "PRO",
          "total_amount": {
            "amount": "62.14",
            "currency": "USD"
          },
          "rates": [
            {
              "start_date": "2018-06-15",
              "end_date": "2018-06-16",
              "currency_code": "USD",
              "price": 62.14
            }
          ],
          "descriptions": [
            "Best Available Rate",
            "Single Standard"
          ],
          "room_type_info": {
            "room_type": "Non-smoking",
            "bed_type": "Twin",
            "number_of_beds": "1"
          },
          "rate_type_code": "PRO"
        }
      ],
      "_links": {
        "more_rooms_at_this_hotel": {
          "href": "https://api.sandbox.amadeus.com/v1.2/hotels/UIROMLMR?apikey=dLjfkntyhAAKmWVHf2zLYAMLmhrQtxMl&check_in=2018-06-15&check_out=2018-06-16&referrer=more_rooms_at_this_hotel"
        }
      }
    },
    parent: document.querySelector('main')
  }
  const PackageView = require('./viewModels/packageView');
  new PackageView(options)
}

const prepareFormView = function() {
  const Form = require('./viewModels/form');
  const form = new Form(prepareResultsView);
}

const prepareResultsView = function(InnovationSearchDataFromFormView){
  const ResultsView = require('./viewModels/resultsView');
  const resultsView = new ResultsView();

  const options = {
    view: resultsView,
    data: InnovationSearchDataFromFormView
  }

  listDestinations(options);
}


const listDestinations = function(options) {

  const Request = require('./helpers/request.js');
  const key     = require('./keys/amadeus-comparison-api.js');
  const UrlBuilder  = require('./helpers/urlBuilder');
  const SEARCHURL   = require('./helpers/enums/searchUrlEnum');

  const dataForUrlForInspiration  = options.data.inspirationArray;
  const dataForUrlForLowfare      = options.data.lowfareArray;
  const resultsView = options.view;

  const urlDetailsToBuild = {
    baseUrl: `${SEARCHURL.INSPIRATION}${key}`,
    paramArray: dataForUrlForInspiration
  }

  const urlBuild = new UrlBuilder(urlDetailsToBuild);
  const url = urlBuild.finalUrl

  const callback = function(requestResponse) {
    const options = {
      response: requestResponse,
      callback: listFlights,
      startingSearchRequirements: dataForUrlForLowfare
    }
    resultsView.createDestinationsListView(options);
  }


  const request = new Request(url);
  request.get(callback);
}

const listFlights = function(details) {
  const Request = require('./helpers/request.js');

  const key         = require('./keys/amadeus-comparison-api.js');
  const UrlBuilder  = require('./helpers/urlBuilder');
  const SEARCHURL   = require('./helpers/enums/searchUrlEnum');

  const dataForUrl  = details.searchRequirements;
  const destinationListView = details.view;

  const urlDetailsToBuild = {
    baseUrl: `${SEARCHURL.LOWFARE}${key}`,
    paramArray: dataForUrl
  }

  const urlBuild = new UrlBuilder(urlDetailsToBuild);
  const url = urlBuild.finalUrl;

  const request = new Request(url);

  const callback = function(data) {
    const options = {
      currency: data.currency,
      flights: data.results,
      callback: listHotels
    }
    destinationListView.populateFlights(options);
  }

  request.get(callback);
}

const listHotels = function(options){
  const Request = require('./helpers/request.js');
  const request = new Request('/api/random_search/hotels');

  const resultsView   = options.view;
  const flightDetails = options.flightDetails;

  const onHotelClick = function(hotel) {

    const informationHash = {
        flight: flightDetails,
        hotel: hotel,
        parent: document.getElementsByTagName('main')[0]
    }

    showPackageDetails(informationHash)
  }

  const callback = function(data) {

    const dataForHotelView = {
      hotels: data.results,
      parent: resultsView.searchResultView,
      callback: onHotelClick
    }

    resultsView.createHotelsListView(dataForHotelView);

  }

  request.get(callback);
}

const showPackageDetails = function(data) {
  const PackageView = require('./viewModels/packageView.js');
  new PackageView(data)

  const ScrollTo = require('./helpers/scrollTo.js')
  const scroll = new ScrollTo('package-view')

  scroll.scrollTo();
}


document.addEventListener('DOMContentLoaded', main);
