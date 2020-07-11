
# Start app
```bash 
npm install

node app.js
```

# APIs


## API request.

### Product API

```bash
post('/product')
body: {
    "name": "Product1",
    "price": 300000,
    "categories": ["5f09d2a8c456edcb86725bb6"],
    "description": "Some discription"
}
success Response
    {
    "success": true,
    "data": {
        "categories": [
            "5f09d2a8c456edcb86725bb6"
        ],
        "_id": "5f09d4d9c456edcb86725bbc",
        "name": "Product1",
        "price": 300000,
        "description": "Some discription",
        "createdAt": "2020-07-11T15:03:53.982Z",
        "updatedAt": "2020-07-11T15:24:19.504Z",
        "__v": 0
    }
}
```

```bash
get('/product/:categoryId')
success Response
{
    "success": true,
    "data": [
        {
            "categories": [
                "5f09d2a8c456edcb86725bb6"
            ],
            "_id": "5f09d4d9c456edcb86725bbc",
            "name": "Product1",
            "price": 300000,
            "description": "Some discription",
            "createdAt": "2020-07-11T15:03:53.982Z",
            "updatedAt": "2020-07-11T15:24:19.504Z",
            "__v": 0
        }
    ]
}
```

```bash
put('/product/:productId')
Request Body
{
    "name": "Product1",
    "price": 300000,
    "categories": ["5f09d2a8c456edcb86725bb6"],
    "description": "Some discription"
}

Success Response
{
    "success": true,
    "data": {
        "categories": [
            "5f09d2a8c456edcb86725bb6"
        ],
        "_id": "5f09d4d9c456edcb86725bbc",
        "name": "Product1",
        "price": 300000,
        "description": "Some discription",
        "createdAt": "2020-07-11T15:03:53.982Z",
        "updatedAt": "2020-07-11T15:28:44.417Z",
        "__v": 0
    }
}
    
```

### Category API

```bash
post('/category')
Request Body:
{
    "name": "SomethingElse",
    "parent": ""
}

Success Response: 
{
    "success": true,
    "data": {
        "_id": "5f09db7252aa9fce97de28d8",
        "name": "NothingElse",
        "parentCategory": "Something",
        "createdAt": "2020-07-11T15:32:02.612Z",
        "updatedAt": "2020-07-11T15:32:02.612Z",
        "__v": 0
    }
}

```

```bash
get('/category')
Success Response: {
    "success": true,
    "data": [
        {
            "_id": "5f09d302c456edcb86725bb7",
            "name": "SomethingElse",
            "parentCategory": "5f09d302c456edcb86725bb7",
            "createdAt": "2020-07-11T14:56:02.075Z",
            "updatedAt": "2020-07-11T14:56:02.075Z",
            "__v": 0,
            "child_categories": []
        },
        {
            "_id": "5f09db6b52aa9fce97de28d6",
            "name": "Nothing",
            "parentCategory": "5f09db6b52aa9fce97de28d6",
            "createdAt": "2020-07-11T15:31:55.461Z",
            "updatedAt": "2020-07-11T15:31:55.461Z",
            "__v": 0,
            "child_categories": []
        },
        {
            "_id": "5f09db7252aa9fce97de28d8",
            "name": "NothingElse",
            "parentCategory": "5f09db7252aa9fce97de28d8",
            "createdAt": "2020-07-11T15:32:02.612Z",
            "updatedAt": "2020-07-11T15:32:02.612Z",
            "__v": 0,
            "child_categories": []
        }
    ]
}
```