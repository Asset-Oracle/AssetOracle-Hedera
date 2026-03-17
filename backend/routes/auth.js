const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// POST /api/auth/register - Register with email and password
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log(`📝 Registering user: ${email}`);

    // Create auth user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name || ''
        }
      }
    });

    if (authError) throw authError;

    // Create user record in users table
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert([
        {
          email: email,
          name: name || '',
          auth_user_id: authData.user.id
        }
      ])
      .select()
      .single();

    if (userError) throw userError;

    console.log(`✅ User registered: ${newUser.id}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      },
      session: authData.session
    });

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ 
      error: 'Failed to register user',
      details: error.message 
    });
  }
});

// POST /api/auth/login - Login with email and password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log(`🔐 Login attempt: ${email}`);

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (authError) throw authError;

    // Get user record
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', authData.user.id)
      .single();

    if (userError) {
      console.warn('User record not found, creating one...');
      
      // Create user record if it doesn't exist
      const { data: newUser } = await supabase
        .from('users')
        .insert([
          {
            email: email,
            auth_user_id: authData.user.id,
            name: authData.user.user_metadata?.name || ''
          }
        ])
        .select()
        .single();
      
      return res.json({
        success: true,
        message: 'Login successful',
        user: newUser,
        session: authData.session
      });
    }

    console.log(`✅ Login successful: ${user.id}`);

    res.json({
      success: true,
      message: 'Login successful',
      user: user,
      session: authData.session
    });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).json({ 
      error: 'Invalid credentials',
      details: error.message 
    });
  }
});

// POST /api/auth/logout - Logout user
router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;

    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
});

// POST /api/auth/connect-wallet - Wallet authentication
router.post('/connect-wallet', async (req, res) => {
  try {
    const { walletAddress, name, email } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    console.log(`🔗 Connecting wallet: ${walletAddress}`);

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .single();

    if (existingUser) {
      console.log(`✅ Wallet connected: ${existingUser.id}`);
      
      return res.json({
        success: true,
        message: 'Wallet connected successfully',
        user: existingUser
      });
    }

    // Create new user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          wallet_address: walletAddress.toLowerCase(),
          name: name || '',
          email: email || ''
        }
      ])
      .select()
      .single();

    if (error) throw error;

    console.log(`✅ New wallet user created: ${newUser.id}`);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser
    });

  } catch (error) {
    console.error('Error connecting wallet:', error);
    res.status(500).json({ error: 'Failed to connect wallet' });
  }
});

// POST /api/auth/link-wallet - Link wallet to existing email account
router.post('/link-wallet', async (req, res) => {
  try {
    const { walletAddress, userId, email } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    if (!userId && !email) {
      return res.status(400).json({ error: 'User ID or email is required' });
    }

    console.log(`🔗 Linking wallet ${walletAddress} to account`);

    // Check if wallet is already linked to another account
    const { data: existingWallet } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress.toLowerCase())
      .single();

    if (existingWallet && existingWallet.id !== userId) {
      return res.status(400).json({ 
        error: 'This wallet is already linked to another account' 
      });
    }

    // Find user by ID or email
    let query = supabase.from('users').select('*');
    
    if (userId) {
      query = query.eq('id', userId);
    } else {
      query = query.eq('email', email);
    }

    const { data: user, error: fetchError } = await query.single();

    if (fetchError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user already has a wallet
    if (user.wallet_address && user.wallet_address !== walletAddress.toLowerCase()) {
      return res.status(400).json({ 
        error: 'User already has a different wallet linked. Unlink first.' 
      });
    }

    // Link wallet to user
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ wallet_address: walletAddress.toLowerCase() })
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) throw updateError;

    console.log(`✅ Wallet linked to user: ${updatedUser.id}`);

    res.json({
      success: true,
      message: 'Wallet linked successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error linking wallet:', error);
    res.status(500).json({ 
      error: 'Failed to link wallet',
      details: error.message 
    });
  }
});

// POST /api/auth/unlink-wallet - Unlink wallet from account
router.post('/unlink-wallet', async (req, res) => {
  try {
    const { userId, email } = req.body;

    if (!userId && !email) {
      return res.status(400).json({ error: 'User ID or email is required' });
    }

    console.log(`🔓 Unlinking wallet from account`);

    // Find user
    let query = supabase.from('users').select('*');
    
    if (userId) {
      query = query.eq('id', userId);
    } else {
      query = query.eq('email', email);
    }

    const { data: user, error: fetchError } = await query.single();

    if (fetchError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.wallet_address) {
      return res.status(400).json({ error: 'No wallet linked to this account' });
    }

    // Unlink wallet
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ wallet_address: null })
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) throw updateError;

    console.log(`✅ Wallet unlinked from user: ${updatedUser.id}`);

    res.json({
      success: true,
      message: 'Wallet unlinked successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error unlinking wallet:', error);
    res.status(500).json({ 
      error: 'Failed to unlink wallet',
      details: error.message 
    });
  }
});

// GET /api/auth/user/:walletAddress - Get user by wallet
router.get('/user/:walletAddress', async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', req.params.walletAddress.toLowerCase())
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// GET /api/auth/me - Get current authenticated user
router.get('/me', async (req, res) => {
  try {
    // Get user from session (requires middleware to extract token)
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.replace('Bearer ', '');
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error) throw error;

    // Get user record
    const { data: userRecord } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', user.id)
      .single();

    res.json({
      success: true,
      user: userRecord || user
    });

  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;