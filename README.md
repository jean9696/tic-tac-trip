# Tic tac trip test

## Description

Small server written in Koa that follows the [instructions of the test.](https://tictactrip.notion.site/Back-46162bfe474248f4b79672979efcc379)

## Installation
    
```bash
   yarn
```

## Usage

```bash
   yarn start
```

### Watch mode
```bash
   yarn start:dev
```

## API

### POST /api/token

Returns a token to be used in the other routes

#### Body

Content type: `application/json`

```json
{
  "email": string
}
```

Return

```json
{ 
  "token": string
}
```

### POST /api/justify

Returns a justified text with 80 characters per line.

### Rate limit

80 000 characters per day per token

#### Limitations
* The justify function doesn't allow to match exactly the given output as I was not able to find all the rules with the time I gave to the test.
* Rate limiting does not work with multiple instances

#### Body

Content-type: `text/plain`
