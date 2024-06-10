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
        main_image="https://devthreads.s3.amazonaws.com/penguin+polo.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    ck_slim_fit_suit_pants = Item(
        name="Calvin Klein Slim Fit Suit Separates",
        type="Pants",
        description="These pants from Calvin Klein feature a plaid pattern that will keep your look relevant for years to come. Match with other pieces in the collection.",
        price=134.99,
        sizes="36x30,38x30,40x30,42x30",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/CK+pants.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    super_high_waisted_pants = Item(
        name="High Waisted Straight Ankle",
        type="Pants",
        description="This Editor pant is one of the world's most versatile pants. These chic gray straight pants are the perfect addition to your closet this season. The ankle length looks great with a heel or a flat. Pair with the matching blazer for an easy styled look.",
        price=29.99,
        sizes="Regular 2,Regular 4,Regular 6,Regular 8,Regular 10",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/super+high+waisted+pants.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    skimming_draped_mock = Item(
        name="Skimming Draped Mock Neck Tank",
        type="Shirt",
        description="A chic mock neck top with a draped design. Perfect for days in the office or after work happy hours. The ease of styling, high quality materials, and the low cost make this a must have for anyone who wants to appear professionally modern.",
        price=33.99,
        sizes="XS,S,M,L,XL,XXL",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Skimming+Draped+Mock.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    trim_fit_royal_oxford = Item(
        name="D.D. Trim Fit Royal Oxford",
        type="Shirt",
        description="A smart spread-collar shirt is cut from finely textured yet substantial oxford cloth and tailored with pleats, a French placket and rounded, adjustable cuffs. Featuring Removable collar stays, Adjustable button cuffs, and more.",
        price=129.99,
        sizes="14,15,16,17,18",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Trim+Fit+Royal+Oxford+Dress+Shirt.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    

    t_classic_gentleman_bracelet = Item(
        name="T-Classic Steel Bracelet",
        type="Watch",
        description="Boasting impeccable craftsmanship and everyday sophistication, this watch features an accurate Swiss movement and a cleanly styled sunray dial. The craftsmanship of this time piece is sure to stun the beholder.",
        price=424.99,
        sizes="20mm band width",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/T-Classic+Gentleman+Bracelet.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    commuter_straight_fit = Item(
        name="Rhone Commuter Straight Fit",
        type="Pants",
        description="A flat front and smart fit take you anywhere in comfortable four-way-stretch pants fitted with secure hidden pockets for your phone, currency or tunes. Stylishly display your professionalism with a pair from DevThreads!",
        price=134.99,
        sizes="36x30,38x30,40x30,42x30",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Commuter+Straight+Fit+Pants.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    
    upton_plain_toe_derby = Item(
        name="Upton Plain Toe Derby (Men)",
        type="Shoes",
        description="Supreme comfort is on hand with this memory foam–cushioned derby lined in leather and antimicrobial mesh and grounded on a lightweight, flexible TRUFOAM sole. This iteration includes the Lace-up style and a removable insole ",
        price=159.99,
        sizes="9,9.5,10,10.5,11,11.5,12,12.5,13,13.5",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Upton+Plain+Toe+Derby+(Men).png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    horseshoe_buckle_calfskin = Item(
        name="Horseshoe Buckle Calf Skin",
        type="Belt",
        description="Add variety to your work week with this sleek leather belt that lets you choose between brown and black leather thanks to a fully reversible design. The brand epitomizes the values of quality and traditional craftsmanship.",
        price=379.99,
        sizes="1 1/4in W x 47 1/4in L.",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Horseshoe+Buckle+Calfskin.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    regular_fit_cotton_herring = Item(
        name="Regular Fit Cotton Herringbone",
        type="Shirt",
        description="Classic and versatile, this dress shirt tailored from cotton herringbone brings a crisp, smart finish to any semiformal look. The Canali brand is best known for its impeccable suits, sport coats and dress shirts.",
        price=274.99,
        sizes="14,15,16,17,18",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Regular+Fit+Cotton+Herring.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    regular_fit_pro_performance = Item(
        name="Regular Fit Pro Performance",
        type="Pants",
        description="Clean, classic straight-leg pants are cut from lightweight twill that wicks moisture to keep you cool and dry on the course. A concealed zip compartment is tucked inside a rear pocket to provide extra storage.",
        price=159.99,
        sizes="36x30,38x30,40x30,42x30",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Regular+Fit+Performance.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    grandpro_rally_sneaker = Item(
        name="GrandPro Rally Sneaker",
        type="Shoes",
        description="Perforated leather adds smart texture to a stylish sneaker built with GrandFøam cushioning, GrandOS Energy Foam and an Ortholite® footbed for superior comfort.",
        price=159.99,
        sizes="9,9.5,10,10.5,11,11.5,12,12.5,13,13.5",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/GrandPro+Rally+Sneaker.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    tri_stitch_low_top = Item(
        name="Tri Stitch Low Top Sneaker",
        type="Shoes",
        description="Sturdy cotton-linen canvas frames an iconic sneaker sporting a leather tongue and crisscross elastic laces that offer a sleek profile with easy slip-on comfort.",
        price=849.99,
        sizes="9,9.5,10,10.5,11,11.5,12,12.5,13,13.5",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Tri+Stitch+Low+Top+Sneaker.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    emfielder_2_0_polo = Item(
        name="Emfielder 2.0 Polo",
        type="Shirt",
        description="A signature marlin logo brands the chest of a classic piqué-knit polo topped by a textured knit collar. Tommy Bahama's Big & Tall Fit is considered a Classic fit, cut generously with extra room through the chest, armholes and sides.",
        price=109.99,
        sizes="XS,S,M,L,XL,XXL",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Emfielder+2.0+Polo.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    new_lowerdale_quilted_vest = Item(
        name="New Lowerdale Neat Quilted",
        type="Vest",
        description="This sleek, diamond-quilted vest detailed with oversized flap pockets is a layering essential for the season and offers warmth, versatility and style. The Barbour brand is known for its beautifully functional pieces.",
        price=189.99,
        sizes="XS,S,M,L,XL,XXL",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/New+Lowerdale+Quilted+Vest.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    raid_quilted_insulated = Item(
        name="Raid Quilted Insulated",
        type="Vest",
        description="Zip yourself up in comfort with this quilted vest topped by a wind-protecting stand collar and designed with handy pockets. Step into your training schedule and maximize the power of your mind, body and energy. Stay focused, go further, be invincible.",
        price=89.99,
        sizes="XS,S,M,L,XL,XXL",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Raid+Quilted+Insulated+Vest.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    knit_linen_blend_sport = Item(
        name="Knit Linen Blend Sport",
        type="Coat",
        description="Deconstructed tailoring furthers the relaxed look and feel of a sport coat styled from a soft linen knit and patterned in crisp, classic houndstooth. Jack Victor interprets modern wardrobe needs through the lens of timeless fashion.",
        price=949.99,
        sizes="36 (Short),36,38,40,42,42 (Long),44,44 (Long)",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Knit+Linen+Blend+Sport.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    plaid_wool_cashmere = Item(
        name="Plaid Wool & Cashmere",
        type="Coat",
        description="Charming plaid refreshes this luxe wool-and-cashmere sport coat designed with a softly constructed cut for a more natural fit and feel. Jack Victor interprets modern wardrobe needs through the lens of timeless fashion.",
        price=474.99,
        sizes="36 (Short),36,38,40,42,42 (Long),44,44 (Long)",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Plaid+Wool+%26+Cashmere.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    high_waist_wide_leg = Item(
        name="High Waist Wide Leg",
        type="Pants",
        description="Wide legs lend graceful movement to trouser-inspired pants made with an elasticized back waist for added comfort. Halogen delivers on its goal of creating affordable work-to-weekend apparell, shoes and accessories.",
        price=89.99,
        sizes="36x30,38x30,40x30,42x30",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/High+Waist+Wide+Leg.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    pointed_toe_flat= Item(
        name="Pointed Toe Flat",
        type="Shoes",
        description="M Width. A side cutout and knotted mary jane strap create visual intrigue on a stunning flat fashioned with a pointy toe for trendsetting appeal. Nine West is the ultimate resource for coveted shoes at the forefront of contemporary fashion.",
        price=84.99,
        sizes="9,9.5,10,10.5,11,11.5,12,12.5,13,13.5",
        in_stock=True,
        main_image="https://devthreads.s3.amazonaws.com/Pointed+Toe+Flat.png",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add_all([trim_fit_royal_oxford, high_waist_wide_leg, contrast_tipping_polo, knit_linen_blend_sport, grandpro_rally_sneaker, pointed_toe_flat, emfielder_2_0_polo, regular_fit_pro_performance, raid_quilted_insulated, ck_slim_fit_suit_pants, commuter_straight_fit, plaid_wool_cashmere, regular_fit_cotton_herring, tri_stitch_low_top, new_lowerdale_quilted_vest, super_high_waisted_pants, upton_plain_toe_derby, t_classic_gentleman_bracelet, skimming_draped_mock, horseshoe_buckle_calfskin])
    db.session.commit()
    
def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
