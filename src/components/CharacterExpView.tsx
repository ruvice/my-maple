import React, { useMemo } from 'react'
import { ExpData } from '@ruvice/my-maple-models'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getDDMMString } from '../utils/utils';
import './CharacterExpView.css'

type CharacterExpViewProps = {
    expProgression: ExpData[] | undefined
}

const CustomTooltip = (props: any) => {
    const {active, payload, label} = props;
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="custom-tooltip-label" style={{fontSize: 12}}>{label}</p>
          <p className="custom-tooltip-label">{payload[0].value}%</p>
        </div>
      );
    }
  
    return null;
};
  

function CharacterExpView(props: CharacterExpViewProps) {
    const { expProgression } = props;
    const sorted = expProgression?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const data = useMemo(() => {
        if (sorted) {
            const parsed = sorted.map((expData) => {
                return { "date": getDDMMString(expData.date), "exp": expData.exp_rate }
            })
            return parsed;
        }
    }, [sorted])

    const totalExpGain = useMemo(() => {
        if (sorted) {
            return (sorted[sorted.length - 1].exp - sorted[0].exp).toLocaleString();
        }
    }, [sorted])

    if  (expProgression === undefined) { return <div>Failed to retrieve exp data</div>}
    const renderLineChart = (
        <LineChart width={220} height={200} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="exp" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis 
                dataKey="date" 
                height={12} 
                style={{ fontSize: 12 }}  />
            <YAxis 
                tickFormatter={(tick) => {return `${tick}%`;}}
                width={30}
                style={{ fontSize: 12 }}
                domain={([min, max]) => {
                    const start = Math.floor(min / 10) * 10; // round down to nearest 10
                    const end = Math.ceil(max / 10) * 10;            // round up to nearest 10
                    return [start, end];
                }} />
            <Tooltip content={<CustomTooltip />} />
        </LineChart>
      );
    return (
        <div className='character-exp-view'>
            {renderLineChart}
            <p className='character-exp-view-text'>Total Exp Gained: {totalExpGain}</p>
        </div>
    )
}

export default CharacterExpView