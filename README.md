# Progetto previsioni meteorologiche

Applicazione angular che effettua una richiesta ad una Weather API (https://www.weatherapi.com/) per ottenere le condizioni metereologiche di una località passata come parametro. <br>
Una volta ottenute le informazioni, effettua una richiesta HTTP ad un server Flask per predirre la temperatura apparente. <br>
La predizione avviene utilizzando un modello di regressione lineare multipla ottenuto dall'analisi del dataset WeatherHistory (https://www.kaggle.com/datasets/budincsevity/szeged-weather/data).

## Cartelle del progetto:

- python: contiene notebook python per la creazione del modello predittivo e il relativo dataset utilizzato
- weather-app: applicazione angular
- flask: contiene il server flask e le risorse necessarie per utilizzare il modello predittivo.


## Dataset

Il dataset utilizzato per creare il modello predittivo è contenuto nel csv WeatherHistory, scaricato dal sito Kaggle (https://www.kaggle.com/datasets/budincsevity/szeged-weather/data). <br>
Contiene più di 96 mila rilevazioni metereologiche della città Szeged (Ungheria), tra il 2009 e il 2016. <brr>
Contiene le colonne:

- Formatted Date
- Summary
- Precip Type
- Temperature (C)
- Apparent Temperature (C)
- Humidity
- Wind Speed (km/h)
- Wind Bearing (degrees)  
- Visibility (km)
- Loud Cover
- Pressure (millibars)
- Daily Summary

Il dataset è stato analizzato e preparato per la creazione del modello predittivo. La variabile target è stata *Apparent Temperature (C)*. <br>

## Preparazione dataset

Il dataset è stato analizzato e poi preparando attraverso le seguenti fasi:

- Rimozione colonne non utili
- Gestione dei valori nulli
- Eliminazione delle righe duplicate
- Gestione degli outliers
- Gestione delle distribuzioni
- Trasformazione delle variabili categoriche
- Standardizzazione delle feature
- Divisione training e test set

## Modello predittivo

Essendo Apparent Temperature (C), una variabile continua per predirla è stata utilizzata la regressione lineare multipla attraverso il modello LinearRegression della libreria scikit-learn (https://scikit-learn.org/stable/) di Python. <br>
Variabili X:

- Summary
- Precip Type
- Temperature (C)
- Humidity
- Wind Speed (km/h)
- Wind Bearing (degrees)  
- Visibility (km)
- Pressure (millibars).

Infine il modello è stato valutato utilizzando alcune metriche come il coefficiente di determinazione e attraverso la k-cross validation.

## Extra
E' stato fatto un tentativo per utilizzare lo stesso dataset per creare un modello classificatore della colonna 'Summary'. Il tentativo non è andato a buon fine perchè l'accuratezza ottenuta è di circa il 50%.<br>
La colonna 'Summary', risulta particolarmente sbilanciata nelle sue categorie. <br>

Nella cartella Python è presente anche un altro dataset (seattle-weather.csv) e il relativo notebook python (weather_classification.ipynb) dove si è tentato di creare un modello classificatore della variabile 'weather' (simile a Summary) ma anche in questo caso il dataset risulta molto sbilanciato e su casi reali non funziona in modo ottimale.