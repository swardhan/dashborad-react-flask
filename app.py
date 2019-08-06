from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = "testing"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/swardhan/dashboard/dashboard.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(50))
	username = db.Column(db.String(50), unique=True)
	password = db.Column(db.String(80))

def token_required(func):
	@wraps(func)
	def decorated(*args, **kwargs):
		token = None

		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']

		if not token:
			return jsonify({'message' : 'Token is missing!'}), 401

		try:
			data = jwt.decode(token, app.config['SECRET_KEY'])
			current_user = User.query.filter_by(username=data['username']).first()
		except:
			return jsonify({'message' : 'Token is invalid!'}), 401

		return func(current_user, *args, **kwargs)

	return decorated

@app.route('/register', methods=['POST'])
def create_user():
	data = request.get_json()
	try:
		hashed_password = generate_password_hash(data['password'], method='sha256')
		new_user = User(name=data['name'], password = hashed_password, username=data['username'])
		db.session.add(new_user)
		db.session.commit()
		return jsonify({'message': 'New User Created'})
	except Exception as e:
		return jsonify({'message':'User Already Exists'})

@app.route('/login', methods=['POST'])
def login():
	data = request.get_json()
	user = User.query.filter_by(username=data['username']).first()

	if not user:
		return jsonify({'message':'User not found!'})

	if user and check_password_hash(user.password, data['password']):
		token = jwt.encode({'username':user.username}, app.config['SECRET_KEY'])
		return jsonify({'token': token.decode('UTF-8')})
	
	return jsonify({'message':'Incorrect Password!'})
 
@app.route('/check')
@token_required
def check(current_user):
	return jsonify({'message': 'testing','username':current_user.username})

if __name__ == "__main__":
	app.run(debug=True)
