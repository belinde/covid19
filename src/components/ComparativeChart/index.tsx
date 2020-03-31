import React from 'react';
import { MetricCode, RegionCode } from '../../types';

const ComparativeChart = ({
    metrics,
    regions,
}: {
    metrics: MetricCode[];
    regions: RegionCode[];
}) => {
    const reference = React.createRef<HTMLCanvasElement>();
    useEffect(() => {
         const myChart = = new Chart(this.canvasRef.current, {
            type: 'bar'
          })
        return () => {
             
        }
    }, []);

    return <canvas ref={reference}/>;
};

export default ComparativeChart;
