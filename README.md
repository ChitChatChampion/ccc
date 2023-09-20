# chit-chat-champion

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## TRADE DEAL
```
POST /base-context/save
You receive:
{
  "purpose": "first date",
  "relationship": "acquaintances",
  "description": "20-year-old singaporean university computing students who have no social life"
}
I receive:
200: {}
201: {}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /base-context/read
You receive:
{}
I receive:
200: {
  "purpose": "first date",
  "relationship": "acquaintances",
  "description": "20-year-old singaporean university computing students who have no social life"
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /csc-context/save
You receive:
{
  "number_of_questions": 10
}
I receive:
200: {}
201: {}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /csc-context/read
You receive:
{}
I receive:
200: {
  "number_of_questions": 10
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /bb-context/save
You receive:
{
  "number_of_prompts": 10
}
I receive:
200: {}
201: {}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /bb-context/read
You receive:
{}
I receive:
200: {
  "number_of_prompts": 10
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /csc/questions/generate
You receive:
{}
I receive:
201: {
  "questions": [
    {
      "id": 11357890,
      "text": "What do you do for a living?"
    }
  ]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /csc/questions/create
You receive:
{}
I receive:
201: {
  "questions": [
    {
      "id": 11357890,
      "text": "What do you do for a living?"
    }
  ]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /csc/questions/read
You receive:
{}
I receive:
200: {
  "questions": [
    {
      "id": 11357890,
      "text": "What do you do for a living?"
    }
  ]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /csc/questions/update
You receive:
{
  "id": 11357890
}
I receive:
200: {
  "questions": [
    {
      "id": 11357890,
      "text": "What do you do for a living?"
    }
  ]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /csc/questions/delete
You receive:
{
  "id": 11357890
}
I receive:
200: {
  "questions": [
    {
      "id": 11357890,
      "text": "What do you do for a living?"
    }
  ]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /csc/create
You receive:
{}
I receive:
201: {
  "id": "ABGED"
}

POST /bb/prompts/generate
You receive:
{}
I receive:
201: {
  "questions": [
    {
      "id": 11357890,
      "text": "Who's most likely to love C++?"
    }
  ]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /bb/prompts/create
You receive:
{}
I receive:
201: {
  "prompts": [
    {
      "id": 11357890,
      "text": "Who's most likely to love C++?"
    }
  ]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /bb/prompts/read
You receive:
{}
I receive:
200: {
  "prompts": [
    {
      "id": 11357890,
      "text": "Who's most likely to love C++?"
    }
  ]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /bb/prompts/update
You receive:
{
  "id": 11357890
}
I receive:
200: {
  "prompts": [
    {
      "id": 11357890,
      "text": "Who's most likely to love C++?"
    }
  ]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /bb/prompts/delete
You receive:
{
  "id": 11357890
}
I receive:
200: {
  "prompts": [
    {
      "id": 11357890,
      "text": "Who's most likely to love C++?"
    }
  ]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /bb/create
You receive:
{}
I receive:
201: {
  "id": "ABGED"
}

```
