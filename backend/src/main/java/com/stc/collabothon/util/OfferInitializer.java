package com.stc.collabothon.util;

import com.stc.collabothon.model.offer.*;
import com.stc.collabothon.model.offer.criteria.AgeCriteria;
import com.stc.collabothon.model.offer.criteria.CompanySizeCriteria;
import com.stc.collabothon.model.offer.criteria.EligibilityCriteria;
import com.stc.collabothon.repo.OfferRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class OfferInitializer implements CommandLineRunner {

    @Autowired
    private OfferRepository offerRepository;

    @Override
    public void run(String... args) throws Exception {

        LoanOffer loanOffer1 = new LoanOffer("Home Loan", "Low-interest home loan",
                "The Home Loan is crafted for middle-aged individuals in the middle-income category, offering a highly competitive interest rate of 3.5%. It allows borrowers to finance up to 250,000, spread over a long-term period of 240 months (20 years), making homeownership achievable without overstretching budgets. This loan is ideal for those looking to settle into a permanent home or upgrade their current residence. The loan provides flexibility in repayment, with terms that are manageable for those in their prime earning years, making it an excellent option for family-oriented individuals.",
                EligibilityCriteria.MIDDLE_INCOME, 3.5, 250000, 240);
        loanOffer1.setAgeCriteria(AgeCriteria.MIDDLE_AGED);

        LoanOffer loanOffer2 = new LoanOffer("Business Car Loan", "Affordable car loan",
                "The Business Car Loan is tailored for medium-sized businesses, especially those in the low-income bracket, needing affordable vehicle financing. With an interest rate of 4.0%, this loan provides up to 20,000 for the purchase of vehicles essential for business operations, such as delivery vans or company cars. The repayment term of 60 months offers flexibility, allowing businesses to manage vehicle costs without putting strain on their cash flow. This loan is perfect for companies looking to grow their fleet while keeping monthly payments reasonable.",
                EligibilityCriteria.LOW_INCOME, 4.0, 20000, 60);
        loanOffer2.setCompanySizeCriteria(CompanySizeCriteria.MEDIUM);

        LoanOffer loanOffer3 = new LoanOffer("Business Loan", "Loan for small businesses",
                "This Business Loan is ideal for upper-middle-income entrepreneurs operating small businesses. Offering up to 100,000 at a competitive interest rate of 5.5%, this loan helps cover operational costs, expansion, or new ventures. The 120-month repayment period provides businesses the flexibility to grow at a steady pace without being weighed down by high monthly payments. Small business owners can use this loan to fuel growth, acquire new equipment, or expand into new markets, making it an essential tool for companies in the early stages of expansion.",
                EligibilityCriteria.UPPER_MIDDLE_INCOME, 5.5, 100000, 120);
        loanOffer3.setCompanySizeCriteria(CompanySizeCriteria.SMALL);

        LoanOffer loanOffer4 = new LoanOffer("Student Loan", "Loan for higher education",
                "The Student Loan offers low-income students the financial support needed to pursue higher education without overwhelming debt. With an extremely low interest rate of 2.0%, students can borrow up to 15,000 for tuition, books, and living expenses. The 84-month repayment term allows graduates to repay the loan comfortably after completing their studies. This loan is designed to remove financial barriers to education, helping young people invest in their future and obtain the qualifications they need for a successful career.",
                EligibilityCriteria.LOW_INCOME, 2.0, 15000, 84);
        loanOffer4.setAgeCriteria(AgeCriteria.STUDENT);

        LoanOffer loanOffer5 = new LoanOffer("Personal Loan", "Unsecured personal loan",
                "The Personal Loan is an unsecured financial solution designed for low-income individuals who need quick access to funds. With an interest rate of 7.5%, borrowers can secure up to 10,000, with a 36-month repayment period. This loan is perfect for unexpected expenses such as medical bills, home repairs, or personal projects. Since no collateral is required, the approval process is quick and straightforward, making it ideal for individuals facing short-term financial difficulties.",
                EligibilityCriteria.LOW_INCOME, 7.5, 10000, 36);

        LoanOffer loanOffer6 = new LoanOffer("Vacation Loan", "Loan for holiday expenses",
                "The Vacation Loan is designed for middle-income earners who want to enjoy a well-deserved holiday without tapping into their savings. Offering a 4.5% interest rate, borrowers can take out up to 5,000 for travel, accommodation, and leisure activities. The repayment term is 24 months, ensuring that the financial burden of a vacation doesn't extend long after the holiday is over. This loan is a perfect option for those planning family vacations, romantic getaways, or even solo adventures, with easy repayments spread out over a manageable period.",
                EligibilityCriteria.MIDDLE_INCOME, 4.5, 5000, 24);
        loanOffer6.setAgeCriteria(AgeCriteria.MIDDLE_AGED);

        LoanOffer loanOffer7 = new LoanOffer("Home Renovation Loan", "Loan for home improvement projects",
                "The Home Renovation Loan helps middle-aged, middle-income homeowners improve their living spaces without financial stress. With an interest rate of 4.5%, this loan allows up to 50,000 for various home renovation projects, including energy-efficient upgrades or structural improvements. Spread over 180 months, the loan offers a long repayment period to make monthly payments affordable. It’s ideal for homeowners looking to increase their property’s value or enhance their living conditions without needing a significant upfront investment.",
                EligibilityCriteria.MIDDLE_INCOME, 4.5, 50000, 180);
        loanOffer7.setAgeCriteria(AgeCriteria.MIDDLE_AGED);

        LoanOffer loanOffer8 = new LoanOffer("Startup Business Loan", "Loan to help launch new businesses",
                "This Startup Business Loan is crafted for high-income entrepreneurs who are eager to start a new venture. Offering a loan amount of up to 200,000 with a 6.0% interest rate, this loan helps cover startup costs such as initial inventory, business licenses, or marketing campaigns. The repayment period of 120 months gives new businesses ample time to establish themselves before large repayments become due. This loan specifically targets small businesses, providing the financial support needed to turn innovative ideas into reality.",
                EligibilityCriteria.HIGH_INCOME, 6.0, 200000, 120);
        loanOffer8.setCompanySizeCriteria(CompanySizeCriteria.SMALL);

        LoanOffer loanOffer9 = new LoanOffer("Luxury Car Loan", "Loan for luxury car purchases",
                "The Luxury Car Loan caters to ultra-high-net-worth individuals who wish to purchase high-end or exotic vehicles. With an interest rate of 3.0%, borrowers can finance up to 150,000 for luxury car purchases, with repayment spread over 60 months. This loan is ideal for middle-aged individuals looking to invest in a prestigious vehicle without liquidating other assets. It offers flexible terms, allowing for manageable monthly payments while still enjoying the benefits of driving a luxury car.",
                EligibilityCriteria.ULTRA_HIGH_NET_WORTH, 3.0, 150000, 60);
        loanOffer9.setAgeCriteria(AgeCriteria.MIDDLE_AGED);

        LoanOffer loanOffer10 = new LoanOffer("Corporate Business Loan", "Loan to help big business thrive",
                "The Corporate Business Loan is tailored for high-income, large enterprises looking for significant financial backing. Offering a loan of up to 200,000 at a 6.0% interest rate, this product is perfect for established businesses looking to expand their operations, invest in new markets, or upgrade their infrastructure. With a 120-month repayment period, the loan provides flexibility for large-scale investments, ensuring that businesses can grow without putting immediate pressure on their cash flow. This loan specifically targets big companies with a need for high capital to achieve their long-term goals.",
                EligibilityCriteria.HIGH_INCOME, 6.0, 200000, 120);
        loanOffer10.setCompanySizeCriteria(CompanySizeCriteria.BIG);

        offerRepository.save(loanOffer1);
        offerRepository.save(loanOffer2);
        offerRepository.save(loanOffer3);
        offerRepository.save(loanOffer4);
        offerRepository.save(loanOffer5);
        offerRepository.save(loanOffer6);
        offerRepository.save(loanOffer7);
        offerRepository.save(loanOffer8);
        offerRepository.save(loanOffer9);
        offerRepository.save(loanOffer10);

        SavingsOffer savingOffer1 = new SavingsOffer("Basic Savings", "High interest rate savings account",
                "The Basic Savings account is designed for individuals in the middle-income bracket looking to grow their savings with minimal risk. " +
                        "Offering a competitive interest rate of 1.5%, this account provides a stable and secure way to accumulate savings over time. " +
                        "Customers are required to maintain a minimum balance of 500.00 pln to benefit from the interest. This product is particularly attractive to " +
                        "people who seek a straightforward, no-frills savings solution with the convenience of easy access to funds when needed. " +
                        "With no complicated features, it serves as a foundation for those wanting to build a reliable financial cushion.",
                EligibilityCriteria.MIDDLE_INCOME, 1.5, 500);

        SavingsOffer savingOffer2 = new SavingsOffer("Premium Savings for corporations", "Savings account with premium benefits",
                "Premium Savings is tailored for high-income individuals looking for enhanced benefits and a higher return on their savings. " +
                        "With an interest rate of 2.0%, it is among the best offerings for wealthier clients who can maintain a minimum balance of 5000.00 pln. " +
                        "The account comes with additional perks, such as personalized financial advice and preferential customer service, to cater to affluent customers. " +
                        "It is ideal for those who want their savings to work harder for them, combining flexibility with premium-level rewards. " +
                        "This account is particularly suited for professionals and executives seeking both security and exclusivity in their banking experience.",
                EligibilityCriteria.HIGH_INCOME, 2.0, 5000);
        savingOffer2.setCompanySizeCriteria(CompanySizeCriteria.BIG);

        SavingsOffer savingOffer3 = new SavingsOffer("Youth Savings", "Special savings account for young people",
                "Youth Savings is a savings account crafted specifically for students and young adults at the start of their financial journey. " +
                        "With an interest rate of 1.0% and a low minimum balance requirement of 100.00 pln, it encourages the habit of saving from an early age. " +
                        "The account is designed with flexibility in mind, allowing young customers to easily access their funds while also benefiting from the interest. " +
                        "This product is perfect for young individuals in the low-income bracket who are looking to develop strong financial habits. " +
                        "It offers a simple yet effective tool for saving towards educational expenses, travel plans, or even a first car.",
                EligibilityCriteria.LOW_INCOME, 1.0, 100);
        savingOffer3.setAgeCriteria(AgeCriteria.YOUNG);

        SavingsOffer savingOffer4 = new SavingsOffer("Family Savings", "Savings account for families",
                "The Family Savings account is designed for upper-middle-income families who want to jointly save for future needs and goals. " +
                        "With an attractive interest rate of 1.8% and a moderate minimum balance of 2000.00 pln, this account is ideal for families planning for " +
                        "future expenses such as vacations, education, or emergencies. It allows multiple family members to contribute, providing a collaborative savings solution. " +
                        "The account offers flexible withdrawal options while incentivizing families to save regularly. It is an excellent tool for managing and growing family wealth " +
                        "in a structured, reliable manner, ensuring financial stability over the long term.",
                EligibilityCriteria.UPPER_MIDDLE_INCOME, 1.8, 2000);
        savingOffer4.setAgeCriteria(AgeCriteria.MIDDLE_AGED);

        SavingsOffer savingOffer5 = new SavingsOffer("Senior Savings", "Savings for retirees",
                "Senior Savings is specifically crafted for retirees who want to maximize the returns on their savings while minimizing financial risks. " +
                        "Offering a generous interest rate of 2.5%, this account is geared towards middle-income retirees who are no longer earning an active income but want to ensure " +
                        "their savings continue to grow. The minimum balance requirement is 1000.00 pln, making it accessible while still encouraging steady saving. " +
                        "It provides flexible access to funds, enabling retirees to meet their living expenses without compromising on the growth of their savings. " +
                        "This account is perfect for retirees looking for both security and competitive interest rates to preserve and grow their nest egg.",
                EligibilityCriteria.HIGH_INCOME, 2.5, 1000);
        savingOffer5.setAgeCriteria(AgeCriteria.OLD);

        SavingsOffer savingOffer6 = new SavingsOffer("Vacation Savings", "Save for holidays",
                "Vacation Savings is designed for individuals who wish to save specifically for travel and holiday expenses. " +
                        "With an interest rate of 1.2% and a minimum balance of 300.00 pln, this account helps middle-income earners set aside money for their dream vacations. " +
                        "It offers the flexibility of making regular deposits over time, building up a travel fund without financial strain. " +
                        "The account encourages disciplined saving, making it easier to plan trips without resorting to last-minute loans or credit cards. " +
                        "Whether it's for a weekend getaway or an international holiday, this account is ideal for travel enthusiasts looking for a reliable savings plan.",
                EligibilityCriteria.MIDDLE_INCOME, 1.2, 300);
        ;

        SavingsOffer savingOffer7 = new SavingsOffer("Children's Savings Account", "Savings account for children's future",
                "Children's Savings Account is a specialized product designed to help parents save for their children's future needs, such as education or other life goals. " +
                        "With an interest rate of 1.2% and a very low minimum balance of 100.00 pln, it is ideal for families with middle-income earnings. " +
                        "The account is tailored to be easily managed by parents while allowing the child to gradually learn about savings and financial responsibility. " +
                        "This product supports long-term financial planning for children, offering the security of steady growth while maintaining full control for parents. " +
                        "It is particularly suitable for young families focused on ensuring financial preparedness for their children’s future.",
                EligibilityCriteria.MIDDLE_INCOME, 1.2, 100);
        savingOffer7.setAgeCriteria(AgeCriteria.YOUNG);

        SavingsOffer savingOffer8 = new SavingsOffer("Retirement Savings", "Special account for retirement planning",
                "Retirement Savings is tailored for high-income individuals who are focused on securing their financial future post-retirement. " +
                        "With an excellent interest rate of 2.5%, this account requires a higher minimum balance of 20000.00 pln, reflecting its target audience of wealthy professionals " +
                        "or business owners nearing retirement age. The account is specifically designed for long-term growth and stability, providing consistent returns over time. " +
                        "It also offers tax advantages, making it an attractive option for those planning for retirement. " +
                        "This product is ideal for pensioners who prioritize financial security and wish to maintain their lifestyle through a well-structured savings plan.",
                EligibilityCriteria.HIGH_INCOME, 2.5, 20000);
        savingOffer8.setAgeCriteria(AgeCriteria.PENSIONER);

        SavingsOffer savingOffer9 = new SavingsOffer("Corporate Savings Plan", "Savings plan for big businesses",
                "Corporate Savings Plan is designed for medium-sized businesses looking for a stable way to manage surplus cash flow. " +
                        "With an interest rate of 1.8% and a minimum balance of 5000.00 pln, this plan helps businesses grow their reserves while maintaining liquidity. " +
                        "It is specifically tailored for businesses in the upper-middle-income bracket, offering competitive returns with flexibility in accessing funds. " +
                        "The account provides additional features like bulk payment management and priority customer support for corporate clients. " +
                        "This product is ideal for business owners who want a safe and reliable way to manage their company's savings while earning moderate returns.",
                EligibilityCriteria.UPPER_MIDDLE_INCOME, 1.8, 5000);
        savingOffer9.setCompanySizeCriteria(CompanySizeCriteria.MEDIUM);

        SavingsOffer savingOffer10 = new SavingsOffer("Big Corporation Savings Plan", "Savings plan for big businesses",
                "The Big Corporation Savings Plan is designed specifically for upper middle-income corporations seeking to optimize their financial management while enjoying competitive interest rates. This savings account offers an interest rate of 1.8%, allowing businesses to grow their cash reserves efficiently over time. With a minimum deposit requirement of $5,000, this plan is perfect for established companies looking to maintain liquidity while earning interest on their funds. The flexibility of this savings plan allows corporations to access their funds whenever necessary, making it an ideal choice for businesses that need to manage cash flow without sacrificing earning potential. Additionally, this savings plan provides businesses with the security and stability they need in an ever-changing economic environment, ensuring that their financial future is safeguarded.",
                EligibilityCriteria.UPPER_MIDDLE_INCOME, 2.8, 5000);
        savingOffer10.setCompanySizeCriteria(CompanySizeCriteria.BIG);



        SavingsOffer savingOffer11 = new SavingsOffer("Startup Savings Plan", "Savings plan for small businesses",
                "The Startup Savings Plan is tailored for small businesses and startups looking to build their financial foundation while taking advantage of a competitive interest rate of 1.8%. Designed with the unique challenges of startups in mind, this plan requires a minimum deposit of just $5,000, making it accessible for new businesses. With this savings account, entrepreneurs can effectively manage their cash flow and set aside funds for future investments or operational expenses. The account provides the flexibility needed for startups to withdraw funds when necessary while still allowing them to earn interest on their savings. This plan not only promotes financial discipline but also aids in long-term planning, empowering startups to achieve their goals while ensuring their financial resources are working for them.",
                EligibilityCriteria.UPPER_MIDDLE_INCOME, 1.8, 5000);
        savingOffer11.setCompanySizeCriteria(CompanySizeCriteria.SMALL);


        SavingsOffer savingOffer12 = new SavingsOffer("Pension Plus Account", "A reliable savings account for retirees.",
                "The Pension Plus Account offers a steady 1.8% interest rate and is tailored for retirees looking for a secure way to grow their savings with minimal risk. " +
                        "With a low minimum balance of 5000.00 PLN, this account ensures accessibility while offering consistent returns. It's perfect for pensioners who want " +
                        "a dependable savings vehicle to support their day-to-day financial needs during retirement without the pressure of high-income requirements.",
                EligibilityCriteria.LOW_INCOME, 1.8, 5000);
        savingOffer12.setAgeCriteria(AgeCriteria.PENSIONER);

        offerRepository.save(savingOffer1);
        offerRepository.save(savingOffer2);
        offerRepository.save(savingOffer3);
        offerRepository.save(savingOffer4);
        offerRepository.save(savingOffer5);
        offerRepository.save(savingOffer6);
        offerRepository.save(savingOffer7);
        offerRepository.save(savingOffer8);
        offerRepository.save(savingOffer9);
        offerRepository.save(savingOffer10);
        offerRepository.save(savingOffer11);
        offerRepository.save(savingOffer12);

        InvestmentOffer investmentOffer1 = new InvestmentOffer("Tech Stocks Fund", "Invest in top tech companies",
                "The Tech Stocks Fund is a high-risk, high-reward investment vehicle designed for high-income individuals who are keen on capitalizing " +
                        "on the fast-paced growth of the technology sector. This equity fund focuses on blue-chip and emerging tech companies that are leading innovation, " +
                        "offering an average annual return of 8.0%. With a minimum investment of 10,000.00 pln and a management fee of 1.5%, this fund is ideal for tech-savvy investors " +
                        "who are willing to accept market volatility for the potential of high returns. It provides exposure to industry giants such as Apple, Google, and Amazon, " +
                        "making it an attractive option for those seeking growth opportunities in cutting-edge technology.",
                EligibilityCriteria.HIGH_INCOME, 8.0, InvestmentType.EQUITY, 10000, 1.5, 7, "Tech Fund");


        InvestmentOffer investmentOffer2 = new InvestmentOffer("Retirement Trust Fund", "Safe retirement investment",
                "The Retirement Trust Fund is a low-risk investment solution tailored for ultra-high-net-worth individuals who are focused on long-term financial stability. " +
                        "This trust fund offers a moderate return of 5.0%, with a minimum investment of 50,000.00 pln, catering to investors who prioritize security over aggressive growth. " +
                        "It is designed to provide a steady income stream during retirement, with a low management fee of 0.8%. This product is particularly suited for individuals looking " +
                        "to preserve their wealth, ensuring their retirement years are financially secure without the need for hands-on management. It includes diversified assets " +
                        "such as government bonds and low-risk equity, making it a reliable choice for retirement planning.",
                EligibilityCriteria.ULTRA_HIGH_NET_WORTH, 5.0, InvestmentType.TRUST_FUND, 50000, 0.8, 4, "Retirement Fund");
        investmentOffer2.setAgeCriteria(AgeCriteria.PENSIONER);

        InvestmentOffer investmentOffer3 = new InvestmentOffer("Green Energy Fund", "Investment in renewable energy",
                "The Green Energy Fund focuses on the rapidly growing renewable energy sector, offering sustainable investment opportunities for upper-middle-income investors. " +
                        "With an annual return of 6.5% and a minimum investment of 15,000.00 pln, this equity fund is aimed at individuals who want to support the transition to cleaner energy sources. " +
                        "The fund includes investments in solar, wind, and other renewable energy companies, offering both growth potential and environmental impact. " +
                        "With a management fee of 1.2%, it is ideal for socially conscious investors looking for a balanced risk-reward profile. " +
                        "This investment aligns well with individuals who prioritize sustainability alongside financial returns.",
                EligibilityCriteria.UPPER_MIDDLE_INCOME, 6.5, InvestmentType.EQUITY, 15000, 1.2, 6, "Green Energy Fund");
        investmentOffer3.setAgeCriteria(AgeCriteria.OLD);

        InvestmentOffer investmentOffer4 = new InvestmentOffer("Healthcare Fund for Startups", "Invest in healthcare sector",
                "The Healthcare Fund provides exposure to one of the most resilient and essential sectors—healthcare. " +
                        "Targeted at high-income investors, this equity fund offers a 7.0% return, with a minimum investment of 20,000.00 pln, focusing on both established and innovative healthcare companies. " +
                        "With a 1.3% management fee, it is a moderate-risk investment that capitalizes on the aging global population and increased demand for medical products and services. " +
                        "The fund includes stocks from pharmaceutical giants and biotech innovators, providing a diversified portfolio within the healthcare space. " +
                        "It is ideal for investors who seek both long-term growth and the social impact of improving global health.",
                EligibilityCriteria.HIGH_INCOME, 7.0, InvestmentType.EQUITY, 20000, 1.3, 5, "Healthcare Fund");
        investmentOffer4.setCompanySizeCriteria(CompanySizeCriteria.SMALL);

        InvestmentOffer investmentOffer5 = new InvestmentOffer("Real Estate Fund", "Investment in real estate properties",
                "The Real Estate Fund offers upper-middle-income investors the opportunity to invest in a diversified portfolio of real estate properties. " +
                        "With an annual return of 4.5% and a minimum investment of 30,000.00 pln, this fund focuses on commercial and residential properties in prime locations. " +
                        "With a management fee of 1.0%, it balances moderate returns with the security of real estate as a physical asset. This fund is particularly attractive to investors " +
                        "seeking lower volatility compared to equity markets while still achieving growth. The Real Estate Fund is ideal for those who prefer tangible assets and the stability " +
                        "of the property market.",
                EligibilityCriteria.UPPER_MIDDLE_INCOME, 4.5, InvestmentType.REAL_ESTATE, 30000, 1.0, 10, "Real Estate Trust");
        investmentOffer5.setCompanySizeCriteria(CompanySizeCriteria.MEDIUM);

        InvestmentOffer investmentOffer6 = new InvestmentOffer("Bond Portfolio", "Safe government bond investments",
                "The Bond Portfolio is a low-risk investment designed for high-income individuals seeking safety and stability. " +
                        "This portfolio includes a mix of government and corporate bonds, offering an annual return of 3.5% with a minimum investment of 10,000.00 pln. " +
                        "With a management fee of just 0.7%, this portfolio is ideal for conservative investors who prioritize capital preservation over high returns. " +
                        "It is designed to provide steady, predictable income with lower volatility compared to equity markets, making it suitable for those nearing retirement " +
                        "or seeking a low-risk diversification option. This product is particularly popular among pensioners or risk-averse individuals looking for safe, government-backed investments.",
                EligibilityCriteria.HIGH_INCOME, 3.5, InvestmentType.BOND, 10000, 0.7, 3, "Bond Portfolio");
        investmentOffer6.setAgeCriteria(AgeCriteria.PENSIONER);

        InvestmentOffer investmentOffer7 = new InvestmentOffer("Luxury Real Estate Fund", "Exclusive investment in luxury real estate properties",
                "The Luxury Real Estate Fund is an exclusive investment option targeting ultra-high-net-worth individuals who wish to invest in high-end luxury properties. " +
                        "With a minimum investment of 1,000,000.00 pln and a 5.5% return, this fund focuses on prime real estate locations, including luxury homes, resorts, and commercial properties. " +
                        "It has a management fee of 1.2%, reflecting the specialized services and premium nature of the investments. This fund is designed for those seeking both the prestige " +
                        "and potential of high-value property investments, offering a mix of income generation and long-term capital appreciation. It is ideal for individuals looking for " +
                        "exclusive, high-end investment opportunities with a strong return potential.",
                EligibilityCriteria.ULTRA_HIGH_NET_WORTH, 5.5, InvestmentType.REAL_ESTATE, 1000000, 1.2, 8, "Luxury Properties Fund");
        investmentOffer7.setCompanySizeCriteria(CompanySizeCriteria.BIG);

        InvestmentOffer investmentOffer8 = new InvestmentOffer("Private Equity Fund", "Invest in private equity for high-net-worth individuals",
                "The Private Equity Fund is designed for ultra-high-net-worth investors looking to engage in high-growth opportunities within private companies. " +
                        "This fund offers a substantial 10.0% return and requires a minimum investment of 500,000.00 pln. It focuses on privately held firms across a range of sectors, " +
                        "from technology startups to established businesses looking for growth capital. With a management fee of 2.0%, this fund provides access to exclusive, high-return investments " +
                        "that are not available to the general public. The Private Equity Fund is ideal for sophisticated investors seeking higher returns and diversification outside public markets.",
                EligibilityCriteria.ULTRA_HIGH_NET_WORTH, 10.0, InvestmentType.EQUITY, 500000, 2.0, 12, "Private Equity Fund");
        investmentOffer8.setCompanySizeCriteria(CompanySizeCriteria.BIG);

        InvestmentOffer investmentOffer9 = new InvestmentOffer("Global Index Fund", "Invest in a diversified global portfolio",
                "The Global Index Fund is an equity-based investment that provides exposure to a broad, diversified portfolio of companies across various sectors and regions globally. " +
                        "Targeted at high-income investors, this fund offers a 7.0% return and requires a minimum investment of 25,000.00 pln. With a 1.2% management fee, the fund focuses on minimizing risk " +
                        "through diversification while still offering competitive returns. It includes major global indices such as the S&P 500 and MSCI World Index, making it a solid option " +
                        "for investors looking for international diversification and steady growth.",
                EligibilityCriteria.HIGH_INCOME, 7.0, InvestmentType.EQUITY, 25000, 1.2, 5, "Global Fund");

        InvestmentOffer investmentOffer10 = new InvestmentOffer("Real Estate Fund", "Invest in prime real estate projects",
                "The Real Estate Fund is an exclusive investment opportunity targeting ultra-high-net-worth individuals with a focus on prime real estate projects. " +
                        "With a minimum investment of 100,000.00 pln and a 6.5% return, this fund provides access to high-value commercial and residential real estate in top global locations. " +
                        "The fund aims to generate both income and long-term capital appreciation, with a management fee of 2.0%. It is suitable for wealthy investors seeking " +
                        "long-term, secure real estate investments that offer a mix of income and growth potential.",
                EligibilityCriteria.ULTRA_HIGH_NET_WORTH, 6.5, InvestmentType.REAL_ESTATE, 100000, 2.0, 10, "Real Estate Trust");
        investmentOffer10.setCompanySizeCriteria(CompanySizeCriteria.BIG);

        InvestmentOffer investmentOffer11 = new InvestmentOffer("Startup Investment Fund", "Invest in early-stage tech startups",
                "The Startup Investment Fund is a high-risk, high-reward investment opportunity targeted at high-income individuals interested in early-stage technology startups. " +
                        "With an expected return of 10.0% and a minimum investment of 50,000.00 pln, this equity fund focuses on identifying and nurturing tech startups with high growth potential. " +
                        "It comes with a management fee of 2.5%, reflecting the intensive research and risk involved in such ventures. This fund is ideal for investors with a high risk tolerance " +
                        "looking for significant upside potential through venture capital-style investing.",
                EligibilityCriteria.HIGH_INCOME, 10.0, InvestmentType.EQUITY, 50000, 2.5, 3, "Startup Fund");
        investmentOffer11.setCompanySizeCriteria(CompanySizeCriteria.SMALL);

        InvestmentOffer investmentOffer12 = new InvestmentOffer("Pension Fund", "Safe investment for pensioners",
                "The Pension Fund is a low-risk investment designed for middle-income pensioners who seek stable returns to support their post-retirement income. " +
                        "With an annual return of 4.0% and a minimum investment of 30,000.00 pln, this trust fund offers a reliable source of income with minimal risk. " +
                        "It includes government-backed securities and low-risk assets, providing both security and steady growth. " +
                        "With a low management fee of 0.8%, this fund is ideal for retirees looking to preserve their capital while receiving consistent income during retirement.",
                EligibilityCriteria.MIDDLE_INCOME, 4.0, InvestmentType.TRUST_FUND, 30000, 0.8, 5, "Pension Fund");
        investmentOffer12.setAgeCriteria(AgeCriteria.PENSIONER);

        InvestmentOffer investmentOffer13 = new InvestmentOffer("Corporate Investment Fund", "Investment for tech corporations",
                "The Corporate Investment Fund is an exclusive opportunity for high-income individuals and large tech corporations looking to invest in the booming technology sector. This fund targets innovative startups and established companies poised for growth, particularly in areas such as artificial intelligence, blockchain, and renewable energy technologies. With a competitive return rate of 10.0%, investors can expect a robust yield over a commitment period of three years. The minimum investment of 50,000 allows for significant capital deployment, while the management fee of 2.5% ensures professional oversight and strategic direction for the fund's portfolio. This investment offers not only financial returns but also the chance to be part of transformative technologies that shape the future, appealing to those passionate about innovation and technological advancement. With a focus on large corporations, the fund is designed to leverage industry insights and connections to maximize investor benefits while fostering growth in the tech landscape.",
                EligibilityCriteria.HIGH_INCOME, 10.0, InvestmentType.EQUITY, 50000, 2.5, 3, "Startup Fund");
        investmentOffer13.setCompanySizeCriteria(CompanySizeCriteria.BIG);


        offerRepository.save(investmentOffer1);
        offerRepository.save(investmentOffer2);
        offerRepository.save(investmentOffer3);
        offerRepository.save(investmentOffer4);
        offerRepository.save(investmentOffer5);
        offerRepository.save(investmentOffer6);
        offerRepository.save(investmentOffer7);
        offerRepository.save(investmentOffer8);
        offerRepository.save(investmentOffer9);
        offerRepository.save(investmentOffer10);
        offerRepository.save(investmentOffer11);
        offerRepository.save(investmentOffer12);
        offerRepository.save(investmentOffer13);

    }
}
