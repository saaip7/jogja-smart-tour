// src/components/itinerary/itineraryPrintStyles.ts

export const printStyles = `
  /* Print styling */
  @media print {
    @page {
      size: A4;
      margin: 1.5cm;
    }
    
    body {
      font-size: 12pt;
      background: white !important;
    }
    
    /* Hide elements not needed for printing */
    .no-print, 
    button, 
    nav, 
    header, 
    footer, 
    .Toastify__toast-container, 
    [data-sidebar="sidebar"],
    [data-sidebar="trigger"],
    [data-sidebar="rail"] {
      display: none !important;
    }
    
    /* Show elements that are only for printing */
    .print-only-header, 
    .print-only-footer {
      display: block !important;
    }
    
    /* Make grid into single column for print */
    .grid {
      display: block !important;
    }
    
    /* Ensure cards look good in print */
    .card {
      border: 1px solid #ddd !important;
      box-shadow: none !important;
      margin-bottom: 15mm !important;
      break-inside: avoid !important;
    }
    
    /* Ensure good page breaks */
    .page-break-inside-avoid {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    
    /* Better contrast for text */
    .text-muted-foreground {
      color: #444 !important;
    }
    
    /* Ensure heading appears properly in print */
    h1, h2, h3 {
      page-break-after: avoid !important;
    }
    
    /* Center the title in print */
    h1 {
      text-align: center !important;
      font-size: 24pt !important;
      margin-bottom: 20pt !important;
    }
    
    /* Set container to full width for print */
    .container {
      width: 100% !important;
      max-width: none !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    
    /* Fix layout during printing */
    .flex-1 {
      flex: none !important;
      width: 100% !important;
    }
    
    /* Ensure the main content takes the full page */
    .h-screen, .min-h-screen, .h-svh, .min-h-svh {
      height: auto !important;
      min-height: auto !important;
    }
    
    /* Hide all potential notification/toast elements */
    div[role="alert"],
    .toast,
    [data-radix-toast-root],
    [data-toastify] {
      display: none !important;
    }
    
    /* Fix any possible flex layout issues */
    .flex {
      display: block !important;
    }
    
    /* Make sure we target any potential toast container */
    [class*="toast"],
    [class*="notification"],
    [class*="alert"]:not(.alert) {
      display: none !important;
    }
  }
  
  /* Hide print-only elements in normal view */
  .print-only-header, 
  .print-only-footer {
    display: none;
  }
`;