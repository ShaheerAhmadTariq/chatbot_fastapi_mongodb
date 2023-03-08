import re
import os
import openai
import requests
import phonenumbers
from dotenv import load_dotenv
from phonenumbers import geocoder
from Country import getAllCountries
load_dotenv()
openai.api_key = os.environ['API_KEY']
SCAM_SEARCH_API_KEY = os.environ['SCAM_Search_API_KEY']

def is_valid_email(email):
    pattern = re.compile('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    if pattern.match(email):
        # return True
        url = "https://scamsearch.io/api/search? search=" + email + " &type=email &api_token=" + SCAM_SEARCH_API_KEY

        response = requests.get(url)

        if response.status_code == 200:
            results = response.json()
            if results['status'] == True:
                return False
            else:
                return True
        else:
            print(f"Error: {response.status_code}")
    else:
        return False

def is_valid_phoneNo(phoneNo):
    pattern = re.compile("\+[1-9][0-9]{0,14}")
    # pattern = re.compile(r'^\+[1-9]\d{1,14}$')
    return pattern.match(phoneNo)

def is_valid_country(country):
    list_of_valid_countries = getAllCountries()
    if country.lower() in list_of_valid_countries:
        return True
    else:
        return False

def is_valid_project(project):
    prompt = "does this make sense? " + project
    response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.1,
        )
    response = response.choices[0].text.strip()
    if 'no' in response.lower():
        return False
    else:
        return True

def does_country_match_phone_code(phoneNo, country):
    parsed_number = phonenumbers.parse(phoneNo)
    country_name = geocoder.country_name_for_number(parsed_number,'en')
    if country_name.lower() == country.lower():
        return True
    else:
        return False

def validateUserInfo(lead_dict):
    if is_valid_email(lead_dict['email']):
        if is_valid_phoneNo(lead_dict['phoneNo']):
            if is_valid_country(lead_dict['country']):
                if does_country_match_phone_code(lead_dict['phoneNo'], lead_dict['country']):
                    if is_valid_project(lead_dict['projectDetails']):
                        return "correct"
                    else:
                        return "Enter Valid project details"
                else:
                    return "Phone Number does not match Country Code"
            else:
                return "We don't yet provide services in your country"
        else:
            return "invalid phone Number"
    else:
        return "invalid email"
    