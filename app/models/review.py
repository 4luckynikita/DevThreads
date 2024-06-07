from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .item import Item

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    body = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    user = db.relationship("User", back_populates="reviews")
    item = db.relationship("Item", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "item_id": self.item_id,
            "rating": self.rating,
            "body": self.body,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
