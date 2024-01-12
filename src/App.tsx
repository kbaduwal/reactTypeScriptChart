// // import React from 'react';
// // import * as echarts from 'echarts';
// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// // <h1>Khakendra</h1>
// //     </div>
// //   );
// // }

// // export default App;

// import React from 'react';
// import EChartComponent from './components/EChartComponent';
// import EChartWIthNegVal from './components/EChartWIthNegVal';

// const App: React.FC = () => {
//   return (
//     <div>
//       <h3>Comparision of high performer resignation rates to the overall resignation rate</h3>
//       <p>Do high performers resign more often than others</p>
//       <EChartComponent />
//       <EChartWIthNegVal />
//     </div>
//   );
// };

// export default App;

import React from 'react';
import EChartComponent from './components/EChartComponent';
import EChartWIthNegVal from './components/EChartWIthNegVal';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div>
      <h3>Comparision of high performer resignation rates to the overall resignation rate</h3>
      <p>Do high performers resign more often than others?</p>
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
        </div>
      </div>
    </div>
    </div>
    
    
  );
};

export default App;

