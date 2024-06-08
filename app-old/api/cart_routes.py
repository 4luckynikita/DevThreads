from flask import Blueprint, jsonify, request
from app.models import User, db, CartItem, Item
from flask_login import login_required, current_user
from datetime import datetime
from ..forms.cartitem_form import CartItemForm
cart_routes = Blueprint('cartitems', __name__)

#Get all cart items with descriptions
@cart_routes.route('/<int:id>', methods=["GET"])
@login_required
def cart_items(id):
    fetched_cart_items = CartItem.query.filter(CartItem.user_id == id).all()
    cart_item_array = []
    for cart_item in fetched_cart_items:
        cart_item_dict = cart_item.to_dict()
        cart_item_description = Item.query.filter(Item.id == cart_item.item_id).all()
        cart_item_dict['description'] = cart_item_description[0].to_dict()
        cart_item_array.append(cart_item_dict)
    return cart_item_array

# Create cart item
@cart_routes.route("/", methods=["POST"])
@login_required
def create_cart_item():
    form = CartItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_cart_item = CartItem(
            item_id = form.data["item_id"],
            user_id = form.data["user_id"],
            size = form.data["size"],
            quantity = form.data["quantity"]
        )
        db.session.add(new_cart_item)
        db.session.commit()
        return new_cart_item.to_dict(), 200
    return form.errors, 400

# Delete cart item
@cart_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_cart_item(id):
    found_cart_item = CartItem.query.get(id)
    if not found_cart_item:
        return {  "message": "Cart Item could not be found" }, 404
    if found_cart_item.user_id != current_user.id:
        return {"message": "This is not your cart item!"}, 401
    else:
        db.session.delete(found_cart_item)
        db.session.commit()
        return { "message": "Cart Item deleted successfully" }, 200
    
# Update cart item
@cart_routes.route("/<int:id>", methods=["PUT"])
def update_cart_item(id):
    form = CartItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    old_cart_item = CartItem.query.get(id)
    if not old_cart_item:
        return {"message": "Album could not be found"}, 404
    if old_cart_item.user_id != current_user.id:
        return {"message": "This is not your album"}, 401
    if form.validate_on_submit():
        old_cart_item.size = form.data["size"]
        old_cart_item.quantity = form.data["quantity"]
        db.session.commit()
        return old_cart_item.to_dict(), 200
    return form.errors, 400
