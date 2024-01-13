import React from 'react';
import EChartComponent from './components/EChartComponent';
import EChartWIthNegVal from './components/EChartWIthNegVal';
import ThirdColon from './components/ThirdColon';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

const App: React.FC = () => {
  const HighPerformer = [34, 56, 55, 66, 67, 52, 42, 52, 14];
  const Resignation = [11, 33, 50, 81, 43, 27, 8, 21, 43];

  return (
    <div>
      <h3>Comparison of high performer resignation rates to the overall resignation rate</h3>
      <p>Do high performers resign more often than others?</p>
      <button type="button" className="btn btn-outline-dark btn-light">
        <FontAwesomeIcon icon={faCalendarDays} /> Mar 19
      </button>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-5">
            <EChartComponent />
          </div>
          <div className="col-md-5">
            <EChartWIthNegVal />
          </div>
          <div className="col-md-2">
            <h4>Summary</h4>
            <br />
            <b> April 2018 - May 2019</b>
            {/* Pass HighPerformer and Resignation as props to ThirdColon */}
            <ThirdColon HighPerformer={HighPerformer} Resignation={Resignation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
