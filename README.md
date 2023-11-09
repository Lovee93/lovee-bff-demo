
# Quickstart: BFF Demo (GCP)

This repository consists of 4 differnt projects: 

- **Product Service Cloud Function (NodeJS):** Returns a list of products available with skuId being the unique identifier.

- **Inventory Service Cloud Function (Python):** Returns the list of denominations and stock available for each of those denominations per skuId.

- **Mobile BFF Cloud Function (NodeJS):** This is an example BFF to cover following two scenarios:
    - the users are first able to access the list of products available
    - when they click into 1 product, that's when they see the inventory for that product.
    And hence the BFF basically stitches the data for this purpose.     
- **API BFF Cloud Run + Redis Cache using Google Memorystore (Typescript):** This is another example BFF for the scenario when we want to return all the products along with the inventory at once. We are assuming that products that are retrieved don't change much and hence we cache that data and serve it from there. Just for the example purpose here, the cache key is deleted every 10 seconds. 

## How to run these projects?

For all the NodeJS and Typescript projects, nothing special just the standard:

`npm i` to install all dependencies and then run  `npm run dev `.

For the python one, install dependencies:
```
pip install -r requirements.txt
PATH=$PATH:~/.local/bin
```
And run `functions-framework-python --target get_inventory`

Or feel free to browse through the [GCP documentation](https://docs.google.com/document/d/16Jtbkcx4XctY83Qo_Yx0YBBgXpRcyefRmZCFdncAu2Q/edit?usp=sharing) used for this example. 

Also, you'll need to run redis in a docker for the API BFF to work.