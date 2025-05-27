import React, { useState } from 'react';
import '../styles/AdminDashboard.css';
import '../styles/PaymentSettings.css';

// Import MUI components
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip
} from '@mui/material';

// Import icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  fee: number;
  minAmount: number;
  maxAmount: number;
  status: boolean;
}

const PaymentSettings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', name: 'Visa/Mastercard', type: 'card', fee: 2.5, minAmount: 10, maxAmount: 5000, status: true },
    { id: '2', name: 'Bank Transfer', type: 'bank', fee: 1.0, minAmount: 50, maxAmount: 50000, status: true },
    { id: '3', name: 'PayPal', type: 'digital', fee: 3.0, minAmount: 5, maxAmount: 2000, status: true },
    { id: '4', name: 'Cryptocurrency', type: 'crypto', fee: 0.5, minAmount: 20, maxAmount: 100000, status: false },
  ]);
  
  // General settings
  const [defaultCurrency, setDefaultCurrency] = useState('PHP');
  const [withdrawalLimit, setWithdrawalLimit] = useState(10000);
  const [depositLimit, setDepositLimit] = useState(50000);
  const [autoApproveWithdrawals, setAutoApproveWithdrawals] = useState(false);
  
  // Security settings
  const [requireKYC, setRequireKYC] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleToggleStatus = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => 
        method.id === id ? { ...method, status: !method.status } : method
      )
    );
  };

  const handleSaveSettings = () => {
    // In a real app, this would save the settings to a database
    alert('Payment settings saved successfully!');
  };

  return (
    <div className="admin-dashboard">
      <h1>Payment Settings</h1>
      <p className="section-description">Manage payment methods, currencies, and transaction settings</p>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="payment settings tabs"
          variant="fullWidth"
        >
          <Tab icon={<PaymentIcon />} label="PAYMENT METHODS" />
          <Tab icon={<SettingsIcon />} label="GENERAL SETTINGS" />
          <Tab icon={<SecurityIcon />} label="SECURITY" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddCircleOutlineIcon />}
          >
            Add Payment Method
          </Button>
        </Box>
        
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Fee (%)</TableCell>
                <TableCell>Min Amount</TableCell>
                <TableCell>Max Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentMethods.map((method) => (
                <TableRow key={method.id}>
                  <TableCell>{method.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={method.type.charAt(0).toUpperCase() + method.type.slice(1)} 
                      color={
                        method.type === 'card' ? 'primary' :
                        method.type === 'bank' ? 'secondary' :
                        method.type === 'digital' ? 'info' : 'success'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{method.fee}%</TableCell>
                  <TableCell>₱{method.minAmount}</TableCell>
                  <TableCell>₱{method.maxAmount}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={method.status} 
                          onChange={() => handleToggleStatus(method.id)}
                          color="primary"
                        />
                      }
                      label={method.status ? "Active" : "Inactive"}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Currency Settings" />
              <Divider />
              <CardContent>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Default Currency</InputLabel>
                  <Select
                    value={defaultCurrency}
                    label="Default Currency"
                    onChange={(e) => setDefaultCurrency(e.target.value)}
                  >
                    <MenuItem value="PHP">Philippine Peso (₱)</MenuItem>
                    <MenuItem value="USD">US Dollar ($)</MenuItem>
                    <MenuItem value="EUR">Euro (€)</MenuItem>
                    <MenuItem value="GBP">British Pound (£)</MenuItem>
                  </Select>
                </FormControl>
                
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={true}
                        color="primary"
                      />
                    }
                    label="Allow multiple currencies"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Transaction Limits" />
              <Divider />
              <CardContent>
                <TextField
                  fullWidth
                  label="Maximum Withdrawal (per day)"
                  type="number"
                  value={withdrawalLimit}
                  onChange={(e) => setWithdrawalLimit(Number(e.target.value))}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>₱</Typography>,
                  }}
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  label="Maximum Deposit (per transaction)"
                  type="number"
                  value={depositLimit}
                  onChange={(e) => setDepositLimit(Number(e.target.value))}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1 }}>₱</Typography>,
                  }}
                  margin="normal"
                />
                
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={autoApproveWithdrawals}
                        onChange={(e) => setAutoApproveWithdrawals(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Auto-approve withdrawals under ₱1,000"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="KYC Verification" />
              <Divider />
              <CardContent>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={requireKYC}
                      onChange={(e) => setRequireKYC(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Require KYC for withdrawals"
                />
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    KYC Level Requirements
                  </Typography>
                  
                  <FormControlLabel
                    control={<Switch defaultChecked color="primary" />}
                    label="Level 1: ID Verification"
                  />
                  
                  <FormControlLabel
                    control={<Switch defaultChecked color="primary" />}
                    label="Level 2: Address Verification"
                  />
                  
                  <FormControlLabel
                    control={<Switch defaultChecked color="primary" />}
                    label="Level 3: Income Verification"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Authentication Settings" />
              <Divider />
              <CardContent>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Enable 2FA for withdrawals"
                />
                
                <TextField
                  fullWidth
                  label="Maximum Login Attempts"
                  type="number"
                  value={maxLoginAttempts}
                  onChange={(e) => setMaxLoginAttempts(Number(e.target.value))}
                  margin="normal"
                />
                
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel
                    control={<Switch defaultChecked color="primary" />}
                    label="Email notification for large transactions"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
          size="large"
        >
          Save Settings
        </Button>
      </Box>
    </div>
  );
};

export default PaymentSettings; 