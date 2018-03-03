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
                "departs_at": "2018-06-25T17:40",
                "arrives_at": "2018-06-25T21:15",
                "origin": {
                  "airport": "LTN"
                },
                "destination": {
                  "airport": "FCO",
                  "terminal": "3"
                },
                "marketing_airline": "U2",
                "operating_airline": "U2",
                "flight_number": "2211",
                "aircraft": "319",
                "booking_info": {
                  "travel_class": "ECONOMY",
                  "booking_code": "Y",
                  "seats_remaining": 9
                }
              }
            ]
          },
          "inbound": {
            "flights": [
              {
                "departs_at": "2018-06-30T22:20",
                "arrives_at": "2018-07-01T00:05",
                "origin": {
                  "airport": "FCO",
                  "terminal": "3"
                },
                "destination": {
                  "airport": "LTN"
                },
                "marketing_airline": "U2",
                "operating_airline": "U2",
                "flight_number": "2214",
                "aircraft": "320",
                "booking_info": {
                  "travel_class": "ECONOMY",
                  "booking_code": "Y",
                  "seats_remaining": 9
                }
              }
            ]
          }
        }
      ],
      "fare": {
        "total_price": "130.30",
        "price_per_adult": {
          "total_fare": "130.30",
          "tax": "0.00"
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
