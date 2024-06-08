from .db import db, environment, SCHEMA, add_prefix_for_prod
from .orderitem import OrderItem
class Item(db.Model):
    __tablename__ = "items"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(1024), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    sizes = db.Column(db.String(255), nullable=False)
    in_stock = db.Column(db.Boolean, nullable=False)
    main_image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # cart_items = db.relationship("CartItem", back_populates="item", cascade="all, delete-orphan")
    item_orders = db.relationship("Order", back_populates="order_items", secondary=OrderItem.__table__)
    reviews = db.relationship("Review", back_populates="item", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "description": self.description,
            "price": self.price,
            "sizes": self.sizes,
            "in_stock": self.in_stock,
            "main_image": self.main_image,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
