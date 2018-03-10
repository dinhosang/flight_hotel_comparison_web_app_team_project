const Flights = function () {
  this.allFlights = [
    {
      "destination": "MIL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "70.90",
      "airline": "AZ"
    },
    {
      "destination": "PAR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "72.50",
      "airline": "VY"
    },
    {
      "destination": "BCN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "72.50",
      "airline": "VY"
    },
    {
      "destination": "BRU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "73.00",
      "airline": "9F"
    },
    {
      "destination": "ROM",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "79.10",
      "airline": "AZ"
    }
  ]

  this.allFlightsToDestination = [
    {
      "itineraries": [
        {
          "outbound": {
            "flights": [
              {
                "departs_at": "2018-06-25T21:30",
                "arrives_at": "2018-06-26T06:30",
                "origin": {
                  "airport": "BOS",
                  "terminal": "E"
                },
                "destination": {
                  "airport": "KEF"
                },
                "marketing_airline": "FI",
                "operating_airline": "FI",
                "flight_number": "630",
                "aircraft": "75W",
                "booking_info": {
                  "travel_class": "ECONOMY",
                  "booking_code": "S",
                  "seats_remaining": 9
                }
              },
              {
                "departs_at": "2018-06-26T07:40",
                "arrives_at": "2018-06-26T11:45",
                "origin": {
                  "airport": "KEF"
                },
                "destination": {
                  "airport": "LHR",
                  "terminal": "2"
                },
                "marketing_airline": "FI",
                "operating_airline": "FI",
                "flight_number": "450",
                "aircraft": "76W",
                "booking_info": {
                  "travel_class": "ECONOMY",
                  "booking_code": "S",
                  "seats_remaining": 9
                }
              }
            ]
          }
        }
      ],
      "fare": {
        "total_price": "298.04",
        "price_per_adult": {
          "total_fare": "298.04",
          "tax": "106.04"
        },
        "restrictions": {
          "refundable": false,
          "change_penalties": true
        }
      }
    },
    {
      "itineraries": [
        {
          "outbound": {
            "flights": [
              {
                "departs_at": "2018-06-25T20:35",
                "arrives_at": "2018-06-26T07:55",
                "origin": {
                  "airport": "BOS",
                  "terminal": "E"
                },
                "destination": {
                  "airport": "LGW",
                  "terminal": "S"
                },
                "marketing_airline": "DI",
                "operating_airline": "DI",
                "flight_number": "7148",
                "aircraft": "789",
                "booking_info": {
                  "travel_class": "ECONOMY",
                  "booking_code": "V",
                  "seats_remaining": 9
                }
              }
            ]
          }
        }
      ],
      "fare": {
        "total_price": "302.40",
        "price_per_adult": {
          "total_fare": "302.40",
          "tax": "28.40"
        },
        "restrictions": {
          "refundable": false,
          "change_penalties": true
        }
      }
    }
  ]
}


module.exports = Flights;
