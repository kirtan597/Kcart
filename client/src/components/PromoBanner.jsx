import { Box, Typography } from '@mui/material';
import { 
  Checkroom as FashionIcon,
  LocalOffer as OfferIcon,
  Favorite as TrendingIcon,
  Star as PremiumIcon,
  CardGiftcard as GiftIcon,
  Bolt as FlashIcon
} from '@mui/icons-material';

const PromoBanner = () => {
  const promoItems = [
    { text: 'Shop Smart, Look Sharp', icon: <FashionIcon />, discount: 'UP TO 50% OFF' },
    { text: 'Trending Styles Now', icon: <TrendingIcon />, discount: 'NEW ARRIVALS' },
    { text: 'Premium Quality Guaranteed', icon: <PremiumIcon />, discount: 'BEST SELLERS' },
    { text: 'Free Shipping Over ₹999', icon: <OfferIcon />, discount: 'LIMITED TIME' },
    { text: 'Flash Sale Alert', icon: <FlashIcon />, discount: '40% OFF' },
    { text: 'Gift Cards Available', icon: <GiftIcon />, discount: 'PERFECT GIFTS' },
  ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...promoItems, ...promoItems, ...promoItems];

  return (
    <Box
      sx={{
        width: '100%',
        background: 'linear-gradient(135deg, #1F2937 0%, #374151 50%, #4B5563 100%)',
        py: { xs: 3, sm: 4, md: 5 },
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 6,
          animation: 'scroll 10s linear infinite',
          '@keyframes scroll': {
            '0%': {
              transform: 'translateX(0)',
            },
            '100%': {
              transform: 'translateX(-33.333%)',
            },
          },
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              minWidth: 'fit-content',
              px: 3,
              py: 1.5,
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                color: '#1F2937',
              }}
            >
              {item.icon}
            </Box>

            {/* Text */}
            <Box>
              <Typography
                variant="body1"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#D1D5DB',
                  fontWeight: 700,
                  fontSize: { xs: '0.7rem', sm: '0.8rem' },
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                  letterSpacing: '0.5px',
                }}
              >
                {item.discount}
              </Typography>
            </Box>

            {/* Sparkle Effect */}
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#9CA3AF',
                boxShadow: '0 0 8px rgba(156, 163, 175, 0.6)',
                animation: 'sparkle 2s ease-in-out infinite',
                '@keyframes sparkle': {
                  '0%, 100%': {
                    opacity: 0.8,
                    transform: 'scale(1)',
                  },
                  '50%': {
                    opacity: 0.4,
                    transform: 'scale(1.3)',
                  },
                },
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '80px',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(31,41,55,1) 0%, transparent 100%)',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          width: '80px',
          height: '100%',
          background: 'linear-gradient(270deg, rgba(31,41,55,1) 0%, transparent 100%)',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default PromoBanner;
