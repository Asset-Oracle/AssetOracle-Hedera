from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add ai_engine to path
#sys.path.insert(0, os.path.dirname(os.path.abspath(file)))

from main_service import AssetOracleAI

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Initialize AI service
print("🚀 Starting AssetOracle AI API Server...")
ai_service = AssetOracleAI()
print("✅ AI API Server ready!\n")


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'AssetOracle AI API',
        'version': '1.0.0'
    })


@app.route('/api/verify-documents', methods=['POST'])
def verify_documents():
    """
    Document verification endpoint
    
    Expected JSON:
    {
        "property_type": "Real Estate",
        "documents": ["deed.pdf", "title.pdf"],
        "location": "Manhattan, NY",
        "valuation": 500000
    }
    """
    try:
        data = request.json
        result = ai_service.verifier.verify_documents(data)
        
        return jsonify({
            'success': True,
            'data': result
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/score-investment', methods=['POST'])
def score_investment():
    """
    Investment scoring endpoint
    
    Expected JSON:
    {
        "property_type": "Real Estate",
        "location": "Manhattan, NY",
        "valuation": 500000,
        "annual_yield": 4.5,
        "market_data": {
            "avg_price_per_sqft": 850,
            "trend": "Increasing"
        }
    }
    """
    try:
        data = request.json
        property_data = {k: v for k, v in data.items() if k != 'market_data'}
        market_data = data.get('market_data')
        
        result = ai_service.scorer.score_investment(property_data, market_data)
        
        return jsonify({
            'success': True,
            'data': result
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/aggregate-data', methods=['POST'])
def aggregate_data():
    """
    Data aggregation endpoint
    
    Expected JSON:
    {
        "address": "123 Main St",
        "location": "Manhattan, NY"
    }
    """
    try:
        data = request.json
        address = data.get('address')
        location = data.get('location')
        
        result = ai_service.aggregator.aggregate_property_data(address, location)
        
        return jsonify({
            'success': True,
            'data': result
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/analyze-complete', methods=['POST'])
def analyze_complete():
    """
    Complete asset analysis endpoint (uses all 3 AI components)
    
    Expected JSON:
    {
        "address": "456 Park Ave",
        "location": "Manhattan, NY",
        "property_type": "Real Estate",
        "documents": ["deed.pdf", "title.pdf"],
        "valuation": 750000,
        "annual_yield": 5.2
    }
    """
    try:
        data = request.json
        result = ai_service.analyze_complete_asset(data)
        
        return jsonify({
            'success': True,
            'data': result
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    print("\n" + "="*70)
    print("🌐 AssetOracle AI API Server")
    print("="*70)
    print("\nAvailable Endpoints:")
    print("  GET  /health                  - Health check")
    print("  POST /api/verify-documents    - Document verification")
    print("  POST /api/score-investment    - Investment scoring")
    print("  POST /api/aggregate-data      - Data aggregation")
    print("  POST /api/analyze-complete    - Complete analysis")
    print("\n" + "="*70)
    print("🚀 Starting server on http://localhost:5000")
    print("="*70 + "\n")
    
    app.run(debug=True, port=5000, host='0.0.0.0')
