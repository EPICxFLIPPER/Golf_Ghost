from flask import Flask, jsonify, request
import numpy as np

app = Flask(__name__)

# Function to simulate a shot using numpy
def simulate_shot(mean, std_dev):
    return np.random.normal(mean, std_dev)

@app.route("/hit/<club>", methods=["GET"])
def hit_club(club):
    # Get mean and std_dev for the club (this should come from your database)
    print("Python says the club is", club)
    clubs_data = {
        "8 Iron": {"mean": 160, "std_dev": 12},  # Example data
        "9 Iron": {"mean": 145, "std_dev": 10},
    }

    if club not in clubs_data:
        return jsonify({"error": "Club not found"}), 404

    mean = clubs_data[club]["mean"]
    std_dev = clubs_data[club]["std_dev"]

    # Simulate the shot
    shot_distance = simulate_shot(mean, std_dev)

    return jsonify({"shotDistance": shot_distance})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
