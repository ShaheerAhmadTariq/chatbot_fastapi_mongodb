from datetime import datetime
from pydantic import BaseModel
class Leads(BaseModel):
    def __init__(self, name: str, email: str, phoneNo: str, country: str, projectDetails: str):
        self.name = name
        self.email = email
        self.phoneNo = phoneNo
        self.country = country
        self.projectDetails = projectDetails

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "phoneNo": self.phoneNo,
            "country": self.country,
            "projectDetails": self.projectDetails,
        }
    
class Chats(BaseModel):
    def __init__(self, prompt: str, completion: str, lead_id: str):
        self.prompt = prompt
        self.completion = completion
        self.lead_id = lead_id

    def to_dict(self):
        return {
            "published_at": datetime.utcnow(),
            "prompt": self.prompt,
            "completion": self.completion,
            "lead_id": self.lead_id,
        }
    
class Countries(BaseModel):
    def __init__(self, country: str):
        self.country = country

    def to_dict(self):
        return {
            "published_at": datetime.utcnow(),
            "country": self.country,
        }
