import React, { ReactElement } from 'react';
//import { GalleryProps } from '../media/Gallery';

interface Header {
  title?: string;
  link?: string;
  thumbnailUrl?: string;
}

interface Content {
  imageUrl?: string;
  imageAltText?: string;
  imageGallery?: /*GalleryProps*/ undefined;
}

interface Body {
  description?: string;
  content?: Content;
}

interface Footer {
  text?: string;
  link?: string;
  iconUrl?: string;
}

interface CardProps {
  header?: Header;
  body?: Body;
  footer?: Footer;
  color?: string;
  backgroundColor?: string;
}

/**
 * Card
 *
 * General card component with optional header, body and footer.
 * Supports thumbnail, description, images and footer links.
 *
 * Props:
 * @param {Header | undefined} header - Optional header containing title, link and thumbnail.
 * @param {Body | undefined} body - Optional body containing description and content (images/gallery).
 * @param {Footer | undefined} footer - Optional footer with text/link/icon.
 * @param {string | undefined} color - Optional: border color (applied as inline style on the left).
 * @param {string | undefined} backgroundColor - Optional: background color of the card.
 *
 * Return: ReactElement
 */
export default function Card({
  header,
  body,
  footer,
  color,
  backgroundColor,
}: CardProps): ReactElement {
  const borderLeftColor = color ? `4px solid ${color}` : undefined;

  return (
    <div
      className="flex max-w-[500px] flex-col overflow-hidden rounded-md border border-[#2b2d31] shadow-sm"
      style={{
        borderLeft: borderLeftColor,
        backgroundColor,
      }}
    >
      {/* Header */}
      {header && (
        <div className="flex items-center gap-2 p-3">
          {header.thumbnailUrl && (
            <img
              src={header.thumbnailUrl}
              alt="thumbnail"
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          {header.title && (
            <h4 className="text-sm font-semibold text-white">
              {header.link ? (
                <a
                  href={header.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {header.title}
                </a>
              ) : (
                header.title
              )}
            </h4>
          )}
        </div>
      )}

      {/* Body */}
      {body && (
        <div className="flex flex-col gap-2 px-3 pb-3 text-sm text-[#dbdee1]">
          {body.description && (
            <p className="whitespace-pre-line">{body.description}</p>
          )}

          {body.content?.imageUrl && (
            <img
              src={body.content.imageUrl}
              alt={body.content.imageAltText || 'content image'}
              className="mt-1 max-h-64 rounded-md object-cover"
            />
          )}

          {/* Gallery Component */}
          {/* {body.content?.imageGallery && <Gallery {...body.content.imageGallery} />} */}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="flex items-center gap-2 border-t border-[#2b2d31] px-3 py-2 text-xs text-[#b5bac1]">
          {footer.iconUrl && (
            <img
              src={footer.iconUrl}
              alt="footer icon"
              className="h-4 w-4 rounded-full"
            />
          )}
          {footer.link ? (
            <a
              href={footer.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {footer.text}
            </a>
          ) : (
            <span>{footer.text}</span>
          )}
        </div>
      )}
    </div>
  );
}
