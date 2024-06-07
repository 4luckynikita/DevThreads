from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from datetime import timedelta
from sqlalchemy import Numeric, func, text


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    total = db.Column(Numeric(precision=10, scale=2), nullable=False)
    status = db.Column(db.String(25), nullable=False)
    delivery_date = db.Column(db.DateTime, nullable=False, default=func.datetime(func.current_timestamp(), text("'+' || '5 minutes'")))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    user = db.relationship("User", back_populates="orders")
    order_items = db.relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total": self.total,
            "status": self.status,
            "delivery_date": self.delivery_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
