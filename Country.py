from database import Countries, countries_collection

def addCountry(countryName):
    country_dict = {}
    country_dict['country'] = countryName
    countries_collection.insert_one(country_dict)
    return "new country inserted"

def getAllCountries():
    allCOuntries =  countries_collection.find({},{"_id": 0, "country": 1})
    country_list = []
    for country in allCOuntries:
        country_list.append(country['country'].lower())
    print("all countries", country_list)
    return country_list
