// ─── Razorpay Payment Integration ────────────────────────────
//
// PRODUCTION NOTE: For production, payment verification MUST be done
// server-side by verifying the payment signature with the Razorpay
// secret key (razorpay_order_id + razorpay_payment_id + razorpay_signature).
// For MVP, client-side localStorage is acceptable to unlock features
// after a successful payment callback.
//

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// ──────────────────────────────────────────────────────────────
// Set REACT_APP_RAZORPAY_KEY in your .env file (root of project):
//   REACT_APP_RAZORPAY_KEY=rzp_live_xxxxx
// For Netlify, add it in Site Settings → Environment Variables.
// NEVER put your Key Secret in frontend code.
// ──────────────────────────────────────────────────────────────
const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY;

// ──────────────────────────────────────────────────────────────
// CURRENCY NOTE: Razorpay requires approval for international
// (non-INR) payments. If USD is not yet approved on your account,
// temporarily change currency to 'INR' and use these amounts:
//   - Single report: 59900  (₹599 in paise, ~$6.99)
//   - Subscription:  33900  (₹339 in paise, ~$3.99)
// Once USD is approved, switch back to USD with the amounts below.
// ──────────────────────────────────────────────────────────────

export const buySingleReport = async () => {
  const loaded = await loadRazorpay();
  if (!loaded) {
    alert('Payment system failed to load. Please try again.');
    return;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: 699, // $6.99 in cents (Razorpay uses smallest currency unit)
    currency: 'USD',
    name: 'LuxeCheck',
    description: 'Single Authentication Report',
    image: '/logo192.png',
    handler: function (response) {
      if (response.razorpay_payment_id) {
        localStorage.setItem('luxecheck_paid_report', 'true');
        localStorage.setItem('luxecheck_payment_id', response.razorpay_payment_id);
        window.location.href = '/payment-success?type=single';
      }
    },
    prefill: {},
    theme: {
      color: '#B8945F',
    },
    config: {
      display: {
        blocks: {
          banks: {
            name: 'Pay using',
            instruments: [
              { method: 'upi' },
              { method: 'card' },
              { method: 'netbanking' },
              { method: 'wallet' },
            ],
          },
        },
        sequence: ['block.banks'],
        preferences: {
          show_default_blocks: true,
        },
      },
    },
    modal: {
      ondismiss: function () {
        console.log('Payment cancelled');
      },
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

export const buySubscription = async () => {
  const loaded = await loadRazorpay();
  if (!loaded) {
    alert('Payment system failed to load. Please try again.');
    return;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: 399, // $3.99 in cents
    currency: 'USD',
    name: 'LuxeCheck',
    description: 'Unlimited Monthly Subscription',
    image: '/logo192.png',
    handler: function (response) {
      if (response.razorpay_payment_id) {
        localStorage.setItem('luxecheck_subscribed', 'true');
        localStorage.setItem('luxecheck_subscription_id', response.razorpay_payment_id);
        window.location.href = '/payment-success?type=subscription';
      }
    },
    prefill: {},
    theme: {
      color: '#B8945F',
    },
    config: {
      display: {
        blocks: {
          banks: {
            name: 'Pay using',
            instruments: [
              { method: 'upi' },
              { method: 'card' },
              { method: 'netbanking' },
              { method: 'wallet' },
            ],
          },
        },
        sequence: ['block.banks'],
        preferences: {
          show_default_blocks: true,
        },
      },
    },
    modal: {
      ondismiss: function () {
        console.log('Payment cancelled');
      },
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
