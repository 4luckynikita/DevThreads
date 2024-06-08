from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, NumberRange, Length, URL

class OrderForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired('Please add a User ID.')])
    total = DecimalField('Total', validators=[DataRequired('Please add a total.')])
    status = StringField('status', validators=[DataRequired('Please add a status.')])