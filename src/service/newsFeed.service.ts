import { Article } from "@/model/article.type";

const currencyNews: Map<string, string[]> = new Map([
    ["EUR", [
      "ECB Announces Rate Hike Amid Inflation Concerns",
      "Eurozone Economic Growth Slows in Q3"
    ]],
    ["CHF", [
      "Swiss National Bank Intervenes to Stabilize Franc",
      "Switzerland Reports Trade Surplus Amid Global Uncertainty"
    ]],
    ["USD", [
      "US Federal Reserve Signals Further Interest Rate Increases",
      "Strong US Jobs Report Boosts Dollar Confidence"
    ]],
    ["GBP", [
      "Bank of England Warns of Possible Recession in 2024",
      "UK Inflation Hits 20-Year High, Pressuring Pound"
    ]],
    ["CNY", [
      "China's Manufacturing Sector Contracts for Third Consecutive Month",
      "Government Implements New Measures to Boost Domestic Consumption"
    ]],
    ["AUD", [
      "Australia Posts Record Trade Surplus as Commodity Prices Soar",
      "RBA Holds Rates Steady, Cites Global Economic Risks"
    ]],
    ["JPY", [
      "Bank of Japan Maintains Negative Interest Rates Despite Inflation",
      "Japan's Export Numbers Decline Amid Global Slowdown"
    ]],
    ["PLN", [
      "Poland's Central Bank Cuts Rates to Stimulate Economic Growth",
      "Polish GDP Growth Surpasses EU Average in Q2"
    ]],
  ]);

  const articles: Article[] = [
    {
      id: 1,
      image: "/news/news_1.jpg",
      relatedCurrency: "EUR",
      title: "ECB Announces Rate Hike Amid Inflation Concerns",
      content: "The European Central Bank (ECB) has raised interest rates by 25 basis points, signaling its determination to combat inflation. ECB President Christine Lagarde emphasized that the move is necessary to stabilize prices, although it may slow economic growth in the Eurozone. The decision comes amid rising concerns over consumer price increases, with inflation rates exceeding the ECB’s 2% target."
    },
    {
      id: 2,
      relatedCurrency: "EUR",
        image: "/news/news_2.jpg",
      title: "Eurozone Economic Growth Slows in Q3",
      content: "Eurozone economic growth slowed to 0.3% in the third quarter of 2024, marking a deceleration compared to the previous quarter. Analysts attribute the slowdown to weak consumer spending and ongoing geopolitical tensions. The slowdown in the German and French economies, the Eurozone’s largest, has also contributed to the softer growth figures."
    },
    {
      id: 31,
      relatedCurrency: "EUR",
        image: "/news/news_3.jpg",
      title: "Eurozone Economic Growth Slows in Q3",
      content: "Eurozone economic growth slowed to 0.3% in the third quarter of 2024, marking a deceleration compared to the previous quarter. Analysts attribute the slowdown to weak consumer spending and ongoing geopolitical tensions. The slowdown in the German and French economies, the Eurozone’s largest, has also contributed to the softer growth figures."
    },
    {
      id: 3,
      relatedCurrency: "CHF",
        image: "/news/news_1.jpg",
      title: "Swiss National Bank Intervenes to Stabilize Franc",
      content: "In an unexpected move, the Swiss National Bank (SNB) has intervened in the foreign exchange market to prevent excessive strengthening of the Swiss Franc (CHF). The SNB has been concerned that a strong franc could hurt the country's exports and lead to deflationary pressures. The bank confirmed the intervention but did not specify the amount of foreign currency purchased."
    },
    {
      id: 4,
      relatedCurrency: "CHF",
        image: "/news/news_2.jpg",
      title: "Switzerland Reports Trade Surplus Amid Global Uncertainty",
      content: "Despite global economic uncertainty, Switzerland has reported a trade surplus of CHF 10 billion in the last quarter, driven by strong demand for pharmaceuticals and machinery. Switzerland's open economy has so far managed to navigate the global slowdown, but officials warn that risks remain due to weakening demand from key trading partners in Europe and Asia."
    },
    {
      id: 5,
      relatedCurrency: "USD",
        image: "/news/news_3.jpg",
      title: "US Federal Reserve Signals Further Interest Rate Increases",
      content: "The US Federal Reserve has indicated that more interest rate hikes may be on the horizon as it continues to fight high inflation. Chair Jerome Powell mentioned that while inflation has moderated, it remains above the Fed's target. The central bank remains committed to bringing inflation down to 2%, even if it requires slowing the broader economy."
    },
    {
      id: 6,
      relatedCurrency: "USD",
        image: "/news/news_1.jpg",
      title: "Strong US Jobs Report Boosts Dollar Confidence",
      content: "The US dollar has surged in response to a strong jobs report, which showed that the US economy added 300,000 jobs last month, far exceeding expectations. The unemployment rate remains low at 3.7%, boosting investor confidence in the strength of the US economy. Analysts believe the report will give the Federal Reserve more leeway to continue its policy of gradual interest rate hikes."
    },
    {
      id: 7,
      relatedCurrency: "GBP",
        image: "/news/news_2.jpg",
      title: "Bank of England Warns of Possible Recession in 2024",
      content: "The Bank of England has issued a stark warning that the UK could face a recession in 2024 due to a combination of high inflation, rising interest rates, and declining consumer confidence. Governor Andrew Bailey highlighted that although inflation is expected to decline, the cost-of-living crisis and weakening business investment may push the economy into negative growth next year."
    },
    {
      id: 8,
      relatedCurrency: "GBP",
        image: "/news/news_3.jpg",
      title: "UK Inflation Hits 20-Year High, Pressuring Pound",
      content: "Inflation in the UK has reached a 20-year high, putting further pressure on the British Pound. Consumer prices rose by 7.8% in September, driven by higher energy costs and food prices. The Bank of England is expected to continue raising interest rates to tackle inflation, but this could further slow economic growth and lead to more challenges for the pound."
    },
    {
      id: 9,
      relatedCurrency: "CNY",
        image: "/news/news_1.jpg",
      title: "China's Manufacturing Sector Contracts for Third Consecutive Month",
      content: "China's manufacturing sector has contracted for the third straight month, raising concerns about the strength of the world’s second-largest economy. The Purchasing Managers' Index (PMI) fell to 49.2 in September, signaling a decline in factory output. This comes as global demand weakens and domestic consumption remains sluggish, despite government efforts to boost the economy."
    },
    {
      id: 10,
      relatedCurrency: "CNY",
        image: "/news/news_2.jpg",
      title: "Government Implements New Measures to Boost Domestic Consumption",
      content: "In response to the slowing economy, the Chinese government has announced a series of measures aimed at stimulating domestic consumption. These include tax cuts, subsidies for key industries, and incentives for consumers to spend more. The government hopes these policies will help offset the decline in global demand for Chinese goods and reinvigorate growth in the domestic market."
    },
    {
      id: 11,
      relatedCurrency: "AUD",
        image: "/news/news_3.jpg",
      title: "Australia Posts Record Trade Surplus as Commodity Prices Soar",
      content: "Australia has posted a record trade surplus of AUD 15 billion, driven by surging commodity prices, particularly iron ore and coal. The country’s resource sector continues to benefit from strong demand from China and India, even as global economic uncertainty grows. Economists warn, however, that Australia remains vulnerable to any slowdown in its key trading partners."
    },
    {
      id: 12,
      relatedCurrency: "AUD",
        image: "/news/news_1.jpg",
      title: "RBA Holds Rates Steady, Cites Global Economic Risks",
      content: "The Reserve Bank of Australia (RBA) has opted to keep interest rates unchanged at 4.1%, citing concerns over global economic risks, particularly in China. Governor Philip Lowe stated that while inflation has moderated, it remains elevated, and the RBA will remain vigilant in ensuring price stability. The bank is expected to resume rate hikes if inflation remains stubbornly high."
    },
    {
      id: 13,
      relatedCurrency: "JPY",
        image: "/news/news_2.jpg",
      title: "Bank of Japan Maintains Negative Interest Rates Despite Inflation",
      content: "The Bank of Japan (BoJ) has decided to maintain its negative interest rate policy, even as inflation picks up in the country. Governor Kazuo Ueda stated that the BoJ would continue to support economic recovery through ultra-loose monetary policy, although other major central banks have been tightening. Critics argue that this could weaken the yen further and lead to capital outflows."
    },
    {
      id: 14,
      relatedCurrency: "JPY",
        image: "/news/news_3.jpg",
      title: "Japan's Export Numbers Decline Amid Global Slowdown",
      content: "Japan’s exports fell by 5% in the last quarter, marking the sharpest decline in two years. The slowdown is attributed to weaker demand from major trading partners, including China and the US. The decline in exports raises concerns about the outlook for Japan’s economy, which has been relying heavily on external demand to fuel growth in recent years."
    },
    {
      id: 15,
      relatedCurrency: "PLN",
        image: "/news/news_1.jpg",
      title: "Poland's Central Bank Cuts Rates to Stimulate Economic Growth",
      content: "The National Bank of Poland has cut interest rates by 50 basis points in a bid to stimulate the economy, which has been slowing amid global uncertainty. Governor Adam Glapiński noted that the move was necessary to boost consumer spending and business investment. Poland has been facing a drop in industrial output and weakening consumer demand, prompting the bank to act."
    },
    {
      id: 16,
      relatedCurrency: "PLN",
        image: "/news/news_2.jpg",
      title: "Polish GDP Growth Surpasses EU Average in Q2",
      content: "Poland's economy grew by 2.8% in the second quarter of 2024, surpassing the EU average of 1.5%. The strong growth was driven by robust domestic consumption and increased government spending on infrastructure projects. Despite challenges posed by rising inflation, Poland continues to outperform many of its European neighbors in terms of economic resilience."
    }
  ];

  export const getCurrencyNews = (currency: string): Article[]  => {
    const news = articles.filter(element => element.relatedCurrency === currency);
    if(news) {
        return news;
    } else {
        return [];
    }
  }
