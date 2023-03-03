from database import chats_collection


def preparePrompt(lead):
    prompt = ""
    prompt = prompt + getUserInfo(lead)
    # prompt = prompt + getUserChats(lead)
    # print(prompt)
    return prompt

def getUserInfo(lead):
    # phoneNo = str(lead['phoneNo'])
    userInfo = "AI: What is your name?\n" + 'Client: My name is ' + lead['name'] + "\nAI: What is your email?\n" + "Client: My email is " + lead['email'] + "\nAI: What is your contact Number or phone Number?\n" + "CLient: my phone number is " + \
        lead['phoneNo'] + "\nAI: Which country are you from?\n" + "Client: I'm From " + lead['country'] + \
        "\nAI: Can you tell me your project details? or Can you tell me about your project?\n" + \
        "Client: yeah sure. i want " + lead['projectDetails']
    return userInfo

def getUserChats(lead):
    chats = chats_collection.find({"lead_id": str(lead["_id"])},{"_id": 0, "completion": 1, "prompt": 1})
    chat_list = []
    # Iterate over the result
    for chat in chats:
        chat_list.append(chat)
    chat_str = ""
    for chat in chat_list:
        chat_str += '\nClient: ' + chat['prompt'] + '\n' + chat['completion']
    
    return chat_str
    