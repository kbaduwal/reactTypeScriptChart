import React, { useEffect, useState } from 'react';

interface ThirdColonProps {
  HighPerformer: number[];
  Resignation: number[];
}

interface Result {
  overallPercentageHighPerformer: number;
  overallPercentageResignation: number;
  averageHeadcountHighPerformer: number;
  averageHeadcountResignation: number;
  overallPercentageDifference: number;
}

const ThirdColon: React.FC<ThirdColonProps> = ({ HighPerformer, Resignation }) => {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const totalHighPerformer = HighPerformer.reduce((sum, value) => sum + value, 0);
    const totalResignation = Resignation.reduce((sum, value) => sum + value, 0);

    const percentageHighPerformer = HighPerformer.map((value) => (value / totalHighPerformer) * 100);
    const percentageResignation = Resignation.map((value) => (value / totalResignation) * 100);

    const overallPercentageHighPerformer = (totalHighPerformer / (totalHighPerformer + totalResignation)) * 100;
    const overallPercentageResignation = (totalResignation / (totalHighPerformer + totalResignation)) * 100;

    const averageHeadcountHighPerformer = totalHighPerformer / HighPerformer.length;
    const averageHeadcountResignation = totalResignation / Resignation.length;

    const percentageDifference = percentageHighPerformer.map((value, index) => value - percentageResignation[index]);

    const overallPercentageDifference = overallPercentageHighPerformer - overallPercentageResignation;

    setResult({
      overallPercentageHighPerformer,
      overallPercentageResignation,
      averageHeadcountHighPerformer,
      averageHeadcountResignation,
      overallPercentageDifference,
    });
  }, [HighPerformer, Resignation]);

  return (
    <div>
      {result && (
        <table className="table">
          <tbody>
            <tr>
              <td>High Performer</td>
              <td>{result.overallPercentageHighPerformer.toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Resignation</td>
              <td>{result.overallPercentageResignation.toFixed(2)}%</td>
            </tr>
            <tr>
              <td>Headcount High Performer</td>
              <td>{result.averageHeadcountHighPerformer.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Headcount Resignation</td>
              <td>{result.averageHeadcountResignation.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Overall Percentage Difference</td>
              <td>{result.overallPercentageDifference.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ThirdColon;
