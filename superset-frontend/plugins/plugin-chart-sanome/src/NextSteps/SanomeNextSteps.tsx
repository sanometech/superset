/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import { SanomeExampleProps, SanomeExampleStylesProps } from '../types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<SanomeExampleStylesProps>`
  padding: 0;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

const getNextSteps = (scoreCategory: string): string[] => {
  switch (scoreCategory.toLowerCase()) {
    case 'low':
      return [
        'Low risk. No action required.'
      ];
    case 'moderate':
    case 'high':
    case 'critical':
      return [
        'Consider alerting a senior colleague.',
        'Consider increasing frequency of observation.'
      ]
    default:
      return ['ERROR: Unknown score category'];
  }
};

export default function SanomeNextSteps(props: SanomeExampleProps) {
  const { data, height, width } = props;
  const rootElem = createRef<HTMLDivElement>();
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  console.log('Plugin props', props);

  const [ latestData ] = data;
  const { score_category: scoreCategory } = latestData;
  const nextSteps = getNextSteps(scoreCategory);

  return (
    <Styles
      ref={rootElem}
      boldText={props.boldText}
      headerFontSize={props.headerFontSize}
      height={height}
      width={width}
    >
      <p>Consider the following actions and carry out as appropriate:</p>

      <ul>
        {nextSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </Styles>
  );
}
