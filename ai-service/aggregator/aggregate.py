from groq import Groq
import os
from dotenv import load_dotenv
import json

load_dotenv()

class DataAggregator:
    def __init__(self):
        api_key = os.getenv('GROQ_API_KEY')
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in .env")
        
        self.client = Groq(api_key=api_key)
        print("✓ DataAggregator initialized")
    
    def aggregate_property_data(self, address, location):
        """
        Aggregate property data from multiple sources
        
        Args:
            address: Property address
            location: City, State
        
        Returns:
            dict: Aggregated property data
        """
        
        print(f"Aggregating data for: {address}, {location}")
        
        # Simulate data from multiple sources
        # In production, this would call real APIs (Zillow, PropertyShark, etc.)
        
        zillow_data = self._mock_zillow_data(address, location)
        propertyshark_data = self._mock_propertyshark_data(address, location)
        market_data = self._mock_market_data(location)
        
        # Aggregate all data
        aggregated = {
            'address': address,
            'location': location,
            'data_sources': ['Zillow', 'PropertyShark', 'Market Data'],
            'zillow': zillow_data,
            'propertyshark': propertyshark_data,
            'market': market_data,
            'aggregation_summary': self._generate_summary(zillow_data, propertyshark_data, market_data)
        }
        
        return aggregated
    
    def _mock_zillow_data(self, address, location):
        """Mock Zillow API data"""
        return {
            'source': 'Zillow',
            'price': 500000,
            'bedrooms': 3,
            'bathrooms': 2,
            'sqft': 1500,
            'year_built': 2010,
            'property_type': 'Single Family'
        }
    
    def _mock_propertyshark_data(self, address, location):
        """Mock PropertyShark API data"""
        return {
            'source': 'PropertyShark',
            'assessed_value': 485000,
            'tax_assessment': 450000,
            'last_sale_date': '2020-06-15',
            'last_sale_price': 475000,
            'property_tax': 8500
        }
    
    def _mock_market_data(self, location):
        """Mock market trend data"""
        return {
            'source': 'Market Analysis',
            'avg_price_per_sqft': 850,
            'market_trend': 'Increasing',
            'inventory_level': 'Low',
            'days_on_market_avg': 45,
            'price_change_1yr': '+8%'
        }
    
    def _generate_summary(self, zillow, propertyshark, market):
        """Generate AI summary of aggregated data"""
        
        prompt = f"""Analyze this aggregated property data:

ZILLOW DATA:
- Price: ${zillow['price']}
- Size: {zillow['sqft']} sqft, {zillow['bedrooms']} bed, {zillow['bathrooms']} bath
- Built: {zillow['year_built']}

PROPERTYSHARK DATA:
- Assessed Value: ${propertyshark['assessed_value']}
- Last Sale: ${propertyshark['last_sale_price']} in {propertyshark['last_sale_date']}
- Property Tax: ${propertyshark['property_tax']}/year

MARKET DATA:
- Market Trend: {market['market_trend']}
- Avg Price/Sqft: ${market['avg_price_per_sqft']}
- Price Change (1yr): {market['price_change_1yr']}

Provide a brief 2-sentence summary highlighting key insights.
"""
        
        try:
            response = self.client.chat.completions.create(
                model="meta-llama/llama-guard-4-12b",
                messages=[
                    {"role": "system", "content": "You are a real estate data analyst."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                max_tokens=200
            )
            
            return response.choices[0].message.content
        
        except Exception as e:
            return f"Property shows current listing price of ${zillow['price']} with recent appreciation trend. Market data indicates strong demand in area."
# TEST THE AGGREGATOR
if __name__ == "__main__":
    print("=" * 70)
    print("TESTING DATA AGGREGATOR")
    print("=" * 70)
    
    aggregator = DataAggregator()
    
    print("\n")
    result = aggregator.aggregate_property_data(
        address="123 Main Street",
        location="Manhattan, NY"
    )
    
    print("\n" + "=" * 70)
    print("AGGREGATED DATA")
    print("=" * 70)
    
    print(f"\n Property: {result['address']}, {result['location']}")
    print(f" Data Sources: {', '.join(result['data_sources'])}")
    
    print(f"\n ZILLOW DATA:")
    for key, value in result['zillow'].items():
        if key != 'source':
            print(f"  {key}: {value}")
    
    print(f"\n PROPERTYSHARK DATA:")
    for key, value in result['propertyshark'].items():
        if key != 'source':
            print(f"  {key}: {value}")
    
    print(f"\n MARKET DATA:")
    for key, value in result['market'].items():
        if key != 'source':
            print(f"  {key}: {value}")
    
    print(f"\n AI SUMMARY:")
    print(f"  {result['aggregation_summary']}")
    
    print("=" * 70)