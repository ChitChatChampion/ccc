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
GET /csc/context
You receive:
{}
I receive:
200: {
  baseContext: {
      "purpose": "first date",
      "relationship": "acquaintances",
      "description": "20-year-old singaporean university computing students who have no social life"
  },
  cscContext: {
      "numberOfCards": 10
  },
  questions: [{"id": 123, "What is your favorite food?"}, {"id:234, "What is your favorite icecream?"}]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

GET /bb/context
You receive:
{}
I receive:
200: {
  baseContext: {
      "purpose": "first date",
      "relationship": "acquaintances",
      "description": "20-year-old singaporean university computing students who have no social life"
  },
  bbContext: {
      "numberOfCards": 10
  },
  questions: [{"id": 123, "content": "Who is more likely to burn down the computing building?"}, {"id": 123, "content": "Who is the most likely to use Haskel?"}]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /csc/questions/create
You receive:
{}
I receive:
201: {
      "id": 11357890,
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

PUT /csc/questions/:id
You receive:
{
  content: "Who is more likely to burn down the computing building?"
}
I receive:
201: {
      "id": 11357890,
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

GET /csc/questions
You receive:
{
}
I receive:
201:
{
questions: [
{
      "id": 11357891,
      "text": "Who is more likely to burn down the computing building?"
},
{
      "id": 11357890,
      "text": "Who is more likely to burn down the computing building?"
}
]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

DELETE /csc/questions/:id
You receive:
{
}
I receive:
201: {
      "id": 11357890,
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /room/csc/create
You receive:
{}
I receive:
201: {
  "id": "ABGED"
}














GET /bb/context
You receive:
{}
I receive:
200: {
  baseContext: {
      "purpose": "first date",
      "relationship": "acquaintances",
      "description": "20-year-old singaporean university computing students who have no social life"
  },
  bbContext: {
      "numberOfCards": 10
  },
  questions: [{"id": 123, "What is your favorite food?"}, {"id:234, "What is your favorite icecream?"}]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

GET /bb/context
You receive:
{}
I receive:
200: {
  baseContext: {
      "purpose": "first date",
      "relationship": "acquaintances",
      "description": "20-year-old singaporean university computing students who have no social life"
  },
  bbContext: {
      "numberOfCards": 10
  },
  questions: [{"id": 123, "content": "Who is more likely to burn down the computing building?"}, {"id": 123, "content": "Who is the most likely to use Haskel?"}]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /bb/questions/create
You receive:
{}
I receive:
201: {
      "id": 11357890,
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

PUT /bb/questions/:id
You receive:
{
  content: "Who is more likely to burn down the computing building?"
}
I receive:
201: {
      "id": 11357890,
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

GET /bb/questions
You receive:
{
}
I receive:
201:
{
questions: [
{
      "id": 11357891,
      "text": "Who is more likely to burn down the computing building?"
},
{
      "id": 11357890,
      "text": "Who is more likely to burn down the computing building?"
}
]
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

DELETE /bb/questions/:id
You receive:
{
}
I receive:
201: {
      "id": 11357890,
}
400: { "error": "Haiya" }
401: { "error": "Haiya" }

POST /room/bb/create
You receive:
{}
I receive:
201: {
  "id": "ABGED"
}
```
