const Hotels = function(){

  this.allHotels = [
    {
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
    }
  ]

}

module.exports = Hotels;
