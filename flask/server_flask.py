############################
###### Comandi per test:
# $ export FLASK_APP=server_flask.py
# $ flask run 
# si apre sulla porta 5000.

from flask import Flask, request
import pickle
from joblib import load
import numpy as np
import sys
import pandas as pd

app = Flask(__name__)
app.config["DEBUG"] = True

try:
    model = pickle.load(open('model.sav', 'rb'))
    scaler = load('scaler.joblib')
    label_encoder_summary = load('encoder_summary.joblib')
    label_encoder_precip_type = load('encoder_precip_type.joblib')
except:
    sys.exit('Impossibile caricare risorse del modello predittivo')

# Codifica il codice della condition
def encoding(code):
    summary = ''
    precip_type = 'rain'
    if code == 1000: summary = 'Clear'
    elif code == 1003: summary = 'Partly Cloudy'
    elif code == 1006: summary = 'Mostly Cloudy'
    elif code == 1009: summary = 'Overcast'
    elif code in [1135 , 1030 , 1147]: summary = 'Foggy'
    # pioggia leggera
    elif code in [1180, 1183, 1198, 1240, 1273]: 
        summary = 'Light Rain'
        precip_type = 'rain'
    # neve leggera
    elif code in [1210, 1213, 1255, 1261, 1279]:
        summary = 'Light Rain'
        precip_type = 'snow'

    # nevischio/ pioviggine gelata
    elif code in [1069, 1072, 1204, 1207]:
        summary= 'Drizzle'
        precip_type = 'snow'
    # pioviggine 
    elif code in [1150, 1153, 1168, 1171, 1249, 1252]: 
        summary= 'Drizzle'
        precip_type = 'rain'
    # pioggia moderata/forte
    elif code in [1063, 1186, 1189 , 1201, 1192 ,1195 , 1276 , 1243 , 1246 , 1201, 1264]: 
        summary= 'Rain'
        precip_type = 'rain'
    # neve moderata/forte
    elif code in [1114, 1117, 1216, 1219, 1222, 1225, 1237, 1258, 1282]: 
        summary= 'Rain'
        precip_type = 'snow'
    elif code == 1087 : summary= 'Humid and Overcast'

    else: summary = 'Clear'
    return summary, precip_type

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data_received = request.get_json()
        print(data_received)

        scaler_columns = ['Apparent Temperature (C)','Temperature (C)', 'Wind Bearing (degrees)', 'Humidity','Wind Speed (km/h)','Visibility (km)','Pressure (millibars)']
        data = {
            'Temperature (C)':[data_received['temp_c']], 
            'Wind Bearing (degrees)':[data_received['wind_degree']], 
            'Humidity':[data_received['humidity']/100],
            'Wind Speed (km/h)':[data_received['wind_kph']],
            'Visibility (km)':[data_received['vis_km']],
            'Pressure (millibars)':[data_received['pressure_mb']],
            'Summary':[data_received['summary']], # codice
            'Precip Type':[0] # da calcolare
            }
        # Calcoli alle variabili
        data['Humidity']= [np.exp(x) for x in data['Humidity']]
        data['Wind Speed (km/h)']= [np.sqrt(x) for x in data['Wind Speed (km/h)']]
        summary, precip_type = encoding(data['Summary'][0])
        data['Summary'] = [label_encoder_summary.transform([summary])]
        data['Precip Type'] = [label_encoder_precip_type.transform([precip_type])]

        data['Apparent Temperature (C)'] = [0] # necessaria per lo scaler
        
        df_ = pd.DataFrame(data)
        # Standardizzo i valori
        trasformed = scaler.transform(df_[scaler_columns])
        df_t = pd.DataFrame(trasformed, columns=scaler_columns)
        df_t['Summary'] = data['Summary']
        df_t['Precip Type'] = data['Precip Type']

        # Rimuovo variabile target
        df_t.drop('Apparent Temperature (C)', axis = 1, inplace=True)
        print(df_t)

        # Predico
        result = model.predict(df_t)
        df_t['Apparent Temperature (C)'] = result

        # Ristandardizzo i valori
        unscaled = scaler.inverse_transform(df_t[scaler_columns])
        df_ = pd.DataFrame(unscaled, columns=scaler_columns)
        print(df_)
        print('Apparent Temperature (C) predetta:',df_['Apparent Temperature (C)'])

        apparent_temperature = round(df_['Apparent Temperature (C)'][0],2)
        return {'apparent_temperature': apparent_temperature}
    except Exception as e:
        print(e)
        return 'Error', 500
