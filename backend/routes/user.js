const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// GET /api/user/dashboard/:walletAddress - Get user's complete dashboard
router.get('/dashboard/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    console.log(`📊 Fetching dashboard for: ${walletAddress}`);

    // Get user's assets (case-insensitive)
    const { data: userAssets, error: assetsError } = await supabase
      .from('assets')
      .select('*')
      .ilike('owner_wallet', walletAddress)
      .order('created_at', { ascending: false });

    if (assetsError) throw assetsError;

    // Calculate statistics
    const stats = {
      totalAssets: userAssets.length,
      verifiedAssets: userAssets.filter(a => a.verification_status === 'VERIFIED' || a.verification_status === 'TOKENIZED').length,
      tokenizedAssets: userAssets.filter(a => a.is_tokenized === true).length,
      totalValue: userAssets.reduce((sum, a) => sum + (a.estimated_value || 0), 0),
      totalTokens: userAssets.reduce((sum, a) => sum + (a.token_supply || 0), 0),
      totalInvestmentValue: userAssets.reduce((sum, a) => {
        if (a.is_tokenized && a.token_supply && a.price_per_token) {
          return sum + (a.token_supply * a.price_per_token);
        }
        return sum;
      }, 0)
    };

    // Group assets by status
    const assetsByStatus = {
      verified: userAssets.filter(a => a.verification_status === 'VERIFIED'),
      tokenized: userAssets.filter(a => a.verification_status === 'TOKENIZED'),
      pending: userAssets.filter(a => a.verification_status === 'PENDING'),
      rejected: userAssets.filter(a => a.verification_status === 'REJECTED')
    };

    // Recent activity (last 5 assets)
    const recentActivity = userAssets.slice(0, 5).map(asset => ({
      id: asset.id,
      name: asset.name,
      action: asset.is_tokenized ? 'TOKENIZED' : 'REGISTERED',
      date: asset.tokenized_at || asset.created_at,
      value: asset.estimated_value
    }));

    console.log(`✅ Dashboard loaded: ${stats.totalAssets} assets`);

    res.json({
      success: true,
      data: {
        walletAddress: walletAddress,
        stats: stats,
        assets: userAssets,
        assetsByStatus: assetsByStatus,
        recentActivity: recentActivity
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).json({ 
      error: 'Failed to fetch dashboard data',
      details: error.message 
    });
  }
});

// GET /api/user/portfolio/:walletAddress - Get user's portfolio summary
router.get('/portfolio/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    console.log(`💼 Fetching portfolio for: ${walletAddress}`);

    // Get tokenized assets only
    const { data: portfolio, error } = await supabase
      .from('assets')
      .select('*')
      .ilike('owner_wallet', walletAddress)
      .eq('is_tokenized', true)
      .order('tokenized_at', { ascending: false });

    if (error) throw error;

    // Calculate portfolio value
    const totalPortfolioValue = portfolio.reduce((sum, asset) => {
      if (asset.token_supply && asset.price_per_token) {
        return sum + (asset.token_supply * asset.price_per_token);
      }
      return sum;
    }, 0);

    const totalTokens = portfolio.reduce((sum, asset) => sum + (asset.token_supply || 0), 0);

    res.json({
      success: true,
      data: {
        walletAddress: walletAddress,
        totalValue: totalPortfolioValue,
        totalTokens: totalTokens,
        tokenizedAssets: portfolio.length,
        portfolio: portfolio
      }
    });

  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ 
      error: 'Failed to fetch portfolio',
      details: error.message 
    });
  }
});

// GET /api/user/stats/:walletAddress - Get user statistics
router.get('/stats/:walletAddress', async (req, res) => {
  try {
    const { walletAddress } = req.params;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    const { data: assets, error } = await supabase
      .from('assets')
      .select('*')
      .ilike('owner_wallet', walletAddress);

    if (error) throw error;

    const stats = {
      totalAssets: assets.length,
      verifiedAssets: assets.filter(a => a.verification_status === 'VERIFIED' || a.verification_status === 'TOKENIZED').length,
      tokenizedAssets: assets.filter(a => a.is_tokenized === true).length,
      pendingAssets: assets.filter(a => a.verification_status === 'PENDING').length,
      totalValue: assets.reduce((sum, a) => sum + (a.estimated_value || 0), 0),
      totalTokenValue: assets.reduce((sum, a) => {
        if (a.is_tokenized && a.token_supply && a.price_per_token) {
          return sum + (a.token_supply * a.price_per_token);
        }
        return sum;
      }, 0),
      averageAssetValue: assets.length > 0 
        ? assets.reduce((sum, a) => sum + (a.estimated_value || 0), 0) / assets.length 
        : 0
    };

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch statistics',
      details: error.message 
    });
  }
});

module.exports = router;