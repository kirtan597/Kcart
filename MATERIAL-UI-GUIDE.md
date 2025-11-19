# 🎨 Material-UI Integration Guide

## ✅ Installation Complete

Material-UI has been installed in your project:
```bash
✓ @mui/material
✓ @emotion/react
✓ @emotion/styled
✓ @mui/icons-material
```

## 🚀 Quick Start

### 1. Basic Setup

Create a theme file: `client/src/theme.js`
```javascript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5', // Indigo-600
    },
    secondary: {
      main: '#7C3AED', // Purple-600
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});
```

### 2. Wrap App with ThemeProvider

Update `client/src/main.jsx`:
```javascript
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ShopContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

## 📦 Common Components

### Buttons
```javascript
import { Button } from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';

// Variants
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>

// With Icons
<Button variant="contained" startIcon={<ShoppingCart />}>
  Add to Cart
</Button>

// Colors
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="error">Delete</Button>
```

### Cards
```javascript
import { Card, CardContent, CardMedia, CardActions, Typography } from '@mui/material';

<Card>
  <CardMedia
    component="img"
    height="200"
    image={productImage}
    alt={productName}
  />
  <CardContent>
    <Typography variant="h6">{productName}</Typography>
    <Typography variant="body2" color="text.secondary">
      ₹{price}
    </Typography>
  </CardContent>
  <CardActions>
    <Button size="small">Add to Cart</Button>
  </CardActions>
</Card>
```

### Forms
```javascript
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

<TextField
  label="Email"
  variant="outlined"
  fullWidth
  type="email"
/>

<FormControl fullWidth>
  <InputLabel>Category</InputLabel>
  <Select value={category} onChange={handleChange}>
    <MenuItem value="men">Men</MenuItem>
    <MenuItem value="women">Women</MenuItem>
    <MenuItem value="kids">Kids</MenuItem>
  </Select>
</FormControl>
```

### Grid Layout
```javascript
import { Grid, Container } from '@mui/material';

<Container maxWidth="lg">
  <Grid container spacing={3}>
    <Grid item xs={12} sm={6} md={4}>
      {/* Product Card */}
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
      {/* Product Card */}
    </Grid>
  </Grid>
</Container>
```

### Dialogs/Modals
```javascript
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Product Details</DialogTitle>
  <DialogContent>
    {/* Content */}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button variant="contained">Confirm</Button>
  </DialogActions>
</Dialog>
```

### Snackbar (Notifications)
```javascript
import { Snackbar, Alert } from '@mui/material';

<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert severity="success">Product added to cart!</Alert>
</Snackbar>
```

## 🎨 Example: Product Card with MUI

```javascript
import { Card, CardMedia, CardContent, CardActions, Typography, Button, IconButton, Chip } from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';

function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      {product.bestseller && (
        <Chip 
          label="Bestseller" 
          color="secondary" 
          size="small"
          sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
        />
      )}
      
      <CardMedia
        component="img"
        height="300"
        image={product.image[0]}
        alt={product.name}
      />
      
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {product.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        
        <Typography variant="h5" color="primary" fontWeight="bold">
          ₹{product.price}
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Button 
          variant="contained" 
          startIcon={<ShoppingCart />}
          fullWidth
          sx={{ mr: 1 }}
        >
          Add to Cart
        </Button>
        
        <IconButton color="error">
          <Favorite />
        </IconButton>
      </CardActions>
    </Card>
  );
}
```

## 🎯 Icons Available

```javascript
import {
  ShoppingCart,
  Favorite,
  Person,
  Search,
  Menu,
  Close,
  Delete,
  Edit,
  Add,
  Remove,
  Star,
  StarBorder,
  LocalShipping,
  Payment,
  CheckCircle,
  Error,
  Info,
  Warning,
} from '@mui/icons-material';
```

## 📱 Responsive Design

```javascript
import { useMediaQuery, useTheme } from '@mui/material';

function MyComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{
      padding: isMobile ? 2 : 4,
      fontSize: isMobile ? '14px' : '16px',
    }}>
      {/* Content */}
    </Box>
  );
}
```

## 🎨 Styling Options

### 1. sx Prop (Recommended)
```javascript
<Button sx={{ 
  backgroundColor: 'primary.main',
  '&:hover': { backgroundColor: 'primary.dark' },
  borderRadius: 2,
  px: 3,
  py: 1.5,
}}>
  Click Me
</Button>
```

### 2. styled() API
```javascript
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
```

## 🔄 Migration Strategy

### Phase 1: Core Components
1. Replace buttons with MUI Button
2. Replace cards with MUI Card
3. Replace forms with MUI TextField/Select

### Phase 2: Layout
1. Use MUI Grid for layouts
2. Use MUI Container for page width
3. Use MUI Stack for spacing

### Phase 3: Advanced
1. Add MUI Dialogs for modals
2. Add MUI Snackbar for notifications
3. Add MUI Drawer for mobile menu

## 📚 Resources

- **Documentation**: https://mui.com/material-ui/getting-started/
- **Components**: https://mui.com/material-ui/all-components/
- **Icons**: https://mui.com/material-ui/material-icons/
- **Templates**: https://mui.com/material-ui/getting-started/templates/

## ✅ Benefits of Material-UI

1. **Professional Look**: Google's Material Design
2. **Responsive**: Built-in responsive components
3. **Accessible**: ARIA compliant out of the box
4. **Customizable**: Easy theming and styling
5. **Icons**: 2000+ Material Design icons included
6. **TypeScript**: Full TypeScript support
7. **Active Community**: Regular updates and support

## 🎯 Next Steps

1. Create theme.js file
2. Wrap App with ThemeProvider
3. Start replacing components gradually
4. Test on different screen sizes
5. Customize theme colors to match Kcart branding

Happy coding with Material-UI! 🚀
