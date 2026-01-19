'use client';

import { useEffect, useState } from 'react';

/**
 * Asset preloader configuration
 * Defines which assets to preload before rendering
 */
interface PreloadAsset {
  src: string;
  type: 'image' | 'font' | 'script';
  critical?: boolean; // Critical assets must load before showing content
}

/**
 * Hook to manage asset preloading
 * Preloads critical assets (parallax images, cursor assets, spinner images) before rendering
 * Returns loading state for conditional rendering
 *
 * @param assets - Array of assets to preload
 * @returns Object with loading state and error info
 */
export function useAssetPreloader(assets: PreloadAsset[] = getDefaultAssets()) {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [preloadErrors, setPreloadErrors] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    const errors: string[] = [];

    const preloadAssets = async () => {
      try {
        const preloadPromises = assets.map((asset) => {
          return new Promise<void>((resolve) => {
            if (asset.type === 'image') {
              const img = new Image();

              img.onload = () => resolve();
              img.onerror = () => {
                const errorMsg = `Failed to preload image: ${asset.src}`;
                errors.push(errorMsg);
                console.warn(errorMsg);
                // Resolve anyway to not block other assets
                resolve();
              };

              img.src = asset.src;
            } else {
              // Non-critical assets resolve immediately
              resolve();
            }
          });
        });

        await Promise.all(preloadPromises);

        if (isMounted) {
          setPreloadErrors(errors);
          setIsPreloaded(true);
        }
      } catch (error) {
        console.error('Asset preloading failed:', error);
        if (isMounted) {
          setIsPreloaded(true); // Continue even if preloading fails
        }
      }
    };

    preloadAssets();

    return () => {
      isMounted = false;
    };
  }, [assets]);

  return {
    isPreloaded,
    preloadErrors,
    hasErrors: preloadErrors.length > 0,
  };
}

/**
 * Gets default critical assets to preload
 * Includes parallax layers (both alive and dead variants for light/dark), cursor assets, and spinner images
 */
function getDefaultAssets(): PreloadAsset[] {
  return [
    // Parallax background layers - ALIVE variant (light mode)
    { src: '/keyart/alive/index-0.png', type: 'image', critical: true },
    { src: '/keyart/alive/index-1.png', type: 'image', critical: true },
    { src: '/keyart/alive/index-2.png', type: 'image', critical: true },
    { src: '/keyart/alive/index-3.png', type: 'image', critical: true },
    { src: '/keyart/alive/index-4.png', type: 'image', critical: true },
    { src: '/keyart/alive/index-5.png', type: 'image', critical: true },
    { src: '/keyart/alive/index-6.png', type: 'image', critical: true },

    // Parallax background layers - DEAD variant (dark mode)
    { src: '/keyart/dead/index-0.png', type: 'image', critical: true },
    { src: '/keyart/dead/index-1.png', type: 'image', critical: true },
    { src: '/keyart/dead/index-2.png', type: 'image', critical: true },
    { src: '/keyart/dead/index-3.png', type: 'image', critical: true },
    { src: '/keyart/dead/index-4.png', type: 'image', critical: true },
    { src: '/keyart/dead/index-5.png', type: 'image', critical: true },
    { src: '/keyart/dead/index-6.png', type: 'image', critical: true },

    // Spinner images (loading states)
    { src: '/spinner-light.webp', type: 'image', critical: true },
    { src: '/spinner-dark.webp', type: 'image', critical: true },

    // Note: Cursor assets are handled dynamically by the cursor component
    // and don't need to be preloaded here
  ];
}
