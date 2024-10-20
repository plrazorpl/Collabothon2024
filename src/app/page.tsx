import ForexWidget from "@/components/ForexWidget";

export default function Home() {
  return (
    <main className={"main-content overflow-hidden  "}>
      <h2>Overview of the Most Important Activities</h2>
      <div className="section">
        <div className="section-item min-h-48">
          <h3>12 New Orders for Approval</h3>
          <p>GPP</p>
          <div className="top-right">NEW</div>
          <button>Approve Now</button>
        </div>
        <div className="section-item min-h-48 ">
          <h3>3 New Orders for Approval</h3>
          <p>Order Overview</p>
          <div className="top-right">NEW</div>
          <button>Approve Now</button>
        </div>
        <ForexWidget />
      </div>

      <div className="overview">
        <div className="overview-item">
          <h3>Total Balance of All Products: 12.345.678,90 €</h3>
          <div className="circle-chart w-[96px] h-[96px] "></div>
          <h4>Some general very important information</h4>
          <h4>Nobody can see the content here, even this value: 593,00 €</h4>
          <h4>Great to have this blur!</h4>
        </div>
        <div className="overview-item">
          <h3>Most Used Accounts</h3>
          <ul className="account-list">
            <li>
              Premium Business Account
              <br />
              <span>DE99 5004 0000 1122 3344 55</span>
              +124.593,00 €
            </li>
            <li>
              Premium Business Account
              <br />
              <span>DE99 5004 0000 1122 3344 55</span>
              -1.500,00 €
            </li>
            <li>
              Premium Business Account
              <br />
              <span>DE99 5004 0000 1122 3344 55</span>
              +74.482,00 €
            </li>
            <li>
              Premium Business Account
              <br />
              <span>DE99 5004 0000 1122 3344 55</span>
              +163.500,00 €
            </li>
          </ul>
        </div>
      </div>
      <div className="transactions">
        <div className="transaction-item">
          <p>Your order 123XY has been approved</p>
          <small>GPP | 28.09.2023 | 13:45 Uhr</small>
        </div>
      </div>
    </main>
  );
}
