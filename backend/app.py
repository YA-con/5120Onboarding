from flask import Flask, request, jsonify
import requests
from geopy.geocoders import Nominatim
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Read uv api
UV_KEY = os.getenv("UV_KEY")
UV_API_URL = "https://api.openuv.io/api/v1/uv"

# Advice for sun protection
def get_sun_protection_advice(uv_index):
    if uv_index <= 2:
        return ("Low risk. Minimal protection needed. "
                "You can safely enjoy outdoor activities. However, "
                "consider wearing sunglasses for comfort and applying SPF 15+ sunscreen if staying outside for long periods.")
    
    elif 2 < uv_index <= 5:
        return ("Moderate risk. Wear SPF 30+ sunscreen, sunglasses, and a hat. "
                "Seek shade during midday hours. "
                "Limit outdoor time to avoid prolonged exposure to UV rays.")
    
    elif 5 < uv_index <= 7:
        return ("High risk. Use SPF 50+ sunscreen, sunglasses, a wide-brimmed hat, and long sleeves. "
                "Avoid direct sunlight from 10 AM to 4 PM. "
                "Reapply sunscreen every two hours and after swimming or sweating.")
    
    elif 7 < uv_index <= 10:
        return ("Very high risk! Apply SPF 50+ broad-spectrum sunscreen generously. "
                "Wear protective clothing, a hat, and UV-blocking sunglasses. "
                "Try to stay indoors or in shaded areas during peak UV hours (10 AM - 4 PM). "
                "Avoid extended outdoor activities.")
    
    else:
        return ("Extreme risk! Stay indoors as much as possible. "
                "If necessary to go outside, wear SPF 50+ sunscreen, sunglasses, a hat, and tightly woven clothing. "
                "Avoid all direct sun exposure between 10 AM and 4 PM, as UV rays are extremely harmful during this time.")

# Convert city to lat and lon
def get_lat_lng(city_name):
    geolocator = Nominatim(user_agent="uv_index_app")
    location = geolocator.geocode(city_name)
    if location:
        return location.latitude, location.longitude
    return None, None

# UV index interface
@app.route("/api/uv", methods=["GET"])
def get_uv_index():
    city = request.args.get("location") 

    if not city:
        return jsonify({"error": "Missing location parameter"}), 400

    lat, lng = get_lat_lng(city)
    if lat is None or lng is None:
        return jsonify({"error": "Invalid location"}), 400

    headers = {"x-access-token": API_KEY}
    params = {"lat": lat, "lng": lng}

    try:
        response = requests.get(UV_API_URL, headers=headers, params=params)
        data = response.json()
        uv_index = data.get("result", {}).get("uv", -1)

        if uv_index == -1:
            return jsonify({"error": "Unable to fetch UV Index"}), 500

        advice = get_sun_protection_advice(uv_index)

        return jsonify({
            "location": city,
            "latitude": lat,
            "longitude": lng,
            "uv_index": uv_index,
            "advice": advice
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)