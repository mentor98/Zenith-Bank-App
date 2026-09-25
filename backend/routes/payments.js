import express from 'express';
import axios from 'axios';
import { supabase } from '../config/supabase.js';
import { verifyToken } from '../middleware/auth.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;

// Initialize payment
router.post('/initialize', verifyToken, async (req, res) => {
  try {
    const { amount, email, description, billType } = req.body;

    if (!amount || !email) {
      return res.status(400).json({ error: 'Amount and email are required' });
    }

    const reference = `zenith_${Date.now()}_${uuidv4().slice(0, 8)}`;

    // Create payment record
    const { data: payment, error: dbError } = await supabase
      .from('payments')
      .insert({
        user_id: req.userId,
        amount: parseFloat(amount),
        reference,
        description: description || billType,
        status: 'pending',
        metadata: { billType }
      })
      .select()
      .single();

    if (dbError) {
      return res.status(400).json({ error: dbError.message });
    }

    // Initialize Paystack transaction
    try {
      const paystackResponse = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
          amount: Math.round(parseFloat(amount) * 100), // Paystack expects amount in kobo
          email,
          reference,
          metadata: {
            custom_fields: [
              {
                display_name: 'Bill Type',
                variable_name: 'bill_type',
                value: billType || 'payment'
              }
            ]
          }
        },
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update payment with Paystack reference
      await supabase
        .from('payments')
        .update({
          paystack_reference: paystackResponse.data.data.reference,
          metadata: {
            ...payment.metadata,
            paystack_access_code: paystackResponse.data.data.access_code
          }
        })
        .eq('id', payment.id);

      res.json({
        message: 'Payment initialized',
        authorization_url: paystackResponse.data.data.authorization_url,
        access_code: paystackResponse.data.data.access_code,
        reference: reference,
        paymentId: payment.id
      });
    } catch (paystackError) {
      console.error('Paystack error:', paystackError.response?.data);
      return res.status(400).json({ 
        error: 'Failed to initialize payment with Paystack',
        details: paystackError.response?.data?.message 
      });
    }
  } catch (error) {
    console.error('Initialize payment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify payment
router.post('/verify', verifyToken, async (req, res) => {
  try {
    const { reference } = req.body;

    if (!reference) {
      return res.status(400).json({ error: 'Reference is required' });
    }

    // Verify with Paystack
    try {
      const paystackResponse = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`
          }
        }
      );

      const transactionData = paystackResponse.data.data;
      const isSuccessful = transactionData.status === 'success';

      // Update payment status
      const { data: payment, error: updateError } = await supabase
        .from('payments')
        .update({
          status: isSuccessful ? 'completed' : 'failed',
          metadata: {
            paystack_status: transactionData.status,
            paystack_message: transactionData.gateway_response
          }
        })
        .eq('paystack_reference', reference)
        .select()
        .single();

      if (updateError) {
        console.error('Update error:', updateError);
      }

      res.json({
        message: isSuccessful ? 'Payment verified successfully' : 'Payment verification failed',
        status: transactionData.status,
        reference: reference,
        amount: transactionData.amount / 100, // Convert from kobo
        payment: payment
      });
    } catch (paystackError) {
      console.error('Paystack verification error:', paystackError.response?.data);
      return res.status(400).json({ 
        error: 'Failed to verify payment',
        details: paystackError.response?.data?.message 
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get payment history
router.get('/history', verifyToken, async (req, res) => {
  try {
    const { data: payments, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', req.userId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ payments });
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Webhook for Paystack
router.post('/webhook', async (req, res) => {
  try {
    const hash = req.headers['x-paystack-signature'];
    const body = req.rawBody || JSON.stringify(req.body);

    // In production, verify the webhook signature
    // For now, just process it
    const event = req.body;

    if (event.event === 'charge.success') {
      const reference = event.data.reference;

      // Update payment status
      await supabase
        .from('payments')
        .update({ status: 'completed' })
        .eq('paystack_reference', reference);
    }

    res.json({ message: 'Webhook received' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
