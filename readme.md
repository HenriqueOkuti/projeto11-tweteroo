# projeto11-Tweteroo API

This is the API to be used on the Tweteroo App.

## How it Works:

On the /sign-up route there is a POST method: it recieves a body on the request with the following parameters

```js
{
    username: "username",
    avatar: "avatar url"
}
```

And the data is saved inside an array on the API. Default return is "OK";

On the /tweets route there are two methods, on the POST: it recieves a body on the request with following parameters

```js
{
    username: "username",
    tweet: "tweet"
}
```

And the data is saved inside an array on the API. Default return is "OK";

On the GET method it return the latest 10 published tweets. Each tweet is returned with the format:

```js
{
    username: "username",
    avatar: "avatar url,
    tweet: "tweet"
}
```
