'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ABTestProps {
  testId: string;
  variants: {
    [key: string]: ReactNode;
  };
  defaultVariant?: string;
  onVariantShown?: (variant: string) => void;
}

/**
 * مكون A/B Testing لاختبار نسختين أو أكثر من واجهة المستخدم
 * 
 * مثال الاستخدام:
 * <ABTest
 *   testId="homepage-cta"
 *   variants={{
 *     control: <Button>اشترِ الآن</Button>,
 *     variant_a: <Button>احصل عليه الآن</Button>,
 *     variant_b: <Button>اطلب الآن</Button>
 *   }}
 *   onVariantShown={(variant) => trackEvent('variant_shown', { variant })}
 * />
 */
export default function ABTest({
  testId,
  variants,
  defaultVariant = 'control',
  onVariantShown
}: ABTestProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  useEffect(() => {
    // التحقق من وجود نسخة محفوظة للمستخدم
    const storageKey = `ab_test_${testId}`;
    const savedVariant = localStorage.getItem(storageKey);

    if (savedVariant && variants[savedVariant]) {
      setSelectedVariant(savedVariant);
      onVariantShown?.(savedVariant);
      return;
    }

    // اختيار نسخة عشوائية
    const variantKeys = Object.keys(variants);
    const randomVariant = variantKeys[Math.floor(Math.random() * variantKeys.length)];
    
    setSelectedVariant(randomVariant);
    localStorage.setItem(storageKey, randomVariant);

    // تتبع النسخة المعروضة
    trackVariant(testId, randomVariant);
    onVariantShown?.(randomVariant);

  }, [testId, variants, onVariantShown]);

  // عرض النسخة الافتراضية أثناء التحميل
  if (!selectedVariant) {
    return <>{variants[defaultVariant] || null}</>;
  }

  return <>{variants[selectedVariant]}</>;
}

/**
 * تتبع النسخة المعروضة
 */
async function trackVariant(testId: string, variant: string) {
  try {
    await fetch('/api/analytics/ab-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        testId,
        variant,
        event: 'variant_shown',
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('خطأ في تتبع A/B test:', error);
  }
}

/**
 * Hook لتتبع تفاعلات المستخدم مع النسخة
 */
export function useABTestTracking(testId: string) {
  const trackConversion = async (conversionType: string = 'click') => {
    const storageKey = `ab_test_${testId}`;
    const variant = localStorage.getItem(storageKey);

    if (!variant) return;

    try {
      await fetch('/api/analytics/ab-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          testId,
          variant,
          event: 'conversion',
          conversionType,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('خطأ في تتبع conversion:', error);
    }
  };

  return { trackConversion };
}
