from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, NumberRange, Length, URL

class CartItemForm(FlaskForm):
    item_id = IntegerField('Item ID', validators=[DataRequired('Please add a Item ID.')])
    user_id = IntegerField('User ID', validators=[DataRequired('Please add a User ID.')])
    size = StringField('size', validators=[DataRequired('Please add a size')])
    quantity = IntegerField('quantity', validators=[DataRequired('Please add a quantity.')])