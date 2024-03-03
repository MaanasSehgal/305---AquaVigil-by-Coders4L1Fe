from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2)
import joblib
import json
import imageio.v2
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np

app = Flask('_name_')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# TF_ENABLE_ONEDNN_OPTS=0


# API endpoint for making predictions
@app.route('/predict', methods=['POST'])
@cross_origin()
def predict():
    # Get the data from the POST request body.
    # url is stored in api body as {"url":"https://www.example.com/image.jpg"}
    url = request.json['url']
    img = imageio.v2.imread(url)
    resize = tf.image.resize(img, (256,256))
    new_model = load_model('models/imageclassifier.h5')
    yhat = new_model.predict(np.expand_dims(resize/255, 0))
    print(yhat)
    if yhat > 0.5:
        print(f'Predicted class is Pit')
        prediction = 'pit'
    else:
        print(f'Predicted class is Flood')
        prediction = 'flood'
    
    dict={'predictions':prediction, 'status':200, 'statusText':'OK'}
    res=json.dumps(dict)
    return res

# if '_name_' == '_main_':
app.run(port=5000)