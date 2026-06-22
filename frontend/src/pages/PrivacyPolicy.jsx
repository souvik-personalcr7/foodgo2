import React from 'react';

function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', padding: '100px 20px 40px', background: '#fffbeb', color: '#444' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #fde68a' }}>
        <h1 style={{ color: '#92400e', marginBottom: '20px', fontSize: '2.5rem', fontWeight: '800' }}>Privacy Policy</h1>
        <p style={{ lineHeight: '1.6', marginBottom: '16px', color: '#78716c' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 style={{ color: '#b45309', marginTop: '30px', marginBottom: '10px', fontSize: '1.5rem', fontWeight: '700' }}>1. Information We Collect</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
          We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.
        </p>

        <h2 style={{ color: '#b45309', marginTop: '30px', marginBottom: '10px', fontSize: '1.5rem', fontWeight: '700' }}>2. Use of Information</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
          We may use the information we collect about you to provide, maintain, and improve our services, including to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages.
        </p>

        <h2 style={{ color: '#b45309', marginTop: '30px', marginBottom: '10px', fontSize: '1.5rem', fontWeight: '700' }}>3. Sharing of Information</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
          We may share the information we collect about you with vendors, consultants, marketing partners, and other service providers who need access to such information to carry out work on our behalf.
        </p>

        <h2 style={{ color: '#b45309', marginTop: '30px', marginBottom: '10px', fontSize: '1.5rem', fontWeight: '700' }}>4. Security</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
          We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
