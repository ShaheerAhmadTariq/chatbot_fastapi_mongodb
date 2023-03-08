import openai 
import os
openai.api_key = os.environ['API_KEY']

def chatbot(question):

    with open('startupConversation.txt', 'r') as file:
            file_contents = file.read()
            # global global_prompt
            # print("global_prompt: ",global_prompt)
            # prompt = file_contents + global_prompt + question
            prompt = file_contents + question
            # print(prompt)
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=prompt,
                max_tokens=10,
                n=1,
                stop=None,
                temperature=0,
            )
            response = response.choices[0].text.strip()
    predicted_class = Classifier(response)
    return Predefined_response(predicted_class, response)

def Classifier(response):
    choices = ['1','2','3','4','5']
    
    flag = True
    for choice in choices:
        if choice in response:
            flag = False
            return choice
    if flag:
        # aging give ai prompt to answer the question 
        return '6'
    # return "predicted_class"

def Predefined_response(predicted_class, completion):
    if predicted_class == '1':
         return "We work on Blockchain where we provide Smart contracts, Wallets, Exhanges, NFT MarketPlace"
    elif predicted_class == '2':
         return "We have varying timelines for each of our projects"
    elif predicted_class == '3':
         return "Our team undertakes projects with a budget of over 5000 USD."
    elif predicted_class == '4':
        #  link = "<a href={'https://calendly.com/shaheer-ahmad-1/test-meeting'} style={{ color: 'blue', textDecoration: 'underline' }}>Schedule Meeting</a>"
         link = 'https://calendly.com/shaheer-ahmad-1/test-meeting'
         return link
        #  return "Put schedulling meeting logic here"
    elif predicted_class == '5':
         return "Please refrain from asking questions that are not related to the topic at hand."
    elif predicted_class == '6':
         return "Can you provide more details or information?"