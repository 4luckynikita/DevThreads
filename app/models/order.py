from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from datetime import timedelta
from sqlalchemy import Numeric, func, text

from .orderitem import OrderItem


class Order(db.Model):
    __tablename__ = "orders"

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)#db.ForeignKey(add_prefix_for_prod("users.id")),
    total = db.Column(Numeric(precision=10, scale=2), nullable=False)
    status = db.Column(db.String(25), nullable=False)
    delivery_date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # user = db.relationship("User", back_populates="orders")
    order_items = db.relationship("Item", back_populates="item_orders", secondary=OrderItem.__table__)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total": float(self.total),
            "status": self.status,
            "delivery_date": self.delivery_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
