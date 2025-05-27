import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import '../styles/TermsConditions.css';

// Import icons
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PolicyIcon from '@mui/icons-material/Policy';
import LanguageIcon from '@mui/icons-material/Language';
import TranslateIcon from '@mui/icons-material/Translate';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Sample data for terms sections
const initialTermsSections = [
  {
    id: 1,
    title: 'General Terms',
    icon: 'gavel',
    content: `
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing or using our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.</p>
      
      <h3>2. Eligibility</h3>
      <p>You must be at least 18 years old and legally permitted to gamble in your jurisdiction to use our services. We reserve the right to request proof of age and identity at any time.</p>
      
      <h3>3. Account Registration</h3>
      <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and complete information during registration and to update such information as necessary.</p>
      
      <h3>4. Intellectual Property</h3>
      <p>All content, design, graphics, compilation, magnetic translation, digital conversion, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary rights.</p>
    `,
    lastUpdated: '2023-10-15',
    language: 'English',
    active: true,
  },
  {
    id: 2,
    title: 'Privacy Policy',
    icon: 'security',
    content: `
      <h3>1. Information Collection</h3>
      <p>We collect personal information that you provide to us, including but not limited to your name, email address, date of birth, and payment information. We also collect information about your interactions with our services.</p>
      
      <h3>2. Use of Information</h3>
      <p>We use your information to provide and improve our services, process transactions, communicate with you, and comply with legal obligations. We may also use your information for marketing purposes with your consent.</p>
      
      <h3>3. Information Sharing</h3>
      <p>We do not sell your personal information. We may share your information with third-party service providers who perform services on our behalf, such as payment processing and data analysis.</p>
      
      <h3>4. Data Security</h3>
      <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
    `,
    lastUpdated: '2023-11-05',
    language: 'English',
    active: true,
  },
  {
    id: 3,
    title: 'Payment Terms',
    icon: 'credit_card',
    content: `
      <h3>1. Deposits</h3>
      <p>We accept various payment methods for deposits. All deposits are subject to verification and approval. We reserve the right to request additional verification information before processing deposits.</p>
      
      <h3>2. Withdrawals</h3>
      <p>Withdrawal requests are subject to review and approval. We may require additional verification before processing withdrawals. Withdrawals are typically processed within 1-3 business days, depending on the payment method.</p>
      
      <h3>3. Fees</h3>
      <p>We do not charge fees for deposits. However, some payment providers may charge their own fees. Withdrawal fees may apply depending on the payment method and amount.</p>
      
      <h3>4. Currency</h3>
      <p>All transactions are processed in the currency specified in your account. Currency conversion fees may apply if your payment method uses a different currency.</p>
    `,
    lastUpdated: '2023-09-20',
    language: 'English',
    active: true,
  },
  {
    id: 4,
    title: 'Responsible Gambling',
    icon: 'policy',
    content: `
      <h3>1. Self-Exclusion</h3>
      <p>We offer self-exclusion options for players who wish to take a break from gambling. During the self-exclusion period, you will not be able to access your account or receive marketing communications from us.</p>
      
      <h3>2. Deposit Limits</h3>
      <p>You can set daily, weekly, or monthly deposit limits on your account. These limits help you control your gambling activity and prevent excessive spending.</p>
      
      <h3>3. Reality Checks</h3>
      <p>We provide reality checks to help you keep track of your gambling session time. These notifications remind you how long you have been playing and give you the option to continue or end your session.</p>
      
      <h3>4. Support Resources</h3>
      <p>If you believe you may have a gambling problem, we encourage you to seek help. We provide links to gambling support organizations and resources on our website.</p>
    `,
    lastUpdated: '2023-12-01',
    language: 'English',
    active: true,
  },
];

const TermsConditions: React.FC = () => {
  const [termsSections, setTermsSections] = useState(initialTermsSections);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewSection, setPreviewSection] = useState<number | null>(null);
  
  const [newSection, setNewSection] = useState({
    title: '',
    icon: 'gavel',
    content: '',
    language: 'English',
    active: true,
  });
  
  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'gavel':
        return <GavelIcon />;
      case 'security':
        return <SecurityIcon />;
      case 'credit_card':
        return <CreditCardIcon />;
      case 'account_balance':
        return <AccountBalanceIcon />;
      case 'policy':
        return <PolicyIcon />;
      case 'language':
        return <LanguageIcon />;
      default:
        return <GavelIcon />;
    }
  };
  
  // Handle save section
  const handleSaveSection = (id: number, content: string) => {
    setTermsSections(termsSections.map(section => 
      section.id === id ? { ...section, content, lastUpdated: new Date().toISOString().split('T')[0] } : section
    ));
    setEditingSection(null);
  };
  
  // Handle add new section
  const handleAddSection = () => {
    const newId = Math.max(...termsSections.map(section => section.id)) + 1;
    
    setTermsSections([
      ...termsSections,
      {
        ...newSection,
        id: newId,
        lastUpdated: new Date().toISOString().split('T')[0],
      },
    ]);
    
    setNewSection({
      title: '',
      icon: 'gavel',
      content: '',
      language: 'English',
      active: true,
    });
  };
  
  // Handle delete section
  const handleDeleteSection = (id: number) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      setTermsSections(termsSections.filter(section => section.id !== id));
    }
  };
  
  // Handle toggle active status
  const handleToggleActive = (id: number) => {
    setTermsSections(termsSections.map(section => 
      section.id === id ? { ...section, active: !section.active } : section
    ));
  };
  
  // Preview section
  const handlePreviewSection = (id: number) => {
    setPreviewSection(id);
    setShowPreview(true);
  };

  return (
    <div className="admin-dashboard">
      <h1>Terms & Conditions</h1>
      <p className="section-description">Manage legal documents, terms of service, and policies</p>
      
      <div className="terms-container">
        <div className="terms-header">
          <div className="terms-actions">
            <button 
              className="add-section-button"
              onClick={() => {
                setEditingSection(null);
                document.getElementById('add-section-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <AddIcon /> Add New Section
            </button>
          </div>
        </div>
        
        <div className="terms-sections">
          {termsSections.map(section => (
            <div key={section.id} className={`terms-section ${!section.active ? 'inactive' : ''}`}>
              <div className="section-header">
                <div className="section-icon">
                  {getIconComponent(section.icon)}
                </div>
                <div className="section-title">
                  <h3>{section.title}</h3>
                  <div className="section-meta">
                    <span className="language">
                      <TranslateIcon /> {section.language}
                    </span>
                    <span className="last-updated">
                      <HistoryIcon /> Last updated: {section.lastUpdated}
                    </span>
                  </div>
                </div>
                <div className="section-status">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={section.active}
                      onChange={() => handleToggleActive(section.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
              
              {editingSection === section.id ? (
                <div className="section-editor">
                  <textarea 
                    value={section.content}
                    onChange={(e) => {
                      setTermsSections(termsSections.map(s => 
                        s.id === section.id ? { ...s, content: e.target.value } : s
                      ));
                    }}
                    rows={15}
                  />
                  <div className="editor-actions">
                    <button 
                      className="cancel-button"
                      onClick={() => setEditingSection(null)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="save-button"
                      onClick={() => handleSaveSection(section.id, section.content)}
                    >
                      <SaveIcon /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="section-content-preview">
                  <div dangerouslySetInnerHTML={{ __html: section.content.substring(0, 200) + '...' }} />
                  <div className="content-actions">
                    <button 
                      className="preview-button"
                      onClick={() => handlePreviewSection(section.id)}
                    >
                      <VisibilityIcon /> Preview
                    </button>
                    <button 
                      className="edit-button"
                      onClick={() => setEditingSection(section.id)}
                    >
                      <EditIcon /> Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteSection(section.id)}
                    >
                      <DeleteIcon /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div id="add-section-form" className="add-section-form">
          <h2>Add New Section</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label>Section Title</label>
              <input 
                type="text" 
                value={newSection.title}
                onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                placeholder="e.g. General Terms, Privacy Policy"
              />
            </div>
            
            <div className="form-group">
              <label>Icon</label>
              <select 
                value={newSection.icon}
                onChange={(e) => setNewSection({...newSection, icon: e.target.value})}
              >
                <option value="gavel">Legal (Gavel)</option>
                <option value="security">Security/Privacy</option>
                <option value="credit_card">Payments</option>
                <option value="account_balance">Banking</option>
                <option value="policy">Policy</option>
                <option value="language">General</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Language</label>
              <select 
                value={newSection.language}
                onChange={(e) => setNewSection({...newSection, language: e.target.value})}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Italian">Italian</option>
                <option value="Portuguese">Portuguese</option>
              </select>
            </div>
            
            <div className="form-group toggle-group">
              <label>Active</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={newSection.active}
                  onChange={(e) => setNewSection({...newSection, active: e.target.checked})}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label>Content</label>
            <textarea 
              value={newSection.content}
              onChange={(e) => setNewSection({...newSection, content: e.target.value})}
              rows={10}
              placeholder="Enter HTML content here..."
            />
            <p className="help-text">You can use HTML tags for formatting (e.g. &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;)</p>
          </div>
          
          <div className="form-actions">
            <button 
              className="save-button"
              onClick={handleAddSection}
              disabled={!newSection.title || !newSection.content}
            >
              <AddIcon /> Add Section
            </button>
          </div>
        </div>
        
        {showPreview && previewSection && (
          <div className="preview-modal">
            <div className="preview-content">
              <div className="preview-header">
                <h2>
                  {getIconComponent(termsSections.find(s => s.id === previewSection)?.icon || 'gavel')}
                  {termsSections.find(s => s.id === previewSection)?.title}
                </h2>
                <button 
                  className="close-preview"
                  onClick={() => {
                    setShowPreview(false);
                    setPreviewSection(null);
                  }}
                >
                  &times;
                </button>
              </div>
              <div 
                className="preview-body"
                dangerouslySetInnerHTML={{ 
                  __html: termsSections.find(s => s.id === previewSection)?.content || '' 
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TermsConditions; 