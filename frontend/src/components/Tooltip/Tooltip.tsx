/** @jsxImportSource @emotion/react */
import { Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

interface IProps {
    age: string;
    gender: string;
    accountStatus: number;
}

export function ButtonTooltip({age, gender, accountStatus}: IProps) {
  return (
    <Tooltip title={
      <>
            { age ? <div>Age: {age}</div> : null }
            { gender ? <div>Gender: {gender}</div> : null }
            <div>Amount: {accountStatus}</div>
      </>
    }>
        <InfoIcon className="info-icon" fontSize="small" />
    </Tooltip>
  )
}