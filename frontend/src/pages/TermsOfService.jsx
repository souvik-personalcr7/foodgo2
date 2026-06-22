import React from 'react';

function TermsOfService() {
  return (
    <div style={{ minHeight: '100vh', padding: '100px 20px 40px', background: '#fffbeb', color: '#444' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #fde68a' }}>
        <h1 style={{ color: '#92400e', marginBottom: '20px', fontSize: '2.5rem', fontWeight: '800' }}>Terms of Service</h1>
        <p style={{ lineHeight: '1.6', marginBottom: '16px', color: '#78716c' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ color: '#b45309', marginTop: '30px', marginBottom: '10px', fontSize: '1.5rem', fontWeight: '700' }}>1. Acceptance of Terms</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
          By accessing or using our application, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, then you may not access the website or use any services.
        </p>

        <h2 style={{ color: '#b45309', marginTop: '30px', marginBottom: '10px', fontSize: '1.5rem', fontWeight: '700' }}>2. User Accounts</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
          You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer or mobile device, and you agree to accept responsibility for all activities that occur under your account or password.
        </p>

        <h2 style={{ color: '#b45309', marginTop: '30px', marginBottom: '10px', fontSize: '1.5rem', fontWeight: '700' }}>3. Service Modifications</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
          We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
        </p>

        <h2 style={{ color: '#b45309', marginTop: '30px', marginBottom: '10px', fontSize: '1.5rem', fontWeight: '700' }}>4. Prohibited Uses</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
          You are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances.
        </p>
      </div>
    </div>
  );
}

export default TermsOfService;
