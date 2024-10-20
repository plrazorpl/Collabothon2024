import serviceIcon from '@assets/new_widget.svg';

import './NewFeaturesWidget.scss'

const NewFeaturesWidget = () => {
  return (
    <div className="newFeatures">
      <div className="newFeatures__leftContent">
        <div className='flex flex-1 justify-center items-center'><img src={serviceIcon} alt="Service Icon" className="newFeatures__icon" /></div>
        <p className="newFeatures__title">How to make your Mac work smarter</p>
      </div>
      <div className="newFeatures__rightContent">
        <p className="newFeatures__description">
        Learn how to unlock the full potential of your Mac with these straightforward tips and tricks designed to boost your efficiency. Whether you’re navigating shortcuts, optimizing system settings, or exploring hidden features.<a href='' className='text-blue-600 underline'>Read More.</a>
        </p>
      </div>
    </div>
  );
};

export default NewFeaturesWidget;