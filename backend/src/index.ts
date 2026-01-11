// 1. Force the PORT to be a number
const PORT: number = Number(process.env.PORT) || 3000;

// ... other middleware and routes ...

// 2. Update the listen function
app.listen(PORT, '0.0.0.0', () => {
  console.log('--------------------------------------------------');
  console.log(`🚀 API running on port ${PORT}`);
  
  // Safe check for the Firebase environment variable
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      console.log(`🔥 Firebase Project: ${serviceAccount.project_id}`);
    } catch (e) {
      console.log('🔥 Firebase: Service account found but failed to parse.');
    }
  }

  console.log(
    `🔑 Razorpay Mode: ${
      process.env.RAZORPAY_KEY_ID?.startsWith('rzp_test') ? 'Test' : 'Live'
    }`
  );
  console.log('--------------------------------------------------');
});
