import flask
import functions_framework
import json

@functions_framework.http
def get_inventory(request: flask.Request) -> flask.typing.ResponseReturnValue:
    with open('inventory.json', 'r') as file:
        product_inventory = json.load(file)
    return product_inventory["products"]