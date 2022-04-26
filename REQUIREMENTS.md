# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

1- ###user

- [signup]
  POST localhost:3000/api/user/signup HTTP/1.1
  Host: localhost:3000
  Content-Length: 202

{
"username":"aml fakhri 12",
"firstname":"aml",
"lastname": "fakhri",
"email":"aml_fakhri12@gmail.com",
"password":"223344",
"country":"egypt",
"phone":"021345457"
}

- [login]
  POST localhost:3000/api/user/login HTTP/1.1
  Host: localhost:3000
  Content-Length: 55

{
"username": "aml fakhri 12",
"password":"223344"
}

- [getById]
  GET localhost:3000/api/user/1 HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

2- category

- [create]
  POST localhost:3000/api/category HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw
  Content-Length: 29

{
"name":"category 5"
}

- [getById]
  GET localhost:3000/api/category/1 HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

- [getAllCategories]
  GET localhost:3000/api/category HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

3 - product

- [create]
  POST localhost:3000/api/product HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw
  Content-Length: 66

{
"name":"product 6",
"price":30,
"categoryId":2
}

- [getAll]
  GET localhost:3000/api/product HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

- [getById]
  GET localhost:3000/api/product/1 HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

- [getByCategoryId]
  GET localhost:3000/api/product/category/1 HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

- [getTopProduct]
  GET localhost:3000/api/product/top-products HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

4- order

- [create]
  POST localhost:3000/api/order HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw
  Content-Length: 82

{
"status":"active",
"quantity": 3,
"product_id": 6,
"user_id": 1
}

- [getById]
  GET localhost:3000/api/order/2 HTTP/1.1
  Host: localhost:3000
  Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

  - [getOrdersByUserId]
    GET localhost:3000/api/order/product/1 HTTP/1.1
    Host: localhost:3000
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

  - [getCompleteOrder]
    GET localhost:3000/api/order/complete-product/1 HTTP/1.1
    Host: localhost:3000
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

  - [getAllOrders]
    GET localhost:3000/api/order HTTP/1.1
    Host: localhost:3000
    Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0ODhjYmY4LTIyMzMtNDYxNC1hZmVhLTM2ZDI1NTE2NmFmYSIsInVzZXJJZCI6MzQsImlhdCI6MTY1MDUzODM1NCwiZXhwIjoxNjUzMTMwMzU0fQ.uCNDyloWwsWX5-eA7sw38zIPNB_nOMDjlxMv3Y1hkaw

#### Products

- Index
- Show (args: product id)
- Create (args: Product)[token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show (args: id)[token required]
- Create (args: User)[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
