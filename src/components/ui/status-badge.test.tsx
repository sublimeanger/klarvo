import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<StatusBadge variant="default">Test Badge</StatusBadge>);
    
    expect(getByText("Test Badge")).toBeInTheDocument();
  });

  it("renders with default variant", () => {
    const { getByText } = render(<StatusBadge>Default</StatusBadge>);
    
    expect(getByText("Default")).toBeInTheDocument();
  });

  it("renders different risk level variants", () => {
    const variants = ["high", "limited", "minimal", "prohibited"] as const;
    
    variants.forEach((variant) => {
      const { getByText, unmount } = render(
        <StatusBadge variant={variant}>{variant}</StatusBadge>
      );
      expect(getByText(variant)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders status variants", () => {
    const statusVariants = ["approved", "draft", "pending", "rejected"] as const;
    
    statusVariants.forEach((variant) => {
      const { getByText, unmount } = render(
        <StatusBadge variant={variant}>{variant}</StatusBadge>
      );
      expect(getByText(variant)).toBeInTheDocument();
      unmount();
    });
  });

  it("applies custom className", () => {
    const { getByText } = render(
      <StatusBadge variant="high" className="custom-class">
        High Risk
      </StatusBadge>
    );
    
    expect(getByText("High Risk")).toHaveClass("custom-class");
  });

  it("renders numerical content", () => {
    const { getByText } = render(<StatusBadge variant="warning">{42}</StatusBadge>);
    
    expect(getByText("42")).toBeInTheDocument();
  });
});
