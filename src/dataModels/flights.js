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
    },
    {
      "destination": "AMS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "82.00",
      "airline": "KL"
    },
    {
      "destination": "GOT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "82.70",
      "airline": "DY"
    },
    {
      "destination": "CLJ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "83.26",
      "airline": "0B"
    },
    {
      "destination": "CPH",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "85.90",
      "airline": "D8"
    },
    {
      "destination": "TRN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "87.36",
      "airline": "0B"
    },
    {
      "destination": "STO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "87.50",
      "airline": "SK"
    },
    {
      "destination": "DUB",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "88.40",
      "airline": "BE"
    },
    {
      "destination": "MAD",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "90.80",
      "airline": "UX"
    },
    {
      "destination": "GVA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "91.90",
      "airline": "LX"
    },
    {
      "destination": "RIX",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "92.70",
      "airline": "BT"
    },
    {
      "destination": "OSL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "92.90",
      "airline": "SK"
    },
    {
      "destination": "LUX",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "94.70",
      "airline": "BA"
    },
    {
      "destination": "BIO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "98.90",
      "airline": "VY"
    },
    {
      "destination": "HEL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "98.90",
      "airline": "BT"
    },
    {
      "destination": "BUH",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "99.46",
      "airline": "0B"
    },
    {
      "destination": "BOD",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "105.60",
      "airline": "BA"
    },
    {
      "destination": "VNO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "107.80",
      "airline": "BT"
    },
    {
      "destination": "REK",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "114.20",
      "airline": "FI"
    },
    {
      "destination": "PSA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "114.50",
      "airline": "AZ"
    },
    {
      "destination": "ABZ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "115.78",
      "airline": "BA"
    },
    {
      "destination": "VRN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "116.30",
      "airline": "AZ"
    },
    {
      "destination": "LIS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "116.50",
      "airline": "TP"
    },
    {
      "destination": "ZRH",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "116.60",
      "airline": "LH"
    },
    {
      "destination": "BLQ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "116.70",
      "airline": "AZ"
    },
    {
      "destination": "OPO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "117.10",
      "airline": "TP"
    },
    {
      "destination": "FLR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "117.60",
      "airline": "AZ"
    },
    {
      "destination": "MUC",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "118.40",
      "airline": "LH"
    },
    {
      "destination": "FRA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "118.50",
      "airline": "LH"
    },
    {
      "destination": "GLA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "118.73",
      "airline": "BA"
    },
    {
      "destination": "EAP",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "119.60",
      "airline": "BA"
    },
    {
      "destination": "VIE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "119.60",
      "airline": "OS"
    },
    {
      "destination": "IST",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "120.32",
      "airline": "KK"
    },
    {
      "destination": "GOA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "120.50",
      "airline": "AZ"
    },
    {
      "destination": "VCE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "121.10",
      "airline": "AZ"
    },
    {
      "destination": "CTA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "122.50",
      "airline": "AZ"
    },
    {
      "destination": "EDI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "124.04",
      "airline": "BA"
    },
    {
      "destination": "KRK",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "124.50",
      "airline": "LO"
    },
    {
      "destination": "PMO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "124.90",
      "airline": "AZ"
    },
    {
      "destination": "KTW",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "125.00",
      "airline": "LO"
    },
    {
      "destination": "MAN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "125.28",
      "airline": "BA"
    },
    {
      "destination": "BLL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "126.80",
      "airline": "KL"
    },
    {
      "destination": "MRS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "126.80",
      "airline": "AF"
    },
    {
      "destination": "WAW",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "127.00",
      "airline": "LO"
    },
    {
      "destination": "TLS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "127.50",
      "airline": "BA"
    },
    {
      "destination": "NCL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "127.61",
      "airline": "BA"
    },
    {
      "destination": "HAM",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "131.90",
      "airline": "BA"
    },
    {
      "destination": "BFS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "132.13",
      "airline": "BA"
    },
    {
      "destination": "BRI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "135.00",
      "airline": "AZ"
    },
    {
      "destination": "NAP",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "135.40",
      "airline": "AZ"
    },
    {
      "destination": "STR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "135.50",
      "airline": "BA"
    },
    {
      "destination": "LYS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "135.80",
      "airline": "BA"
    },
    {
      "destination": "DUS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "138.30",
      "airline": "BA"
    },
    {
      "destination": "VLC",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "138.80",
      "airline": "AF"
    },
    {
      "destination": "POZ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "139.30",
      "airline": "LO"
    },
    {
      "destination": "CGN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "142.40",
      "airline": "EW"
    },
    {
      "destination": "IZM",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "142.50",
      "airline": "LH"
    },
    {
      "destination": "WRO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "143.40",
      "airline": "LO"
    },
    {
      "destination": "PMI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "143.60",
      "airline": "IB"
    },
    {
      "destination": "AGP",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "143.90",
      "airline": "D8"
    },
    {
      "destination": "AYT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "144.02",
      "airline": "KK"
    },
    {
      "destination": "RZE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "144.30",
      "airline": "LO"
    },
    {
      "destination": "GDN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "145.20",
      "airline": "SK"
    },
    {
      "destination": "NTE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "146.00",
      "airline": "KL"
    },
    {
      "destination": "PRG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "150.00",
      "airline": "BE"
    },
    {
      "destination": "BER",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "150.90",
      "airline": "BA"
    },
    {
      "destination": "SOF",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "151.60",
      "airline": "KL"
    },
    {
      "destination": "ALC",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "152.00",
      "airline": "TP"
    },
    {
      "destination": "ALG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "152.40",
      "airline": "AF"
    },
    {
      "destination": "BGO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "152.90",
      "airline": "DY"
    },
    {
      "destination": "SVQ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "154.30",
      "airline": "IB"
    },
    {
      "destination": "ZAG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "154.40",
      "airline": "OS"
    },
    {
      "destination": "TIA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "154.40",
      "airline": "AZ"
    },
    {
      "destination": "SZG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "156.10",
      "airline": "LH"
    },
    {
      "destination": "HAJ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "157.30",
      "airline": "BA"
    },
    {
      "destination": "MLA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "157.90",
      "airline": "KM"
    },
    {
      "destination": "ATH",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "160.10",
      "airline": "AZ"
    },
    {
      "destination": "BUD",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "160.20",
      "airline": "LH"
    },
    {
      "destination": "NUE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "161.20",
      "airline": "AF"
    },
    {
      "destination": "TLL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "161.50",
      "airline": "BT"
    },
    {
      "destination": "IBZ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "162.66",
      "airline": "IB"
    },
    {
      "destination": "BRE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "163.70",
      "airline": "KL"
    },
    {
      "destination": "ANK",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "166.00",
      "airline": "LH"
    },
    {
      "destination": "NCE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "167.40",
      "airline": "AF"
    },
    {
      "destination": "LCA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "174.00",
      "airline": "LO"
    },
    {
      "destination": "CAS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "178.40",
      "airline": "AZ"
    },
    {
      "destination": "MOW",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "178.60",
      "airline": "LH"
    },
    {
      "destination": "LWO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "178.70",
      "airline": "PS"
    },
    {
      "destination": "TCI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "178.90",
      "airline": "D8"
    },
    {
      "destination": "MSQ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "184.80",
      "airline": "LO"
    },
    {
      "destination": "IEV",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "187.80",
      "airline": "LO"
    },
    {
      "destination": "SNN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "187.95",
      "airline": "EI"
    },
    {
      "destination": "ORK",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "188.35",
      "airline": "EI"
    },
    {
      "destination": "FAO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "188.40",
      "airline": "TP"
    },
    {
      "destination": "TUN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "188.70",
      "airline": "AZ"
    },
    {
      "destination": "SKP",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "190.90",
      "airline": "OS"
    },
    {
      "destination": "KIV",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "192.12",
      "airline": "9U"
    },
    {
      "destination": "ODS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "193.60",
      "airline": "PS"
    },
    {
      "destination": "LPA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "194.40",
      "airline": "D8"
    },
    {
      "destination": "SJJ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "195.50",
      "airline": "OS"
    },
    {
      "destination": "DBV",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "195.50",
      "airline": "LH"
    },
    {
      "destination": "BEG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "195.62",
      "airline": "KL"
    },
    {
      "destination": "LJU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "198.30",
      "airline": "LO"
    },
    {
      "destination": "SKG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "198.81",
      "airline": "JU"
    },
    {
      "destination": "SPU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "200.90",
      "airline": "OS"
    },
    {
      "destination": "JTR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "213.50",
      "airline": "LH"
    },
    {
      "destination": "RBA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "216.30",
      "airline": "AF"
    },
    {
      "destination": "PRN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "222.26",
      "airline": "TK"
    },
    {
      "destination": "BEY",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "223.52",
      "airline": "KK"
    },
    {
      "destination": "LED",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "225.00",
      "airline": "BT"
    },
    {
      "destination": "TBS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "231.10",
      "airline": "TK"
    },
    {
      "destination": "TLV",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "239.80",
      "airline": "TK"
    },
    {
      "destination": "THR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "251.40",
      "airline": "TK"
    },
    {
      "destination": "KWI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "275.62",
      "airline": "PC"
    },
    {
      "destination": "RAK",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "280.60",
      "airline": "VY"
    },
    {
      "destination": "AUH",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "298.61",
      "airline": "RJ"
    },
    {
      "destination": "DXB",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "298.81",
      "airline": "RJ"
    },
    {
      "destination": "CAI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "298.81",
      "airline": "RJ"
    },
    {
      "destination": "BAH",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "308.42",
      "airline": "PC"
    },
    {
      "destination": "EVN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "317.81",
      "airline": "SU"
    },
    {
      "destination": "AMM",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "317.90",
      "airline": "TK"
    },
    {
      "destination": "DEL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "323.50",
      "airline": "AZ"
    },
    {
      "destination": "ALA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "334.96",
      "airline": "TK"
    },
    {
      "destination": "DAR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "345.80",
      "airline": "TK"
    },
    {
      "destination": "ACC",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "351.01",
      "airline": "TP"
    },
    {
      "destination": "DOH",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "351.71",
      "airline": "ME"
    },
    {
      "destination": "BOM",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "353.47",
      "airline": "EK"
    },
    {
      "destination": "KRT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "354.11",
      "airline": "RJ"
    },
    {
      "destination": "ISB",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "357.30",
      "airline": "TK"
    },
    {
      "destination": "LHE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "358.20",
      "airline": "TK"
    },
    {
      "destination": "ABV",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "360.70",
      "airline": "TK"
    },
    {
      "destination": "NYC",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "361.30",
      "airline": "DI"
    },
    {
      "destination": "JED",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "363.11",
      "airline": "RJ"
    },
    {
      "destination": "YTO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "365.80",
      "airline": "TS"
    },
    {
      "destination": "YMQ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "369.10",
      "airline": "TS"
    },
    {
      "destination": "LOS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "370.20",
      "airline": "TK"
    },
    {
      "destination": "EBB",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "371.30",
      "airline": "SN"
    },
    {
      "destination": "MAA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "382.27",
      "airline": "EK"
    },
    {
      "destination": "KHI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "384.30",
      "airline": "TK"
    },
    {
      "destination": "BKK",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "387.51",
      "airline": "RJ"
    },
    {
      "destination": "NBO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "388.31",
      "airline": "TK"
    },
    {
      "destination": "BOS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "391.10",
      "airline": "DI"
    },
    {
      "destination": "CHI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "391.10",
      "airline": "DI"
    },
    {
      "destination": "DKR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "391.70",
      "airline": "IB"
    },
    {
      "destination": "CMB",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "392.10",
      "airline": "PS"
    },
    {
      "destination": "HYD",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "393.07",
      "airline": "EK"
    },
    {
      "destination": "SHA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "397.70",
      "airline": "AF"
    },
    {
      "destination": "TRV",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "398.51",
      "airline": "GF"
    },
    {
      "destination": "RUH",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "398.70",
      "airline": "TK"
    },
    {
      "destination": "FNA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "400.61",
      "airline": "TK"
    },
    {
      "destination": "DLA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "405.90",
      "airline": "AF"
    },
    {
      "destination": "CCU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "408.37",
      "airline": "EK"
    },
    {
      "destination": "BJS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "410.80",
      "airline": "MF"
    },
    {
      "destination": "AMD",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "411.11",
      "airline": "EY"
    },
    {
      "destination": "ADD",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "414.80",
      "airline": "TK"
    },
    {
      "destination": "BLR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "418.21",
      "airline": "GF"
    },
    {
      "destination": "YVR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "420.40",
      "airline": "TS"
    },
    {
      "destination": "OAK",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "422.11",
      "airline": "VS"
    },
    {
      "destination": "COK",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "424.71",
      "airline": "WY"
    },
    {
      "destination": "DAC",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "424.81",
      "airline": "TK"
    },
    {
      "destination": "GOI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "425.41",
      "airline": "WY"
    },
    {
      "destination": "KTM",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "433.31",
      "airline": "WY"
    },
    {
      "destination": "YOW",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "440.21",
      "airline": "LH"
    },
    {
      "destination": "JKT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "440.40",
      "airline": "TK"
    },
    {
      "destination": "SGN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "443.51",
      "airline": "BI"
    },
    {
      "destination": "JNB",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "448.40",
      "airline": "AZ"
    },
    {
      "destination": "ATQ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "456.41",
      "airline": "AI"
    },
    {
      "destination": "KUL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "457.39",
      "airline": "EK"
    },
    {
      "destination": "SFO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "458.01",
      "airline": "LX"
    },
    {
      "destination": "HKG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "460.07",
      "airline": "EK"
    },
    {
      "destination": "MSP",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "460.91",
      "airline": "AA"
    },
    {
      "destination": "SIN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "464.87",
      "airline": "EK"
    },
    {
      "destination": "CEB",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "465.70",
      "airline": "CX"
    },
    {
      "destination": "MNL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "467.01",
      "airline": "GF"
    },
    {
      "destination": "JRO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "468.31",
      "airline": "TK"
    },
    {
      "destination": "TPE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "470.77",
      "airline": "EK"
    },
    {
      "destination": "CTU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "473.51",
      "airline": "CA"
    },
    {
      "destination": "LIM",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "481.51",
      "airline": "AV"
    },
    {
      "destination": "RGN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "486.00",
      "airline": "CX"
    },
    {
      "destination": "LUN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "492.61",
      "airline": "KQ"
    },
    {
      "destination": "FLL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "493.00",
      "airline": "SN"
    },
    {
      "destination": "BGI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "495.10",
      "airline": "VS"
    },
    {
      "destination": "REP",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "496.71",
      "airline": "MH"
    },
    {
      "destination": "LAX",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "501.10",
      "airline": "DI"
    },
    {
      "destination": "PTY",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "501.50",
      "airline": "BA"
    },
    {
      "destination": "CPT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "504.61",
      "airline": "ET"
    },
    {
      "destination": "HAN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "507.11",
      "airline": "VN"
    },
    {
      "destination": "DPS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "507.60",
      "airline": "CX"
    },
    {
      "destination": "CAN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "507.61",
      "airline": "CX"
    },
    {
      "destination": "ORL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "508.00",
      "airline": "BA"
    },
    {
      "destination": "EBL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "508.31",
      "airline": "RJ"
    },
    {
      "destination": "MLE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "508.51",
      "airline": "UL"
    },
    {
      "destination": "OSA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "508.51",
      "airline": "MU"
    },
    {
      "destination": "NGO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "508.61",
      "airline": "MU"
    },
    {
      "destination": "TPA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "510.10",
      "airline": "AA"
    },
    {
      "destination": "SEZ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "513.60",
      "airline": "AF"
    },
    {
      "destination": "CNX",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "513.91",
      "airline": "QR"
    },
    {
      "destination": "PNH",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "513.91",
      "airline": "MH"
    },
    {
      "destination": "TYO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "515.00",
      "airline": "MF"
    },
    {
      "destination": "UIO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "516.21",
      "airline": "AV"
    },
    {
      "destination": "MDE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "520.31",
      "airline": "AV"
    },
    {
      "destination": "SAO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "520.91",
      "airline": "UA"
    },
    {
      "destination": "HKT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "522.11",
      "airline": "MH"
    },
    {
      "destination": "CLE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "528.70",
      "airline": "FI"
    },
    {
      "destination": "SLU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "533.10",
      "airline": "VS"
    },
    {
      "destination": "BOG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "534.51",
      "airline": "UA"
    },
    {
      "destination": "GND",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "535.40",
      "airline": "VS"
    },
    {
      "destination": "ANU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "536.50",
      "airline": "VS"
    },
    {
      "destination": "SEL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "537.17",
      "airline": "EK"
    },
    {
      "destination": "HRE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "541.91",
      "airline": "KQ"
    },
    {
      "destination": "TAS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "542.21",
      "airline": "SU"
    },
    {
      "destination": "CLO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "542.50",
      "airline": "AA"
    },
    {
      "destination": "PBI",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "545.91",
      "airline": "VS"
    },
    {
      "destination": "FMY",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "545.91",
      "airline": "DL"
    },
    {
      "destination": "JAX",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "546.11",
      "airline": "KL"
    },
    {
      "destination": "SDQ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "551.51",
      "airline": "DL"
    },
    {
      "destination": "YEA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "551.62",
      "airline": "WS"
    },
    {
      "destination": "PHL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "555.91",
      "airline": "AA"
    },
    {
      "destination": "POS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "570.31",
      "airline": "AC"
    },
    {
      "destination": "DEN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "571.91",
      "airline": "UA"
    },
    {
      "destination": "YYC",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "573.40",
      "airline": "SN"
    },
    {
      "destination": "GYE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "576.40",
      "airline": "KL"
    },
    {
      "destination": "NAS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "582.21",
      "airline": "AA"
    },
    {
      "destination": "YHZ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "587.22",
      "airline": "WS"
    },
    {
      "destination": "DUR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "587.27",
      "airline": "EK"
    },
    {
      "destination": "BZE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "592.81",
      "airline": "AA"
    },
    {
      "destination": "BDA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "600.81",
      "airline": "DL"
    },
    {
      "destination": "YWG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "605.71",
      "airline": "AC"
    },
    {
      "destination": "CUN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "607.50",
      "airline": "VS"
    },
    {
      "destination": "MBJ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "611.11",
      "airline": "UA"
    },
    {
      "destination": "REC",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "611.80",
      "airline": "TP"
    },
    {
      "destination": "WAS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "612.31",
      "airline": "LX"
    },
    {
      "destination": "SEA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "615.10",
      "airline": "KL"
    },
    {
      "destination": "PUJ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "621.51",
      "airline": "AA"
    },
    {
      "destination": "HOU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "623.10",
      "airline": "DL"
    },
    {
      "destination": "CCS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "624.30",
      "airline": "BA"
    },
    {
      "destination": "AUA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "626.51",
      "airline": "AA"
    },
    {
      "destination": "MRU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "628.90",
      "airline": "MK"
    },
    {
      "destination": "MIA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "629.71",
      "airline": "TK"
    },
    {
      "destination": "PER",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "634.49",
      "airline": "EK"
    },
    {
      "destination": "PDX",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "634.71",
      "airline": "UA"
    },
    {
      "destination": "SJO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "636.00",
      "airline": "IB"
    },
    {
      "destination": "MSY",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "638.20",
      "airline": "SN"
    },
    {
      "destination": "GUA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "641.50",
      "airline": "IB"
    },
    {
      "destination": "ULN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "657.31",
      "airline": "SU"
    },
    {
      "destination": "MEL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "657.81",
      "airline": "BI"
    },
    {
      "destination": "ATL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "657.91",
      "airline": "DL"
    },
    {
      "destination": "MGA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "663.01",
      "airline": "DL"
    },
    {
      "destination": "CNS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "663.80",
      "airline": "CX"
    },
    {
      "destination": "BNE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "668.77",
      "airline": "EK"
    },
    {
      "destination": "ADL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "668.87",
      "airline": "EK"
    },
    {
      "destination": "RIO",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "670.21",
      "airline": "UA"
    },
    {
      "destination": "CHS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "683.21",
      "airline": "UA"
    },
    {
      "destination": "SYD",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "683.29",
      "airline": "EK"
    },
    {
      "destination": "CHC",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "691.47",
      "airline": "EK"
    },
    {
      "destination": "AKL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "692.51",
      "airline": "MH"
    },
    {
      "destination": "WLG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "692.87",
      "airline": "EK"
    },
    {
      "destination": "CMH",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "694.31",
      "airline": "UA"
    },
    {
      "destination": "IND",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "701.81",
      "airline": "UA"
    },
    {
      "destination": "POP",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "707.51",
      "airline": "AA"
    },
    {
      "destination": "BSB",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "712.41",
      "airline": "AA"
    },
    {
      "destination": "BHZ",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "713.71",
      "airline": "AA"
    },
    {
      "destination": "CLT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "723.81",
      "airline": "AA"
    },
    {
      "destination": "GCM",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "730.91",
      "airline": "DL"
    },
    {
      "destination": "KIN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "731.21",
      "airline": "DL"
    },
    {
      "destination": "FOR",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "732.60",
      "airline": "AF"
    },
    {
      "destination": "SJU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "733.91",
      "airline": "AV"
    },
    {
      "destination": "DTT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "735.90",
      "airline": "UA"
    },
    {
      "destination": "BUE",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "737.81",
      "airline": "DL"
    },
    {
      "destination": "DFW",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "745.11",
      "airline": "DL"
    },
    {
      "destination": "SCL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "752.31",
      "airline": "AV"
    },
    {
      "destination": "MVD",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "756.40",
      "airline": "IB"
    },
    {
      "destination": "STL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "765.31",
      "airline": "AC"
    },
    {
      "destination": "RDU",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "771.11",
      "airline": "AY"
    },
    {
      "destination": "PIT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "774.91",
      "airline": "DL"
    },
    {
      "destination": "MEX",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "780.40",
      "airline": "KL"
    },
    {
      "destination": "BNA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "782.51",
      "airline": "UA"
    },
    {
      "destination": "SSA",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "792.60",
      "airline": "TP"
    },
    {
      "destination": "LAS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "797.10",
      "airline": "AY"
    },
    {
      "destination": "CVG",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "799.11",
      "airline": "VS"
    },
    {
      "destination": "PHX",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "813.21",
      "airline": "AY"
    },
    {
      "destination": "LPB",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "825.91",
      "airline": "AV"
    },
    {
      "destination": "SAN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "829.91",
      "airline": "AY"
    },
    {
      "destination": "SLC",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "833.10",
      "airline": "DL"
    },
    {
      "destination": "AUS",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "885.91",
      "airline": "AC"
    },
    {
      "destination": "SAT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "897.11",
      "airline": "AC"
    },
    {
      "destination": "NAN",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "945.31",
      "airline": "QF"
    },
    {
      "destination": "HNL",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "945.91",
      "airline": "UA"
    },
    {
      "destination": "PPT",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "1553.40",
      "airline": "AF"
    },
    {
      "destination": "BOB",
      "departure_date": "2018-05-22",
      "return_date": "2018-05-27",
      "price": "6147.71",
      "airline": "AY"
    }
  ]
}

module.exports = Flights;
