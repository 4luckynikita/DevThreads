from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .item import Item

class CartItem(db.Model):
    __tablename__ = "cart_items"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    size = db.Column(db.String(25), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    item = db.relationship("Item", back_populates="cart_items")
    user = db.relationship("User", back_populates="cart_items")

    def to_dict(self):
        return {
            "id": self.id,
            "item_id": self.item_id,
            "user_id": self.user_id,
            "size": self.size,
            "quantity": self.quantity,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
