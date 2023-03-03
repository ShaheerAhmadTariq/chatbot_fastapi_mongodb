from pymongo import MongoClient
from models import Leads,Chats


client = MongoClient("mongodb+srv://shaheerahmad:0j3mNEwj2GeuOK2D@sgm.kze22.mongodb.net/test")
db = client["chatbot3"]

# Create leads collection
leads_collection = db["leads"]

# Create chats collection
chats_collection = db["chats"]
