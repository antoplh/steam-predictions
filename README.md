# Steam Game Market Analysis Tool
A project designed to support indie game developers in evaluating the potential market reception of their game ideas using data-driven insights. Developed as part of the Data-Driven Decision Making in Business course, this project leverages statistical models and clustering techniques to predict reviews, sales, and revenues for games on Steam.

## Project Overview
The gaming industry is highly competitive, particularly for indie developers, who often struggle to achieve commercial success. This tool provides valuable market insights by analyzing historical game data from Steam. By predicting key metrics such as total reviews, sales, and potential revenue, the tool enables developers to make informed decisions in planning and launching their games.

## Features
* Multiple Linear Regression (MLR):
Predicts the number of reviews based on game attributes, such as price, supported languages, and tags.

* K-Means Clustering:
Groups games with similar characteristics to provide developers with benchmarks for expected user feedback.

* Revenue and Sales Estimation:
Calculates potential sales and revenue using predicted review counts and industry benchmarks.

* Data Insights and Visualization:
Displays a histogram showing the distribution of positive reviews for similar games within a cluster.

## Dataset
The dataset used for this project includes over 83,000 games from Steam, sourced from Kaggle. It contains metadata such as:

* Game titles, publishers, genres, and release dates.
* User review statistics (e.g., total reviews, percentage of positive reviews).
* Game price and tags.
Note: Due to size constraints, the dataset is not included in the repository. Instead, it can be accessed via this [Kaggle link](https://www.kaggle.com/datasets/nikatomashvili/steam-games-dataset).

## Methodology
The project follows the CRISP-DM framework, with steps detailed below:
 
1. **Business Understanding**:
Explored challenges faced by indie developers and identified the need for a tool to predict game success metrics.

2. **Data Understanding and Preparation**:

Converted textual data into numerical formats.
Handled missing values, applied outlier treatment, and transformed categorical variables.
Reduced dataset dimensions using Principal Component Analysis (PCA).

3. **Modeling**:

Developed an MLR model to predict review counts.
Applied K-means clustering for game categorization.

4. **Evaluation**:

Assessed model performance using metrics like R², MAE, and RMSE.
Extracted key insights about influential features and clusters.

5. **Deployment**:

Hosted on GitHub Pages at Steam Predictions.
Built a web application for developers to input game details and receive predictions.

# Web Application
The web app provides:

* Predictions for total reviews, sales, and revenue.
* Cluster categorization to benchmark the game against similar titles.
* Visual feedback on the percentage of positive reviews for the predicted cluster.

**Repository:**
Contains the following files:

* index.html - User interface.
* script.js - Manages user interactions.
* predictor.js - Processes inputs and generates predictions using exported models.
* Jupyter_Notebook_Individual_Project.ipynb - Documentation of the analysis and model development process.

## How to Use
1. Clone the repository:

`git clone https://github.com/antoplh/steam-predictions.git
cd steam-predictions`
2. Open index.html in a browser to use the application locally.

Alternatively, access the live demo here: https://antoplh.github.io/steam-predictions/

## Ethical Considerations
This tool aims to assist indie developers while maintaining respect for creativity and diversity in the gaming industry. Efforts were made to ensure that the model serves as a guiding tool, not a deterministic solution, promoting informed decisions without stifling innovation.

