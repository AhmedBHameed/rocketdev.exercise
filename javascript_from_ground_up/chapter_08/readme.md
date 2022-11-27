# Ajax & JSON practices

## Start solving

- Add the previous homework from Chapter_06 (Login form) to login page from this express server.
- Add a function to make asynchronous http call to the end-point `http://localhost:9000/api/login` (POST method) including payload of user username and password as JSON (Use XmlHttpRequest only).

Note that the valid user we have in the backend is:

```json
{
  "id": 1,
  "username": "abc",
  "password": "123456"
}
```

- If user logged in successful, redirect the user to home or root page (From client side not the a backend redirection) using `window.location.href = "http://localhost:9000/"`)
- Handle the error so we can see an error message under the login button when an error triggered from the http status code.
- Scope of solution [script.js](./public/home/script.js).
- Scope of solution [style.css](./public/home/style.css).

### More information:

The server has 2 end-points serving as REST API

- `POST /api/login`
- `GET /api/logout`

The root `/` is serving home page as html.

## How to check your solution is correct

- As soon you redirect to root page, the page should show you:

```html
<h1>You have successfully logged in. Welcome to home page</h1>
```

If not then you will see an error message.

## How to run the server:

- run `npm install`
- run `npm run start`
