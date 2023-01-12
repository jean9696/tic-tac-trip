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

Try it out: [https://tic-tac-trip.onrender.com](https://tic-tac-trip.onrender.com)

### POST /api/token

Returns a token to be used in the other routes

#### Body

Content type: `application/json`

```ts
{
  email: string
}
```

Return

```ts
{ 
  token: string
}
```

### POST /api/justify

Returns a justified text with 80 characters per line.

### Authentication

Requires a header:`Authorization: Bearer $token`

### Rate limit

80 000 characters per day per token

#### Limitations
* The justify function doesn't allow to match exactly the given output as I was not able to find all the rules with the time I gave to the test.
* Rate limiting does not work with multiple instances

#### Body

Content-type: `text/plain`


## Configuration

The configuration can be done through environment variables.

| Name                      | Description                          | Default |
|---------------------------|--------------------------------------|---------|
| PORT                      | Port to listen to                    | 3000    |
| AUTH_PRIVATE_KEY          | Private key used to sign the token   |         |
| JUSTIFY_RATE_LIMIT_BY_DAY | Number of characters allowed per day | 80000   |
