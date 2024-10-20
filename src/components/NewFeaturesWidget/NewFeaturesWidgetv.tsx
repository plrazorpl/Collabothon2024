import serviceIcon from '@assets/new_widget.svg';

import './NewFeaturesWidget.scss'

const NewFeaturesWidget = () => {
  return (
    <div className="newFeaturesWidget flex border border-gray-200 p-8 rounded-2xl bg-white max-w-2xl mx-auto shadow-lg animate-fadeIn">
      <div className="flex-shrink-0 p-4">
        <img src={serviceIcon} alt="Service Icon" className="w-20 h-20 mb-4" />
      </div>
      <div className="flex-1 p-4">
        <h3 className="text-3xl mb-4 text-gray-900 font-semibold">How toasds make your Mac work smarter</h3>
        <p className="text-gray-700 text-lg">
          Learn how to use these simple tips and tricks to enhance your productivity and get the most out of your Mac. Discover shortcuts, useful features, and more to make your experience seamless. <a href='' className='text-blue-600 underline'>Read More.</a>
        </p>
      </div>
    </div>
  );
};

export default NewFeaturesWidget;