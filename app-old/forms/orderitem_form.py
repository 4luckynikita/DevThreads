from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, NumberRange, Length, URL

class OrderItemForm(FlaskForm):
    order_id = IntegerField('Order ID', validators=[DataRequired('Please add a Order ID.')])
    item_id = IntegerField('Item ID', validators=[DataRequired('Please add a Item ID.')])
    user_id = IntegerField('User ID', validators=[DataRequired('Please add a User ID.')])
    size = StringField('size', validators=[DataRequired('Please add a size')])
    quantity = IntegerField('quantity', validators=[DataRequired('Please add a quantity.')])