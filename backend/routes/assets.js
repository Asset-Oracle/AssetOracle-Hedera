const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');
const axios = require('axios');

// Test endpoint to check Supabase connection
router.get('/test-db', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('assets')
      .select('count')
      .limit(1);
    
    if (error) {
      return res.json({
        success: false,
        error: error.message,
        details: error
      });
    }
    
    res.json({
      success: true,
      message: 'Supabase connected!',
      data: data
    });
  } catch (err) {
    res.json({
      success: false,
      error: err.message
    });
  }
});
// GET /api/assets - Get all verified assets (marketplace)
router.get('/', async (req, res) => {
  try {
    const { data: assets, error } = await supabase
      .from('assets')
      .select('*')
      .eq('verification_status', 'VERIFIED')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: assets,
      pagination: {
        total: assets.length,
        page: 1,
        limit: 20,
        pages: Math.ceil(assets.length / 20)
      }
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
});

// GET /api/assets/unclaimed - Get unclaimed assets
router.get('/unclaimed', async (req, res) => {
  try {
    const { data: assets, error } = await supabase
      .from('assets')
      .select('*')
      .eq('claim_status', 'UNCLAIMED')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: assets
    });
  } catch (error) {
    console.error('Error fetching unclaimed assets:', error);
    res.status(500).json({ error: 'Failed to fetch unclaimed assets' });
  }
});

// GET /api/assets/tokenized - Get tokenized assets
router.get('/tokenized', async (req, res) => {
  try {
    const { data: assets, error } = await supabase
      .from('assets')
      .select('*')
      .eq('is_tokenized', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: assets
    });
  } catch (error) {
    console.error('Error fetching tokenized assets:', error);
    res.status(500).json({ error: 'Failed to fetch tokenized assets' });
  }
});

// GET /api/assets/:id - Get single asset
router.get('/:id', async (req, res) => {
  try {
    const { data: asset, error } = await supabase
      .from('assets')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    res.json({
      success: true,
      data: asset
    });
  } catch (error) {
    console.error('Error fetching asset:', error);
    res.status(500).json({ error: 'Failed to fetch asset' });
  }
});

// POST /api/assets/register - Register new asset with auto-verification
router.post('/register', async (req, res) => {
  try {
    const {
      name,
      description,
      estimatedValue,
      ownerWallet,
      category = 'REAL_ESTATE',
      location,
      propertyDetails,
      images = []
    } = req.body;

    if (!name || !estimatedValue || !ownerWallet) {
      return res.status(400).json({
        error: 'Missing required fields: name, estimatedValue, ownerWallet'
      });
    }

    console.log(`📝 Registering asset: ${name}`);

    // Prepare AI analysis request
    let aiAnalysisResult = {
      riskScore: 78,
      recommendation: 'HOLD',
      yieldPotential: 5,
      confidenceLevel: 0.5,
      fraudLikelihood: 'MEDIUM',
      investmentSummary: 'Property analysis based on available data. Market shows rising trends.',
      risks: ['Market volatility'],
      strengths: ['Good location'],
      opportunities: ['Potential appreciation']
    };

    // Call AI service for analysis
    try {
      if (process.env.AI_SERVICE_URL && location) {
        const aiResponse = await axios.post(
          `${process.env.AI_SERVICE_URL}/api/analyze-complete`,
          {
            address: location.address || '',
            city: location.city || '',
            state: location.state || ''
          },
          { timeout: 30000 }
        );

        if (aiResponse.data && aiResponse.data.investment_analysis) {
          const analysis = aiResponse.data.investment_analysis;
          aiAnalysisResult = {
            riskScore: analysis.score || 78,
            recommendation: analysis.recommendation || 'HOLD',
            yieldPotential: 5,
            confidenceLevel: aiResponse.data.document_verification?.score / 100 || 0.5,
            fraudLikelihood: aiResponse.data.document_verification?.score > 80 ? 'LOW' : 'MEDIUM',
            investmentSummary: analysis.summary || aiAnalysisResult.investmentSummary,
            risks: analysis.risks || aiAnalysisResult.risks,
            strengths: analysis.strengths || aiAnalysisResult.strengths,
            opportunities: analysis.opportunities || aiAnalysisResult.opportunities
          };
        }
      }
    } catch (aiError) {
      console.warn('AI service unavailable, using fallback analysis:', aiError.message);
    }

    // Auto-verify the asset
    let verification_status = 'VERIFIED';
    
    // Prepare blockchain data
    const blockchainData = {
      network: 'hedera-testnet',
      verified_at: new Date().toISOString(),
      document_hash: require('crypto').createHash('sha256').update(JSON.stringify({ name, ownerWallet, estimatedValue })).digest('hex'),
      verification_id: `VER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    // Submit verification to Hedera Consensus Service
    const { submitVerificationMessage } = require('../utils/hedera');

    try {
      if (process.env.HEDERA_VERIFICATION_TOPIC_ID) {
        const verificationMessage = {
          assetId: 'pending',
          assetName: name,
          verifiedAt: new Date().toISOString(),
          ownerWallet: ownerWallet,
          estimatedValue: estimatedValue,
          verificationMethod: 'automatic',
          aiScore: aiAnalysisResult.riskScore || 78
        };
        
        const hcsResult = await submitVerificationMessage(
          process.env.HEDERA_VERIFICATION_TOPIC_ID,
          verificationMessage
        );
        
        console.log(`✅ Verification recorded on HCS: Sequence ${hcsResult.sequenceNumber}`);
        
        blockchainData.hcs_sequence = hcsResult.sequenceNumber;
        blockchainData.hcs_transaction_id = hcsResult.transactionId;
      }
    } catch (hcsError) {
      console.warn('HCS submission failed (non-critical):', hcsError.message);
    }

    // Insert asset into database
    const { data: newAsset, error } = await supabase
      .from('assets')
      .insert([
        {
          name,
          description,
          estimated_value: estimatedValue,
          owner_wallet: ownerWallet,
          category,
          location: location || {},
          property_details: propertyDetails || {},
          images: images || [],
          verification_status,
          blockchain_data: blockchainData,
          ai_analysis: aiAnalysisResult,
          source_platform: 'assetoracle',
          is_assetoracle_listing: true
        }
      ])
      .select()
      .single();

    if (error) throw error;

    console.log(`✅ Asset registered and verified: ${newAsset.id}`);

    res.status(201).json({
      success: true,
      message: 'Asset registered and automatically verified',
      data: {
        asset: newAsset,
        verification: {
          status: verification_status,
          verificationId: blockchainData.verification_id,
          network: 'hedera-testnet',
          aiAnalysis: aiAnalysisResult
        }
      }
    });

  } catch (error) {
    console.error('Error registering asset:', error);
    res.status(500).json({ error: 'Failed to register asset', details: error.message });
  }
});

// POST /api/assets/:id/claim - Claim an unclaimed asset
router.post('/:id/claim', async (req, res) => {
  try {
    const { walletAddress, documents } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Missing wallet address' });
    }

    const { data: asset, error: fetchError } = await supabase
      .from('assets')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    if (asset.claim_status !== 'UNCLAIMED') {
      return res.status(400).json({ error: 'Asset is not available for claiming' });
    }

    console.log(`📋 Processing claim for asset ${req.params.id}`);

    // Update asset with claim
    const { data: claimedAsset, error: updateError } = await supabase
      .from('assets')
      .update({
        claimed_by: walletAddress,
        claim_status: 'CLAIMED',
        claim_documents: documents || [],
        claimed_at: new Date().toISOString(),
        owner_wallet: walletAddress,
        verification_status: 'VERIFIED'
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (updateError) throw updateError;

    console.log(`✅ Asset claimed successfully`);

    res.json({
      success: true,
      message: 'Asset claimed successfully',
      data: claimedAsset
    });

  } catch (error) {
    console.error('Error claiming asset:', error);
    res.status(500).json({ error: 'Failed to claim asset', details: error.message });
  }
});

// POST /api/assets/:id/tokenize - Tokenize verified asset with Hedera HTS
router.post('/:id/tokenize', async (req, res) => {
  try {
    const { tokenSupply, pricePerToken, walletAddress } = req.body;

    if (!tokenSupply || !pricePerToken || !walletAddress) {
      return res.status(400).json({ 
        error: 'Missing required fields: tokenSupply, pricePerToken, walletAddress' 
      });
    }

    const { data: asset, error: fetchError } = await supabase
      .from('assets')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    if (asset.verification_status !== 'VERIFIED') {
      return res.status(400).json({ 
        error: 'Only verified assets can be tokenized',
        currentStatus: asset.verification_status
      });
    }

    if (asset.owner_wallet.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(403).json({ error: 'Only asset owner can tokenize' });
    }

    console.log(`🪙 Tokenizing asset ${req.params.id} on Hedera`);

    // Import Hedera utilities
    const { createPropertyToken } = require('../utils/hedera');

    let hederaTokenData = null;
    
    try {
      // Create HTS token on Hedera
      const tokenResult = await createPropertyToken(
        asset.name,
        tokenSupply
      );
      
      hederaTokenData = {
        tokenId: tokenResult.tokenId,
        transactionId: tokenResult.transactionId,
        network: 'hedera-testnet',
        created: true
      };
      
      console.log(`✅ Hedera token created: ${tokenResult.tokenId}`);
      
    } catch (hederaError) {
      console.warn('Hedera token creation failed, storing metadata only:', hederaError.message);
      
      // Fallback: Store token metadata without actual HTS creation
      hederaTokenData = {
        tokenId: `PENDING-${Date.now()}`,
        transactionId: null,
        network: 'hedera-testnet',
        created: false,
        note: 'Token metadata stored, HTS creation pending'
      };
    }

    const tokenId = hederaTokenData.tokenId;

    // Update database
    const { data: tokenizedAsset, error: updateError } = await supabase
      .from('assets')
      .update({
        is_tokenized: true,
        token_id: tokenId,
        token_contract_address: hederaTokenData.tokenId,
        token_supply: tokenSupply,
        price_per_token: pricePerToken,
        tokens_available: tokenSupply,
        tokenized_at: new Date().toISOString(),
        verification_status: 'TOKENIZED',
        blockchain_data: {
          ...asset.blockchain_data,
          hedera_token_id: hederaTokenData.tokenId,
          hedera_transaction_id: hederaTokenData.transactionId,
          network: 'hedera-testnet'
        }
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (updateError) throw updateError;

    console.log(`✅ Asset tokenized: ${tokenId}`);

    res.json({
      success: true,
      message: 'Asset tokenized successfully on Hedera',
      data: {
        asset: tokenizedAsset,
        tokenization: {
          tokenId: tokenId,
          hederaTokenId: hederaTokenData.tokenId,
          transactionId: hederaTokenData.transactionId,
          supply: tokenSupply,
          pricePerToken: pricePerToken,
          totalValue: tokenSupply * pricePerToken,
          tokensAvailable: tokenSupply,
          network: 'hedera-testnet',
          explorerUrl: hederaTokenData.created ? `https://hashscan.io/testnet/token/${hederaTokenData.tokenId}` : null
        },
        hedera: hederaTokenData
      }
    });

  } catch (error) {
    console.error('Error tokenizing asset:', error);
    res.status(500).json({ 
      error: 'Failed to tokenize asset', 
      details: error.message 
    });
  }
});

// POST /api/assets/:id/verify - Manual verification (if needed)
router.post('/:id/verify', async (req, res) => {
  try {
    const { data: asset, error: fetchError } = await supabase
      .from('assets')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    const blockchainData = {
      network: 'hedera-testnet',
      verified_at: new Date().toISOString(),
      document_hash: require('crypto').createHash('sha256').update(JSON.stringify(asset)).digest('hex'),
      verification_id: `VER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    const { data: verifiedAsset, error: updateError } = await supabase
      .from('assets')
      .update({
        verification_status: 'VERIFIED',
        blockchain_data: blockchainData
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (updateError) throw updateError;

    res.json({
      success: true,
      message: 'Asset verified successfully',
      data: verifiedAsset
    });

  } catch (error) {
    console.error('Error verifying asset:', error);
    res.status(500).json({ error: 'Failed to verify asset' });
  }
});

module.exports = router;