import { AssetStatComponent } from '@/components/asset/AssetStat';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('AssetStatComponent', () => {
  it('should render the title and stat value correctly', () => {
    const { container } = render(<AssetStatComponent title="Market Cap" statValue="$1.00T" />);

    // Check title
    const titleElement = container.querySelector('p.text-white.font-semibold.text-sm.md\\:text-lg');
    expect(titleElement).toBeTruthy(); // Ensure the title element exists
    expect(titleElement?.textContent).toBe('Market Cap'); // Verify the text content

    // Check stat value
    const statValueElement = container.querySelector(
      'p.text-white.text-sm.md\\:text-lg.text-center'
    );
    expect(statValueElement).toBeTruthy(); // Ensure the stat value element exists
    expect(statValueElement?.textContent).toBe('$1.00T'); // Verify the text content
  });

  it('should apply custom styles when provided', () => {
    const customStyle = 'custom-class';
    const { container } = render(
      <AssetStatComponent title="Volume (24h)" statValue="$500M" customStyle={customStyle} />
    );

    // Check if the custom class is applied
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toBeTruthy(); // Ensure the container exists
    expect(containerDiv.classList.contains(customStyle)).toBe(true); // Verify the custom class
  });

  it('should not apply custom styles when not provided', () => {
    const { container } = render(<AssetStatComponent title="Supply" statValue="21M" />);

    // Check if no custom class is applied
    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toBeTruthy(); // Ensure the container exists
    expect(containerDiv.classList.contains('custom-class')).toBe(false); // Verify no custom class
  });
});
