from app.models import db, Item, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text

def seed_items():
    contrast_tipping_polo = Item(
        name="Contrast Tipping Polo",
        type="Shirt",
        description="Look sharp in this Original Penguin men’s polo shirt. With contrasting tipping on the collar and sleeves, this shirt adds a touch of style to any outfit. The jersey fabrication makes it feel soft against your skin for all-day comfort. The slim fit gives a modern silhouette and our iconic Pete logo on the chest adds sporty style to this men’s collared shirt.",
        price=79.99,
        sizes="XS,S,M,L,XL,XXL",
        in_stock=True,
        main_image="https://res.cloudinary.com/dkxfjbynk/image/upload/v1717488632/a8b13528-52f6-4462-be38-702d91931225.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    ck_slim_fit_suit_pants = Item(
        name="CK Slim Fit Suit Separates Pants",
        type="Pants",
        description="These pants from Calvin Klein feature a plaid pattern that will keep your look relevant for years to come. Match with other pieces in the collection.",
        price=134.99,
        sizes="36x30,38x30,40x30,42x30",
        in_stock=True,
        main_image="https://res.cloudinary.com/dkxfjbynk/image/upload/v1717488678/aa6fae7f-eff0-45e7-888c-861ee927ff56.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    contrast_tipping_polo2 = Item(
        name="Contrast Tipping Polo",
        type="Shirt",
        description="Look sharp in this Original Penguin men’s polo shirt. With contrasting tipping on the collar and sleeves, this shirt adds a touch of style to any outfit. The jersey fabrication makes it feel soft against your skin for all-day comfort. The slim fit gives a modern silhouette and our iconic Pete logo on the chest adds sporty style to this men’s collared shirt.",
        price=79.99,
        sizes="XS,S,M,L,XL,XXL",
        in_stock=True,
        main_image="https://res.cloudinary.com/dkxfjbynk/image/upload/v1717488632/a8b13528-52f6-4462-be38-702d91931225.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    ck_slim_fit_suit_pants2 = Item(
        name="CK Slim Fit Suit Separates Pants",
        type="Pants",
        description="These pants from Calvin Klein feature a plaid pattern that will keep your look relevant for years to come. Match with other pieces in the collection.",
        price=134.99,
        sizes="36x30,38x30,40x30,42x30",
        in_stock=True,
        main_image="https://res.cloudinary.com/dkxfjbynk/image/upload/v1717488678/aa6fae7f-eff0-45e7-888c-861ee927ff56.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    contrast_tipping_polo3 = Item(
        name="Contrast Tipping Polo",
        type="Shirt",
        description="Look sharp in this Original Penguin men’s polo shirt. With contrasting tipping on the collar and sleeves, this shirt adds a touch of style to any outfit. The jersey fabrication makes it feel soft against your skin for all-day comfort. The slim fit gives a modern silhouette and our iconic Pete logo on the chest adds sporty style to this men’s collared shirt.",
        price=79.99,
        sizes="XS,S,M,L,XL,XXL",
        in_stock=True,
        main_image="https://res.cloudinary.com/dkxfjbynk/image/upload/v1717488632/a8b13528-52f6-4462-be38-702d91931225.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    ck_slim_fit_suit_pants3 = Item(
        name="CK Slim Fit Suit Separates Pants",
        type="Pants",
        description="These pants from Calvin Klein feature a plaid pattern that will keep your look relevant for years to come. Match with other pieces in the collection.",
        price=134.99,
        sizes="36x30,38x30,40x30,42x30",
        in_stock=True,
        main_image="https://res.cloudinary.com/dkxfjbynk/image/upload/v1717488678/aa6fae7f-eff0-45e7-888c-861ee927ff56.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add_all([contrast_tipping_polo, ck_slim_fit_suit_pants, contrast_tipping_polo2, ck_slim_fit_suit_pants2, contrast_tipping_polo3, ck_slim_fit_suit_pants3])
    db.session.commit()

def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
