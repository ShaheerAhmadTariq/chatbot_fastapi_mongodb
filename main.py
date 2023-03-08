# python -m uvicorn main:app --reload
from fastapi import FastAPI, Request, Response, HTTPException, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from database import leads_collection, chats_collection, countries_collection, Leads, Chats, Countries
from dotenv import load_dotenv
from pydantic import BaseModel
from afterLogin import preparePrompt
from userInfo import validateUserInfo
from Country import addCountry, getAllCountries
from chatbot import chatbot
import openai
import json
import os
load_dotenv()
openai.api_key = os.environ['API_KEY']
origins = [
    "http://localhost:3000",
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
global_prompt = ""

@app.websocket("/chatbot")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        receivedData = await websocket.receive_text()
        receivedData = json.loads(receivedData)
        # print(receivedData,"datatype>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", type(receivedData))
        question = receivedData['prompt']
        email = receivedData['email']
        response =  chatbot(question)
        # print("response ",response)
        chat_dict = {}
        chat_dict['prompt'] = question
        chat_dict['completion'] = response
        # global global_prompt
        # global_prompt = global_prompt + "\nHuman: " + question + "\nAI: " + response
        lead = leads_collection.find_one({"email": email})
        if lead:
            chat_dict['lead_id'] =str(lead['_id'])
            chats_collection.insert_one(chat_dict)
            await websocket.send_text(response) 
        else:
            return {'error': "Invalid Email"}

class leadSchema(BaseModel):
    name: str
    phoneNo : str
    email: str
    country: str
    projectDetails: str
@app.post("/leads/")
# async def create_lead(lead: Leads):
async def create_lead(request: Request, user_string_request: leadSchema):
    # lead_dict = lead.to_dict()
    lead_dict = {}
    lead_dict['name'] = user_string_request.name
    lead_dict['phoneNo'] = user_string_request.phoneNo
    lead_dict['email'] = user_string_request.email
    lead_dict['country'] = user_string_request.country
    lead_dict['projectDetails'] = user_string_request.projectDetails
    message = validateUserInfo(lead_dict)
    print(message)
    if message == 'correct':
        leads_collection.insert_one(lead_dict)

    return {"message": message}


class getChatsSchema(BaseModel):
    email: str
@app.post("/chats")
async def get_chats(request: Request, user_string_request: getChatsSchema):
# async def get_chats():
    # email = 'shaheerahmadtariq@gmail.com'
    email = user_string_request.email
    lead = leads_collection.find_one({"email": email})
    
    if lead is None:
        return "Email Not Found in DB"
    else:
        # Query the collection by lead_id
        chats = chats_collection.find({"lead_id": str(lead["_id"])},{"_id": 1, "completion": 1, "prompt": 1})
        chat_list = []
        # Iterate over the result
        for chat in chats:
            chat['_id'] = str(chat['_id'])
            chat_list.append(chat)
        # print(chat_list)
        chat_str = ""
        for chat in chat_list:
            chat_str += "Ssd"
        return {'chat_list': chat_list}
        # return chat_list

class UserloginRequest(BaseModel):
    email: str
@app.post("/login/")
def login(request: Request, user_request : UserloginRequest):
    # try:
        email = user_request.email
        # email = 'shaheerahmadtariq@gmail.com'
        lead = leads_collection.find_one({"email": email})
        if lead:
            global global_prompt
            global_prompt = global_prompt +  preparePrompt(lead)
            return {"message": "Success", "name": lead['name']}
        else:
            return {"status": "error", "message": "Invalid username or password"}


class CountrySchema(BaseModel):
    country : str
@app.post('/addCountry')
def insertCountry(request: Request, user_request: CountrySchema):
    message = addCountry(user_request.country)
    return {'message': message}