
# React GPT

Welcome to the React GPT, a web application chat based to use different features available with OpenAI API like, bot assistant, image generation, text correction, text translation, etc.
 
This is the **frontend** of the application. Remember to run de backend first, the backend repository can be found [here](https://github.com/NickEsColR/nest-gpt)

**This application was develop to use by spanish speakers.**
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_GPT_API`
`VITE_ASSISTANT_API`

An environment template is provided, you just need to rename it from ".env.template" to ".env" and paste your values

## Features

- Chatbot assistant
- convert audio to text
- Convert text to audio
- Generate images
- ortography correction
- translate to other languages
- identify pros and cons from asking topic


## Run Locally

**Remember to run this first**

Clone the project

```bash
  git clone https://github.com/NickEsColR/react-gpt.git
```

Go to the project directory

```bash
  cd react-gpt
```

Install dependencies

```bash
  npm Install
```

Start the application

```bash
  npm run dev
```


## Tech Stack

**Client:** 

- React 
- React Router
- React Markdown

**Server:** 

- NestJS
- OpenAI

