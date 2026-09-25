import express from 'express';
import { supabase } from '../config/supabase.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get transactions for user
router.get('/', verifyToken, async (req, res) => {
  try {
    // Get user's accounts
    const { data: accounts, error: accountsError } = await supabase
      .from('accounts')
      .select('id')
      .eq('user_id', req.userId);

    if (accountsError) {
      return res.status(400).json({ error: accountsError.message });
    }

    const accountIds = accounts.map(acc => acc.id);

    if (accountIds.length === 0) {
      return res.json({ transactions: [] });
    }

    // Get transactions
    const { data: transactions, error } = await supabase
      .from('transactions')
      .select('*')
      .in('account_id', accountIds)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create transaction
router.post('/', verifyToken, async (req, res) => {
  try {
    const { account_id, type, amount, description, recipient } = req.body;

    if (!account_id || !type || !amount) {
      return res.status(400).json({ 
        error: 'account_id, type, and amount are required' 
      });
    }

    // Verify account belongs to user
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', account_id)
      .eq('user_id', req.userId)
      .single();

    if (accountError || !account) {
      return res.status(403).json({ error: 'Account not found' });
    }

    // Check balance for debit
    if (type === 'debit' && account.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Create transaction
    const { data: transaction, error: transError } = await supabase
      .from('transactions')
      .insert({
        account_id,
        type,
        amount: parseFloat(amount),
        description,
        recipient,
        status: 'completed'
      })
      .select()
      .single();

    if (transError) {
      return res.status(400).json({ error: transError.message });
    }

    // Update account balance
    const newBalance = type === 'debit' 
      ? account.balance - amount 
      : account.balance + amount;

    await supabase
      .from('accounts')
      .update({ balance: newBalance })
      .eq('id', account_id);

    res.status(201).json({ 
      message: 'Transaction created',
      transaction 
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get account balance
router.get('/balance/:accountId', verifyToken, async (req, res) => {
  try {
    const { accountId } = req.params;

    const { data: account, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('id', accountId)
      .eq('user_id', req.userId)
      .single();

    if (error || !account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ balance: account.balance, account });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
