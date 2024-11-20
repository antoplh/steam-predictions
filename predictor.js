// Process game data and perform further actions
function processGameData() {
  if (window.gameFormData) {
    const {
      gamePrice,
      selectedLanguagesArray,
      selectedFeaturesArray,
      gameTagsArray,
    } = window.gameFormData;

    // PCA and prediction (adjust as needed)
    performPCAOnNewData(gameTagsArray)
      .then((transformedTags) => {
        // console.log('Transformed Data:', transformedTags);
        // Check if game price is 0 and set additional variable accordingly
        const F2P = parseFloat(gamePrice) === 0 ? 1 : 0;
        // combined array should include all these features
        const combinedArray = [
          parseFloat(gamePrice),
          F2P,
          ...selectedFeaturesArray,
          ...transformedTags,
          ...selectedLanguagesArray,
        ];
        // console.log('Input Model Data:', combinedArray);
        // Load model coefficients and predict
        loadModelAndPredict(combinedArray)
          .then((prediction) => {
            console.log("Prediction:", prediction);
            const clusteringInputArray = [prediction, ...combinedArray];
            // console.log('Clustering Input Data:', clusteringInputArray);
            let centroids = [];

            fetch("models/centroids.json")
              .then((response) => response.json())
              .then((data) => {
                centroids = data;
                // predict the cluster of the user input:
                const cluster = predictCluster(clusteringInputArray, centroids);
                console.log("Cluster:", cluster);
                displayResults(
                  Math.ceil(prediction),
                  cluster,
                  gamePrice,
                  transformedTags
                );
              })
              .catch((error) => {
                console.error("Error fetching the centroids:", error);
              });
          })
          .catch((err) => console.error("Error in prediction:", err));
      })
      .catch((err) => console.error("Error in PCA transformation:", err));
  } else {
    console.log("Game data is not available yet.");
  }
}

// Function to load model coefficients and predict
async function loadModelAndPredict(transformedData) {
  const { coefficients, intercept } = await loadModelCoefficients(
    "models/model_coefficients.txt"
  );
  return predict(transformedData, coefficients, intercept);
}

async function performPCAOnNewData(newData) {
  // Fetch the PCA components CSV file
  const response = await fetch("models/pca_components.csv");
  const csvData = await response.text();

  // Parse CSV data and filter out any empty rows
  const rows = csvData
    .split("\n")
    .filter((row) => row.trim().length > 0)
    .map((row) => row.split(",").map(Number));

  // Ensure that the length of newData matches the number of columns in PCA rows
  if (newData.length !== rows[0].length) {
    console.error("Mismatch in dimensions between newData and PCA components");
    return []; // Or handle the error as appropriate
  }

  // Transform newData into PCA space
  const transformedData = [];

  for (let i = 0; i < rows.length; i++) {
    let component = 0;
    for (let j = 0; j < newData.length; j++) {
      component += newData[j] * rows[i][j];
    }
    transformedData.push(component);
  }

  return transformedData;
}

// Function to load model coefficients
async function loadModelCoefficients(url) {
  const response = await fetch(url);
  const text = await response.text();

  // Parsing the text to extract coefficients and intercept
  const lines = text.split("\n");
  let coefficients, intercept;

  for (const line of lines) {
    if (line.startsWith("Coefficients:")) {
      coefficients = JSON.parse(line.split(":")[1].trim());
    } else if (line.startsWith("Intercept:")) {
      intercept = parseFloat(line.split(":")[1].trim());
    }
  }
  return { coefficients, intercept };
}

function euclideanDistance(point1, point2) {
  let sum = 0;
  for (let i = 0; i < point1.length; i++) {
    sum += (point1[i] - point2[i]) ** 2;
  }
  return Math.sqrt(sum);
}

// A function to predict the cluster for a given data point
function predictCluster(dataPoint, centroids) {
  let nearestCentroid = 0;
  let nearestDistance = Infinity;

  centroids.forEach((centroid, index) => {
    const distance = euclideanDistance(dataPoint, centroid);
    console.log(`Distance to centroid ${index}:`, distance);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestCentroid = index;
    }
  });

  console.log("Nearest Centroid:", nearestCentroid);
  return nearestCentroid;
}

// Predict function using loaded coefficients and intercept
function predict(inputFeatures, coefficients, intercept) {
  let prediction = intercept;
  for (let i = 0; i < inputFeatures.length; i++) {
    prediction += inputFeatures[i] * coefficients[i];
  }
  return prediction;
}

function displayResults(prediction, cluster, gamePrice) {
  // Find the results section element
  const resultsSection = document.getElementById("predictionResults");

  // Clear previous results
  resultsSection.innerHTML = "";

  // Set the stats for positive reviews based on the cluster
  const stats = {
    0: { median: 75, mean: 72.45, std: 19.67 },
    1: { median: 84, mean: 80.91, std: 14.78 },
    2: { median: 83, mean: 79.12, std: 15.85 },
    3: { median: 80, mean: 76.83, std: 16.82 },
  };

  // Calculate revenue
  const downloads = Math.ceil(prediction * 32);
  const revenue = Math.round(downloads * 0.38);

  // Use the mean percentage for positive reviews from the stats
  const positiveReviewsPercentage = stats[cluster].mean;

  // Define the quantiles based on the provided data
  const quantiles = { 0.25: 6, "0.50": 12, 0.75: 41, 0.85: 78, 0.95: 170 };

  // Determine the quantile and color for the prediction
  let quantileText, quantileColor;
  if (prediction < quantiles["0.25"]) {
    quantileText = "bottom 25%";
    quantileColor = "red";
  } else if (prediction < quantiles["0.50"]) {
    quantileText = "bottom 50%";
    quantileColor = "darkorange";
  } else if (prediction < quantiles["0.75"]) {
    quantileText = "bottom 75%";
    quantileColor = "orange";
  } else if (prediction < quantiles["0.85"]) {
    quantileText = "top 25%";
    quantileColor = "yellowgreen";
  } else if (prediction < quantiles["0.95"]) {
    quantileText = "top 15%";
    quantileColor = "lightgreen";
  } else {
    quantileText = "top 5%";
    quantileColor = "green";
  }

  // Create the content to insert
  resultsSection.innerHTML = `
        <h1> Prediction Results </h1>
        <p>Based on the type of game you plan to make, these are some of the insights gathered.</p>
        <div class="result-metric">
            <div class="metric-box box-reviews">
            <div class="metric-value">${prediction}</div>
            <div class="metric-label">reviews</div>
            </div>
            <div class="quantile">is the prediction output for the amount of reviews your game might get on a platform such as Steam. <strong>The amount of reviews for a game like this is in the <span style="color:${quantileColor};">${quantileText}</span></strong></div>
        </div>
        <p>Based on this prediction, these are the estimated downloads and revenue</p>
            <div class="metrics">
            <div class="metric-box">
            <div class="metric-value">${prediction * 32}</div>
            <div class="metric-label">downloads</div> </div>
            <div class="metric-box">
            <div class="metric-value">${(
              prediction *
              35 *
              0.38 *
              gamePrice
            ).toFixed(2)} USD</div>
            <div class="metric-label">on revenue</div></div> </div>

        <p>Games similar to yours have on average of <strong>${positiveReviewsPercentage}% positive reviews</strong>. Below is the distribution of positive reviews for games in this cluster.
  
        <!-- Insert the histogram image -->
        <img src="images/cluster_${cluster}_histogram.png" alt="Predictive Data Visualization" class="histogram">
    `;

  // Add any additional JavaScript here for further processing if necessary
}
window.addEventListener("formSubmitted", function () {
  processGameData();
});
