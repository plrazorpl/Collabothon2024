export const alertConfigurationData = {
  configurations: [
    {
      title: "Loan Payment Due Soon",
      priority: "high",
      type: "financial",
      subtype: "loan",
      triggerCondition: "7 days before the due date",
      client: "Zalando",
      description:
        "Your loan payment for account #ACC-2024-001 is due by 31.10.2024. Please ensure funds are available for the scheduled payment.",
      url: "",
    },
    {
      title: "Approval Needed for High-Value Transaction",
      priority: "urgent",
      type: "approval",
      subtype: "payment",
      triggerCondition: "Detection of large transaction",
      client: "mBank",
      description:
        "A transaction of €500,000 requires your approval. Please review and approve within 24 hours.",
      url: "",
    },
    {
      title: "Currency Exchange Rate Threshold Reached",
      priority: "medium",
      type: "market alert",
      subtype: "stock change",
      triggerCondition: "Real-time threshold met",
      client: "None",
      description:
        "The EUR/USD exchange rate has dropped below your set threshold of 1.10. Please review your hedging strategy.",
      url: "",
    },
    {
      title: "Potential Fraudulent Activity Detected",
      priority: "urgent",
      type: "security",
      subtype: "--||--",
      triggerCondition: "Immediate fraud detection",
      client: "Zalando",
      description:
        "Suspicious activity has been identified on account #ACC-2024-XYZ. Please verify recent transactions.",
      url: "",
    },
    {
      title: "Upcoming Quarterly Financial Report Due",
      priority: "medium",
      type: "compliance",
      subtype: "--||--",
      triggerCondition: "14 days before deadline",
      client: "None",
      description:
        "Your Q3 financial report is due by 10.11.2024. Please submit the necessary documents via the client portal.",
      url: "",
    },
    {
      title: "Credit Line Utilization Alert",
      priority: "high",
      type: "financial",
      subtype: "payment",
      triggerCondition: "Credit line usage exceeds 80%",
      client: "Commerzbank",
      description:
        "You have utilized 85% of your credit line on account #ACC-2024-XYZ. Please review your available credit.",
      url: "",
    },
    // {
    //   title: "Payment Approval Deadline Approaching",
    //   priority: "urgent",
    //   type: "financial",
    //   subtype: "--||--",
    //   triggerCondition: "A few hours before approval deadline",
    //   client: "Santander",
    //   description:
    //     "A payment of €200,000 requires approval by 17:00 today to avoid delays. Please approve the transaction in the system.",
    //   url: "",
    // },
    // {
    //   title: "New Regulatory Requirements",
    //   priority: "medium",
    //   type: "regulatory",
    //   subtype: "--||--",
    //   triggerCondition: "Post regulatory updates",
    //   client: "None",
    //   description:
    //     "Recent regulatory changes may impact your investment strategy. Please review the latest compliance guidelines.",
    //   url: "",
    // },
  ],
};
