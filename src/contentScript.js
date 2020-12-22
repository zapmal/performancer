import { 
  getTTFB,
  getLCP,
  getFID,
  getFCP,
  getCLS
} from 'web-vitals';

const informationDiv = document.createElement('div');

informationDiv.style.position = 'fixed';
informationDiv.style.left = 0;
informationDiv.style.top = 0;
informationDiv.style.zIndex = 0;
informationDiv.style.backgroundColor = 'black';
informationDiv.style.color = 'white';
informationDiv.style.padding = '1rem';
informationDiv.style.fontFamily = 'Segoe UI';

document.body.appendChild(informationDiv);

const metrics = {};

const gatherMetrics = ({ name, value }) => {
  metrics[name] = value;

  chrome.runtime.sendMessage({
    type: 'performance:metric',
    name,
    value,
  });

  const metricsHTML = Object.keys(metrics)
    .map((key) => `<div>${key}</div><div>${Math.round(metrics[key])}</div>`)
    .join('');

  informationDiv.innerHTML=`
    <div style='font-weight: bold; font-size: x-large;'>Performance Metrics</div>
    <div style='display:grid; grid-template-columns: 1fr 1fr; grid-column-gap: 1rem;'>
       <div>Metric</div> 
       <div>Value</div>
       ${metricsHTML}
    </div>
  `;
};

getTTFB(gatherMetrics);
getLCP(gatherMetrics);
getFID(gatherMetrics);
getFCP(gatherMetrics);
getCLS(gatherMetrics);