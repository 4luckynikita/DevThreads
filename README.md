# DevThreads
https://devthreads-s2hk.onrender.com/

#
DevThreads is a hot new site that sells clothing catered to stereotypical big city software engineers. DevThreads intends to be along the lines of other clothing brand websites, featuring apparel, a cart, a way to place and the ability to track these orders, as well as in-person locations. DevThreads is a one stop shop for any pants, flannels, dress shoes, or suits one might want to present their fullstack project while looking stylish!

## Run DevThreads Locally

**Prerequisites**
- NPM
- A version of Node.js >= 14 on your local machine
- Python 3.9
- PostgreSQL or SQLite3 in dev environment

**Installation**
- Clone the repo
- Install dependencies ```pipenv install -r requirements.txt```
- `cd react-app` and run `npm install`
- Create a **.env** file based on the example with proper settings for your development environment
- Setup a PostgreSQL database, user, and password and make sure they match your **.env** file.
- Get into your pipenv, migrate your database, seed your database, and run your app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   python run.py

- Start the backend Flask server: `python run.py` 
- Start the frontend Vite server: `npm run dev`
- Ctrl/Command click the ```localhost:XXXX``` link in the Vite server to open the live link!

# Connect
[Nikita Kastyshyn](https://www.linkedin.com/in/nikitakastyshyn/) 

---
## This project was built with:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Endpoints
Start by logging in:
### Log In User
- Method: POST
- URL: `/api/auth/login`
- Body:

    ```json
    {
      "email": "demo@aa.io",
      "password": "password"
    }
    ```

- Successful Response:
  ```json
  {
    "is_musician": false,
    "email": "demo@aa.io",
    "firstname": "Demo",
    "id": 3,
    "lastname": "User",
    "username": "demouser",
  }
  ```

---
### Get all cart items
- Method: GET
- URL: `/api/cart/:userId`
- Body: None

- Successful Response:
  ```json
  {
    "items": [
      {
         "created_at": "Mon, 10 Jun 2024 09:40:21 GMT",
         "description": "A smart spread-collar shirt is cut from finely textured yet substantial oxford cloth and tailored with pleats, a French placket and rounded, adjustable cuffs. Featuring Removable collar stays, Adjustable button cuffs, and more.",
         "id": 1,
         "in_stock": true,
         "main_image": "https://devthreads.s3.amazonaws.com/Trim+Fit+Royal+Oxford+Dress+Shirt.png",
         "name": "D.D. Trim Fit Royal Oxford",
         "price": 129.99,
         "sizes": "14,15,16,17,18",
         "type": "Shirt",
         "updated_at": "Mon, 10 Jun 2024 09:40:21 GMT"
      },
      {
         "created_at": "Mon, 10 Jun 2024 09:40:21 GMT",
         "description": "A nice and cool shirt, a French placket and rounded, adjustable cuffs. Featuring Removable collar stays, Adjustable button cuffs, and more.",
         "id": 2,
         "in_stock": true,
         "main_image": "https://devthreads.s3.amazonaws.com/Nice+Shirt+Real+Url.png",
         "name": "Awesome Nice and cool",
         "price": 32.99,
         "sizes": "14,15,16,17,18",
         "type": "Shirt",
         "updated_at": "Mon, 10 Jun 2024 09:40:21 GMT"
      }
    ]
  }
  ```

### Create a cart item
- Method: POST
- URL: `/api/cart/`
- Body:

    ```json
    {
      "item_id": 2,
      "user_id": 1,
      "size": "XL",
      "quantity": 1,
    }
    ```

- Successful Response:
  ```json
  {
      "item_id": 2,
      "user_id": 1,
      "size": "XL",
      "quantity": 1,
      "updated_at": "Mon, 10 Jun 2024 09:40:21 GMT",
      "created_at": "Mon, 10 Jun 2024 09:40:21 GMT",
      "id": 3
  }
  ```


### Update a cart item
- Method: PUT
- URL: `/api/cart/:cartItemId`
- Body:

    ```json
    {
      "size": "XL",
    }
    ```

- Successful Response:
  ```json
  {
      "item_id": 2,
      "user_id": 1,
      "size": "L",
      "quantity": 1,
      "updated_at": "Mon, 11 Jun 2024 11:40:31 GMT",
      "created_at": "Mon, 10 Jun 2024 09:40:21 GMT",
      "id": 3
  }
  ```

  ### Delete a cart item
- Method: DELETE
- URL: `/api/cart/:cartItemId`
- Body: None

- Successful Response:
  ```json
  {
    "message": "Cart Item deleted successfully."
  }
  ```
--

### Create an order
- Method: POST
- URL: `/api/orders/`
- Body:
  ```json
  {
    "user_id": 1,
    "total": 100.50,
    "status": "Awaiting Shipment"
  }
  ```
- Successful Response:
  ```json
  {
    "id": 1,
    "user_id": 1,
    "total": 100.50,
    "status": "Awaiting Shipment",
    "delivery_date": "2024-07-02T09:40:21.000Z",
    "created_at": "2024-07-02T09:40:21.000Z",
    "updated_at": "2024-07-02T09:40:21.000Z"
  }
  ```

### Create an order item
- Method: POST
- URL: `/api/orders/item`
- Body:
  ```json
  {
    "order_id": 1,
    "item_id": 2,
    "user_id": 1,
    "size": "L",
    "quantity": 1
  }
  ```
- Successful Response:
  ```json
  {
    "id": 1,
    "order_id": 1,
    "item_id": 2,
    "user_id": 1,
    "size": "L",
    "quantity": 1,
    "created_at": "2024-07-02T09:40:21.000Z",
    "updated_at": "2024-07-02T09:40:21.000Z"
  }
  ```

### Get a user's orders and associated items
- Method: GET
- URL: `/api/orders/:id`
- Body: None
- Successful Response:
  ```json
  [
    {
      "id": 1,
      "user_id": 1,
      "total": 100.50,
      "status": "Awaiting Shipment",
      "delivery_date": "2024-07-02T09:40:21.000Z",
      "created_at": "2024-07-02T09:40:21.000Z",
      "updated_at": "2024-07-02T09:40:21.000Z",
      "items": [
        {
          "id": 1,
          "order_id": 1,
          "item_id": 2,
          "user_id": 1,
          "size": "L",
          "quantity": 1,
          "created_at": "2024-07-02T09:40:21.000Z",
          "updated_at": "2024-07-02T09:40:21.000Z",
          "details": {
            "id": 2,
            "name": "Awesome Nice and cool",
            "type": "Shirt",
            "description": "A nice and cool shirt, a French placket and rounded, adjustable cuffs.",
            "price": 32.99,
            "sizes": "14,15,16,17,18",
            "in_stock": true,
            "main_image": "https://devthreads.s3.amazonaws.com/Nice+Shirt+Real+Url.png",
            "created_at": "2024-07-02T09:40:21.000Z",
            "updated_at": "2024-07-02T09:40:21.000Z"
          }
        }
      ]
    }
  ]
  ```

### Delete an order and associated OrderItems
- Method: DELETE
- URL: `/api/orders/delete/:id`
- Body: None
- Successful Response:
  ```json
  {
    "message": "Order deleted successfully"
  }
  ```

### Update an Order
- Method: PUT
- URL: `/api/orders/:id`
- Body:
  ```json
  {
    "total": 120.75
  }
  ```
- Successful Response:
  ```json
  {
    "id": 1,
    "user_id": 1,
    "total": 120.75,
    "status": "Awaiting Shipment",
    "delivery_date": "2024-07-02T09:40:21.000Z",
    "created_at": "2024-07-02T09:40:21.000Z",
    "updated_at": "2024-07-02T09:40:21.000Z"
  }
  ```

### Update an Order Item
- Method: PUT
- URL: `/api/orders/item/:id`
- Body:
  ```json
  {
    "size": "XL",
    "quantity": 2
  }
  ```
- Successful Response:
  ```json
  {
    "id": 1,
    "order_id": 1,
    "item_id": 2,
    "user_id": 1,
    "size": "XL",
    "quantity": 2,
    "created_at": "2024-07-02T09:40:21.000Z",
    "updated_at": "2024-07-02T09:40:21.000Z"
  }
  ```

---