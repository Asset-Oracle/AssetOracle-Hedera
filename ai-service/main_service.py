import sys
import os

# Add ai_engine to path so we can import our modules
#sys.path.insert(0, os.path.dirname(os.path.abspath(file)))

from verification.document_verifier import DocumentVerifier
from scoring.investmengt_scorer import InvestmentScorer
from aggregator.aggregate import DataAggregator

class AssetOracleAI:
    """
    Main AI service that combines all AI components:
    - Document Verification
    - Investment Scoring  
    - Data Aggregation
    """
    
    def __init__(self):
        print("🚀 Initializing AssetOracle AI Service...")
        
        self.verifier = DocumentVerifier()
        self.scorer = InvestmentScorer()
        self.aggregator = DataAggregator()
        
        print("✅ AssetOracle AI Service ready!\n")
    
    def analyze_complete_asset(self, asset_data):
        """
        Complete asset analysis pipeline
        
        Args:
            asset_data (dict): {
                'address': '123 Main St',
                'location': 'Manhattan, NY',
                'property_type': 'Real Estate',
                'documents': ['deed.pdf', 'title.pdf'],
                'valuation': 500000,
                'annual_yield': 4.5
            }
        
        Returns:
            dict: Complete analysis with verification, scoring, and aggregated data
        """
        
        print("="*70)
        print("🔍 STARTING COMPLETE ASSET ANALYSIS")
        print("="*70)
        
        results = {
            'asset_info': asset_data,
            'analysis_stages': {}
        }
        
        # STAGE 1: Aggregate Property Data
        print("\n📊 Stage 1: Aggregating property data from multiple sources...")
        aggregated_data = self.aggregator.aggregate_property_data(
            asset_data.get('address', 'N/A'),
            asset_data.get('location', 'N/A')
        )
        results['analysis_stages']['data_aggregation'] = aggregated_data
        print("✓ Data aggregation complete")
        
        # STAGE 2: Verify Documents
        print("\n📄 Stage 2: Verifying property documents...")
        verification_result = self.verifier.verify_documents(asset_data)
        results['analysis_stages']['document_verification'] = verification_result
        print(f"✓ Verification complete - Score: {verification_result['verification_score']}/100")
        
        # STAGE 3: Score Investment
        print("\n💰 Stage 3: Analyzing investment potential...")
        market_data = aggregated_data.get('market', {})
        investment_result = self.scorer.score_investment(asset_data, market_data)
        results['analysis_stages']['investment_analysis'] = investment_result
        print(f"✓ Investment analysis complete - Score: {investment_result['investment_score']}/100")
        
        # STAGE 4: Generate Final Recommendation
        print("\n🎯 Stage 4: Generating final recommendation...")
        final_recommendation = self._generate_final_recommendation(
            verification_result,
            investment_result,
            aggregated_data
        )
        results['final_recommendation'] = final_recommendation
        print("✓ Final recommendation ready")
        
        print("\n" + "="*70)
        print("✅ COMPLETE ASSET ANALYSIS FINISHED")
        print("="*70)
        
        return results
    
    def _generate_final_recommendation(self, verification, investment, data):
        """Generate overall recommendation combining all analyses"""
        
        verification_score = verification['verification_score']
        investment_score = investment['investment_score']
        
        # Calculate overall score (weighted average)
        overall_score = (verification_score * 0.3) + (investment_score * 0.7)
        
        # Determine recommendation
        if overall_score >= 80:
            recommendation = "STRONG BUY"
            confidence = "High"
        elif overall_score >= 65:
            recommendation = "BUY"
            confidence = "Medium"
        elif overall_score >= 50:
            recommendation = "HOLD"
            confidence = "Medium"
        else:
            recommendation = "PASS"
            confidence = "Low"
        
        return {
            'overall_score': round(overall_score, 1),
            'recommendation': recommendation,
            'confidence': confidence,
            'key_factors': {
                'verification_score': verification_score,
                'investment_score': investment_score,
                'data_sources_count': len(data.get('data_sources', []))
            },
            'summary': f"Based on comprehensive analysis, this asset scores {round(overall_score, 1)}/100. "
                      f"Document verification shows {verification_score}/100 and investment potential "
                      f"shows {investment_score}/100. Recommendation: {recommendation}."
        }


# TEST THE COMPLETE SYSTEM
if __name__ == "__main__":
    print("\n" + "🏛️ "*20)
    print("ASSETORACLE AI - COMPLETE SYSTEM TEST")
    print("🏛️ "*20 + "\n")
    
    # Initialize the main AI service
    ai_service = AssetOracleAI()
    
    # Test asset data
    test_asset = {
        'address': '456 Park Avenue',
        'location': 'Manhattan, New York',
        'property_type': 'Real Estate',
        'documents': ['property_deed.pdf', 'title_certificate.pdf', 'tax_records.pdf'],
        'valuation': 750000,
        'annual_yield': 5.2
    }
    
    # Run complete analysis
    results = ai_service.analyze_complete_asset(test_asset)
    
    # Display results
    print("\n\n" + "="*70)
    print("📋 FINAL RESULTS")
    print("="*70)
    
    print(f"\n🏠 Asset: {results['asset_info']['address']}")
    print(f"📍 Location: {results['asset_info']['location']}")
    print(f"💵 Valuation: ${results['asset_info']['valuation']:,}")
    
    final = results['final_recommendation']
    print(f"\n🎯 OVERALL SCORE: {final['overall_score']}/100")
    print(f"📊 RECOMMENDATION: {final['recommendation']}")
    print(f"🔒 CONFIDENCE: {final['confidence']}")
    
    print(f"\n📄 Document Verification: {final['key_factors']['verification_score']}/100")
    print(f"💰 Investment Score: {final['key_factors']['investment_score']}/100")
    print(f"📊 Data Sources Used: {final['key_factors']['data_sources_count']}")
    
    print(f"\n💡 SUMMARY:")
    print(f"   {final['summary']}")
    
    print("\n" + "="*70)
    print(" SYSTEM TEST COMPLETE")
    print("="*70 + "\n")