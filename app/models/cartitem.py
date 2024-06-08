from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .item import Item

class CartItem(db.Model):
    __tablename__ = "cart_items"

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("items.id")), nullable=False)#db.ForeignKey(add_prefix_for_prod("items.id")),
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)# db.ForeignKey(add_prefix_for_prod("users.id")),
    size = db.Column(db.String(25), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # item = db.relationship("Item", back_populates="cart_items")
    # user = db.relationship("User", back_populates="cart_items")

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

#comment
