from flask import Blueprint, jsonify, request
from app.models import User, db, Item
from flask_login import login_required, current_user
from datetime import datetime
item_routes = Blueprint('items', __name__)

# Get all items
@item_routes.route("/")
def items():
    fetched_items = Item.query.all()
    item_array = []
    for item in fetched_items:
        item_dict = item.to_dict()
        item_array.append(item_dict)
    return {'items':item_array}

# Get specific item by id
@item_routes.route("/<int:id>")
def item(id):
    found_item = Item.query.get(id)
    if (found_item):
        item_dict = found_item.to_dict()
        
        return { "item": item_dict }
    else:
        return { "message" : "Item could not be found" }, 404