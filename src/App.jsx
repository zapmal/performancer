import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

const METRICS = ['TTFB', 'LCP', 'FID', 'FCP', 'CLS'];

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    chrome.runtime.sendMessage({
      type: 'performance:metric:request',
    }, (data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <h1>Page Metric</h1>
      <table>
        <thead>
          <tr>
            <th width='20%'></th>
            {METRICS.map(metric => (
              <th key={metric} width='5%'>{metric}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((url) => (
            <tr key={url}>
              <td>{url.slice(0, 30)}</td>
              {METRICS.map((metric) => (
                <td key={[url, metric].join('')} width='10%' style={{ textAlign: 'center' }}>
                  {Math.round((data[url][metric] || { average: 0 }).average)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));