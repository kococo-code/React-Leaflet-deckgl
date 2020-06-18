from flask import Flask
from route.api import api_blueprint
from flask_cors import CORS
app = Flask(__name__)
app.register_blueprint(api_blueprint)
CORS(app)

@app.route('/')
def req():
    return ('API')

if __name__ == "__main__":
    app.run(port=4000,debug=True)