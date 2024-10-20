import { useState } from 'react';
import { ReactSVG } from 'react-svg';

import { initialServices } from './initialServices';
import { ServiceType } from './ServiceType';

import './QuickAccess.scss';

const QuickAccess = () => {
  const [services, setServices] = useState<ServiceType[]>(initialServices);

  return (
    <div className="quickAccess max-w-[500px]">
      {services.map((service) => 
        <div className="service">
          <div className="service__icon">
            <ReactSVG style={{ fill: service.color }} src={service.icon} />
          </div>
          <p>{service.name}</p>
        </div>
      )}
    </div>
  );
};

export default QuickAccess;
