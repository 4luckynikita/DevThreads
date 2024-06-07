from flask import Blueprint, jsonify, request
from app.models import User, db, Order, OrderItem, Item
from ..forms.order_form import OrderForm
from ..forms.orderitem_form import OrderItemForm
from flask_login import login_required, current_user
from datetime import datetime
order_routes = Blueprint('orders', __name__)

# Create an order
@order_routes.route('/', methods=["POST"])
@login_required
def create_order():
    form = OrderForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_order = Order(
            user_id = form.data["user_id"],
            total = form.data["total"],
            status = form.data["status"]
        )
        db.session.add(new_order)
        db.session.commit()
        return new_order.to_dict()
    return form.errors, 400

# Create an order item
@order_routes.route('/item', methods=["POST"])
@login_required
def create_order_item():
    form = OrderItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        new_order_item = OrderItem(
            order_id = form.data["order_id"],
            item_id = form.data["item_id"],
            user_id = form.data["user_id"],
            size = form.data["size"],
            quantity = form.data["quantity"]
        )
        db.session.add(new_order_item)
        db.session.commit()
        return new_order_item.to_dict()
    return form.errors, 400

# Get a user's orders and associated items
@order_routes.route('/<int:id>')
@login_required
def get_all_orders(id):
    found_orders = Order.query.filter(Order.user_id == id).all()
    orders_with_items = []
    if found_orders:
        for order in found_orders:
            order_dict = order.to_dict()
            order_items = OrderItem.query.filter(OrderItem.order_id == order.id)
            order_dict['items'] = [item.to_dict() for item in order_items]
            i = 0
            for item in order_items:
                found_item = Item.query.get(item.id)
                order_dict['items'][i]['details'] = found_item.to_dict()
                i = i + 1

            orders_with_items.append(order_dict)
        return orders_with_items
    else:
        return []
    
# Delete an order and associated OrderItems
@order_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_order(id):
    found_order = Order.query.get(id)
    if not found_order:
        return {  "message": "Cart Item could not be found" }, 404
    if found_order.user_id != current_user.id:
        return {"message": "This is not your cart item!"}, 401
    else:
        db.session.delete(found_order)
        db.session.commit()
        return { "message": "Order deleted successfully" }, 200
    
# Update an Order Item
@order_routes.route("/item/<int:id>", methods=["PUT"])
def update_order_item(id):
    form = OrderItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    old_order_item = OrderItem.query.get(id)
    if not old_order_item:
        return {"message": "Album could not be found"}, 404
    if old_order_item.user_id != current_user.id:
        return {"message": "This is not your album"}, 401
    if form.validate_on_submit():
        old_order_item.size = form.data["size"]
        old_order_item.quantity = form.data["quantity"]
        db.session.commit()
        return old_order_item.to_dict(), 200