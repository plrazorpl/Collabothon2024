import React from "react";
import { LoanScheduleProps } from "../../../../lib/types";
import { Col, Row, Statistic } from "antd";

const LoanScheduleDetails = ({ data }: Props) => {
  console.log(data);
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Loan" value={data.loanDetails.title} valueStyle={{fontSize: '20px'}}/>
        </Col>
        <Col span={12}>
          <Statistic title="Currency" value={data.currency} valueStyle={{fontSize: '20px'}}/>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Capital installement" value={data.capital_installement} valueStyle={{fontSize: '20px'}}/>
        </Col>
        <Col span={12}>
          <Statistic title="Interest installement" value={data.interest_installement} valueStyle={{fontSize: '20px'}}/>
        </Col>
      </Row>
    </>
  );
};

interface Props {
  data: LoanScheduleProps;
}
export default LoanScheduleDetails;
